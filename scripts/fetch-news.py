#!/usr/bin/env python3
"""
Mountain Futures News Fetcher

Searches for new publications, web mentions, and releases relevant to
Mountain Futures. Uses Claude to filter relevance and generate posts.
New items are added to news.json for PR-based review.

Sources:
  - CrossRef API (publications by author)
  - OpenAlex API (publications by author)
  - Google News RSS (web search from glossary terms)
  - GitHub Releases (repo updates)
"""

import json
import os
import sys
import hashlib
import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta
from email.utils import parsedate_to_datetime
from pathlib import Path


SCRIPT_DIR = Path(__file__).parent
REPO_ROOT = SCRIPT_DIR.parent
NEWS_JSON = REPO_ROOT / "src" / "data" / "news.json"
GLOSSARY_JSON = SCRIPT_DIR / "glossary.json"

# How far back to search (days)
LOOKBACK_DAYS = int(os.environ.get("LOOKBACK_DAYS", "30"))


def item_key(item):
    """Dedup key for a news item.

    The link when there is one, otherwise title+date -- Mountain Futures' own
    announcements have no external article to point at, and assuming a link
    exists crashed the whole pipeline the first time one was added.
    """
    return item.get("link") or item.get("slug") or f"{item.get('title', '')}|{item.get('date', '')}"


def load_existing_news():
    """Load existing news.json and return set of link URLs for dedup."""
    if not NEWS_JSON.exists():
        return [], set()
    with open(NEWS_JSON) as f:
        items = json.load(f)
    urls = {item_key(item) for item in items}
    # Also create fingerprints from titles for fuzzy dedup
    titles = {fingerprint(item["title"]) for item in items}
    return items, urls | titles


def fingerprint(text):
    """Create a simple fingerprint for dedup."""
    return hashlib.md5(text.lower().strip().encode()).hexdigest()


def load_glossary():
    with open(GLOSSARY_JSON) as f:
        return json.load(f)


def fetch_json(url):
    """Fetch JSON from a URL."""
    req = urllib.request.Request(url, headers={
        "User-Agent": "MountainFuturesNewsBot/1.0 (mailto:info@mountainfutures.ch)"
    })
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return json.loads(resp.read().decode())
    except Exception as e:
        print(f"  Warning: failed to fetch {url}: {e}", file=sys.stderr)
        return None


def fetch_xml(url):
    """Fetch and parse XML/RSS from a URL."""
    req = urllib.request.Request(url, headers={
        "User-Agent": "MountainFuturesNewsBot/1.0"
    })
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return ET.fromstring(resp.read())
    except Exception as e:
        print(f"  Warning: failed to fetch {url}: {e}", file=sys.stderr)
        return None



def _crossref_date(item, fallback):
    """Best publication date for a CrossRef record, as YYYY-MM-DD.

    Prefers the online date: a book chapter issued with a year and no month
    would otherwise be stamped 1 January and sort months below its real
    appearance. Note that .get("date-parts", [[]]) returns a truthy [[]] when
    the key is absent, so each candidate has to be tested for real content
    rather than chained with `or`.
    """
    for key in ("published-online", "published-print", "issued"):
        parts = (item.get(key) or {}).get("date-parts") or [[]]
        p = parts[0]
        if not p or not p[0]:
            continue
        if len(p) >= 3:
            return f"{p[0]}-{p[1]:02d}-{p[2]:02d}"
        if len(p) >= 2:
            return f"{p[0]}-{p[1]:02d}-01"
        return f"{p[0]}-01-01"
    return fallback

# ---------------------------------------------------------------------------
# Source: CrossRef (publications by author ORCID)
# ---------------------------------------------------------------------------
def search_crossref(authors, since_date):
    """Search CrossRef for recent publications by author ORCID."""
    candidates = []
    for author in authors:
        name = author["name"]
        orcid = author["orcid"]
        print(f"  CrossRef: searching ORCID {orcid} ({name})...", file=sys.stderr)
        query = urllib.parse.urlencode({
            "filter": f"orcid:{orcid},from-pub-date:{since_date}",
            "rows": 10,
            "sort": "published",
            "order": "desc",
        })
        url = f"https://api.crossref.org/works?{query}"
        data = fetch_json(url)
        if not data or "message" not in data:
            continue
        for item in data["message"].get("items", []):
            title = item.get("title", [""])[0]
            doi = item.get("DOI", "")
            link = f"https://doi.org/{doi}" if doi else ""
            date_str = _crossref_date(item, since_date)
            candidates.append({
                "title": title,
                "date": date_str,
                "link": link,
                "source": "CrossRef",
                "mf_author": name,
                "raw_abstract": item.get("abstract", ""),
            })
    return candidates


# ---------------------------------------------------------------------------
# Source: OpenAlex (publications by author ORCID)
# ---------------------------------------------------------------------------
def search_openalex(authors, since_date):
    """Search OpenAlex for recent publications by author ORCID."""
    candidates = []
    for author in authors:
        name = author["name"]
        orcid = author["orcid"]
        print(f"  OpenAlex: searching ORCID {orcid} ({name})...", file=sys.stderr)
        orcid_filter = urllib.parse.quote(f"https://orcid.org/{orcid}", safe="")
        url = (
            "https://api.openalex.org/works"
            f"?filter=authorships.author.orcid:{orcid_filter},from_publication_date:{since_date}"
            "&sort=publication_date:desc&per-page=10"
            "&mailto=info@mountainfutures.ch"
        )
        data = fetch_json(url)
        if not data:
            continue
        for item in data.get("results", []):
            title = item.get("title", "")
            doi = item.get("doi", "")
            link = doi if doi else item.get("id", "")
            # Clean DOI URL
            if link and not link.startswith("http"):
                link = f"https://doi.org/{link}"
            candidates.append({
                "title": title,
                "date": item.get("publication_date", since_date),
                "link": link,
                "source": "OpenAlex",
                "mf_author": name,
                "raw_abstract": (item.get("abstract_inverted_index") or "")
                    if isinstance(item.get("abstract_inverted_index"), str)
                    else "",
            })
    return candidates



# ---------------------------------------------------------------------------
# Source: CrossRef by author NAME (catches deposits that carry no ORCID)
# ---------------------------------------------------------------------------
# Large multi-author collaborations routinely deposit no ORCID, so the
# ORCID-filtered search above cannot see them at any lookback. Searching by
# name instead needs two guards, both established by testing against the live
# API: CrossRef's "query.author" is a relevance search, not a filter, so it
# returns other people entirely (a J.C. Fiddes published on chorionic
# gonadotropin in the 1980s); and "from-index-date" matches RE-indexing, so a
# bare name query floods with decades-old records. Requiring the issued year to
# be the current one removes both classes at once.
def search_crossref_by_name(authors, since_date):
    """Search CrossRef by author surname for works it indexed recently."""
    candidates = []
    this_year = datetime.now().year
    for author in authors:
        name = author["name"]
        parts = name.split()
        family, initial = parts[-1], parts[0][:1].upper()
        print(f"  CrossRef: searching name {family}, {initial}* ({name})...",
              file=sys.stderr)
        # No sort: CrossRef's default is relevance, and sorting by index date
        # instead discards it, which turns the 100-row window into a lottery
        # over everything indexed since `since_date`. Measured 2026-10-27 for
        # "Allen" over 45,761 matching works: sort=indexed returned 100 rows of
        # which 1 had an author actually called Allen, S*; relevance returned 4;
        # relevance with the full name returned 23.
        query = urllib.parse.urlencode({
            "filter": f"from-index-date:{since_date}",
            "query.author": name,
            "rows": 100,
            "select": "DOI,title,author,issued,published-online,container-title,abstract",
        })
        data = fetch_json(f"https://api.crossref.org/works?{query}")
        if not data or "message" not in data:
            continue
        for item in data["message"].get("items", []):
            issued = (item.get("issued", {}).get("date-parts") or [[None]])[0]
            if not issued or not issued[0] or issued[0] < this_year:
                continue
            if not any(
                a.get("family", "").lower() == family.lower()
                and a.get("given", "").upper().startswith(initial)
                for a in item.get("author", [])
            ):
                continue
            doi = item.get("DOI", "")
            candidates.append({
                "title": item.get("title", [""])[0],
                "date": _crossref_date(item, since_date),
                "link": f"https://doi.org/{doi}" if doi else "",
                "source": "CrossRef (name)",
                # NOT mf_author: the surname matched, the person did not.
                "mf_author_candidate": name,
                "venue": (item.get("container-title") or [""])[0],
                "raw_abstract": item.get("abstract", ""),
            })
    return candidates


# ---------------------------------------------------------------------------
# Source: OpenAlex by raw author name (catches works with no ORCID deposited)
# ---------------------------------------------------------------------------
# The ORCID filters miss anything whose publisher deposited no ORCID, and the
# CrossRef name search cannot rescue it for a common surname: a relevance query
# for "Simon Allen" has 164,701 recently-indexed matches, so the one we want is
# nowhere near the first 100.
#
# OpenAlex searches the raw author strings instead, which narrows the same
# window to a handful. Measured 2026-10-27, since 2026-09-27:
#
#   raw_author_name.search:allen         1,994 works
#   raw_author_name.search:"simon allen"    19 works, 6 surviving the name test
#   raw_author_name.search:"joel fiddes"     1 work,  1 surviving
#
# This is what found Huggel et al., "Nepal's disaster is an urgent wake-up
# call" (Nature 658, 868-871) and Zhu et al. in Water Resources Research, both
# of which every other source here missed.
#
# Note it cannot be an author-id filter: with no ORCID on the record, OpenAlex's
# disambiguator gave that Nature comment a brand-new author entity for Simon
# Allen (A5159099228) rather than his established one (A5070988903), so
# filtering on the known id misses it just as surely.
def search_openalex_by_name(authors, since_date):
    """Search OpenAlex by raw author name, for works that deposited no ORCID."""
    candidates = []
    for author in authors:
        name = author["name"]
        parts = name.split()
        family, initial = parts[-1], parts[0][:1].upper()
        print(f"  OpenAlex: searching name {name}...", file=sys.stderr)
        name_filter = urllib.parse.quote(name.lower(), safe="")
        url = (
            "https://api.openalex.org/works"
            f"?filter=raw_author_name.search:{name_filter}"
            f",from_publication_date:{since_date}"
            "&per-page=100&mailto=info@mountainfutures.ch"
        )
        data = fetch_json(url)
        if not data:
            continue
        for item in data.get("results", []):
            # The name search matches the tokens anywhere in the author list, so
            # a paper with some other Simon and some other Allen also comes back.
            # Require one author whose surname and given initial both match.
            names = [
                (a.get("author") or {}).get("display_name", "") or ""
                for a in item.get("authorships", [])
            ]
            if not any(
                n.split() and n.split()[-1].lower() == family.lower()
                and n.split()[0][:1].upper() == initial
                for n in names
            ):
                continue
            link = item.get("doi") or item.get("id", "")
            if link and not link.startswith("http"):
                link = f"https://doi.org/{link}"
            source = ((item.get("primary_location") or {}).get("source") or {})
            candidates.append({
                "title": item.get("title", "") or "",
                "date": item.get("publication_date", since_date),
                "link": link,
                "source": "OpenAlex (name)",
                # NOT mf_author: the name matched, the person is unconfirmed.
                # Simon J. Allen (dolphins) and S. Allen (astronomy) both land here.
                "mf_author_candidate": name,
                "venue": source.get("display_name") or "",
                "raw_abstract": "",
            })
    return candidates


# ---------------------------------------------------------------------------
# Source: OpenAlex, the 1 January bucket (catches year-only publication dates)
# ---------------------------------------------------------------------------
# A book chapter issued with a year and no month lands in OpenAlex as
# <year>-01-01 regardless of when it actually appeared, so any rolling lookback
# window excludes it for all but the first days of January. OpenAlex's
# from_created_date would be the honest filter but is a paid feature, so query
# that one date directly instead. The set is small and dedup handles repeats.
def search_openalex_year_start(authors):
    """Search OpenAlex for this year's works dated 1 January (year-only dates)."""
    candidates = []
    jan_first = f"{datetime.now().year}-01-01"
    for author in authors:
        name = author["name"]
        orcid = author["orcid"]
        print(f"  OpenAlex: checking {jan_first} bucket for {name}...", file=sys.stderr)
        orcid_filter = urllib.parse.quote(f"https://orcid.org/{orcid}", safe="")
        url = (
            "https://api.openalex.org/works"
            f"?filter=authorships.author.orcid:{orcid_filter}"
            f",from_publication_date:{jan_first},to_publication_date:{jan_first}"
            "&per-page=50&mailto=info@mountainfutures.ch"
        )
        data = fetch_json(url)
        if not data:
            continue
        for item in data.get("results", []):
            link = item.get("doi") or item.get("id", "")
            if link and not link.startswith("http"):
                link = f"https://doi.org/{link}"
            candidates.append({
                "title": item.get("title", ""),
                "date": item.get("publication_date", jan_first),
                "link": link,
                "source": "OpenAlex (year-start)",
                "mf_author": name,
                "raw_abstract": "",
            })
    return candidates

# ---------------------------------------------------------------------------
# Source: Google News RSS (web search from glossary terms)
# ---------------------------------------------------------------------------
def _google_news_items(query, limit=10):
    """Fetch and parse Google News RSS items for one query string."""
    encoded = urllib.parse.quote(query)
    url = f"https://news.google.com/rss/search?q={encoded}&hl=en&gl=CH&ceid=CH:en"
    root = fetch_xml(url)
    if root is None:
        return []
    channel = root.find("channel")
    if channel is None:
        return []
    out = []
    for item in channel.findall("item")[:limit]:
        pub_date = item.findtext("pubDate", "")
        date_str = datetime.now().strftime("%Y-%m-%d")
        if pub_date:
            try:
                dt = parsedate_to_datetime(pub_date)
                date_str = dt.strftime("%Y-%m-%d")
            except Exception:
                pass
        out.append({
            "title": item.findtext("title", ""),
            "date": date_str,
            "link": item.findtext("link", ""),
            "raw_abstract": item.findtext("description", ""),
        })
    return out


def search_google_news(search_terms, since_date):
    """Search Google News RSS for recent mentions, newer than since_date."""
    candidates = []
    skipped_old = 0
    for term in search_terms:
        print(f"  Google News: searching for '{term}'...", file=sys.stderr)
        for item in _google_news_items(term):
            # Google News RSS has no date filter of its own, so apply the
            # same lookback the other sources get. Without this, items years
            # old are re-fetched on every run and re-shown to the filter.
            if item["date"] < since_date:
                skipped_old += 1
                continue
            item["source"] = f"Google News ({term})"
            candidates.append(item)
    if skipped_old:
        print(f"  Google News: skipped {skipped_old} items older than {since_date}",
              file=sys.stderr)
    return candidates


# ---------------------------------------------------------------------------
# Source: Google News RSS, searched by MF person name
# ---------------------------------------------------------------------------
def _search_mentions(terms, since_date, tag_key, label):
    """Search Google News for named mentions, tagging each hit.

    Press coverage is the high-value source and the feed is ranked by
    relevance rather than date, so read deep enough that recent syndicated
    coverage is not truncated away behind older, more "relevant" hits.
    """
    candidates = []
    for entry in terms:
        name = entry["name"]
        print(f"  Google News: searching for {label} of {name}...", file=sys.stderr)
        for item in _google_news_items(entry["query"], limit=40):
            if item["date"] < since_date:
                continue
            item["source"] = f"Google News {label} ({name})"
            item[tag_key] = name
            candidates.append(item)
    return candidates


def search_person_mentions(person_terms, since_date):
    """Press that quotes or names an MF person.

    The press almost never names the company, but it does quote Joel and
    Simon by name, so these are the terms that actually catch coverage.
    Tagged mf_mention so the filter treats them like ORCID-verified items
    rather than generic climate news.
    """
    return _search_mentions(person_terms, since_date, "mf_mention", "mentions")


def search_tool_mentions(tool_terms, since_date):
    """Third parties using MF tools, e.g. SnowMapper or TopoPyScale.

    Uptake of a tool is not tied to anyone's name, so it is invisible to
    every other source here. Tagged mf_tool. Note that "SnowMapper" is an
    ambiguous term -- an unrelated Python/GEE snow-cover package of the same
    name exists -- so the filter has to disambiguate these.
    """
    return _search_mentions(tool_terms, since_date, "mf_tool", "tool mentions")


# ---------------------------------------------------------------------------
# Source: GitHub Releases
# ---------------------------------------------------------------------------
def search_github_releases(repos, since_date):
    """Check GitHub repos for recent releases."""
    candidates = []
    for repo in repos:
        print(f"  GitHub: checking releases for {repo}...", file=sys.stderr)
        url = f"https://api.github.com/repos/{repo}/releases?per_page=5"
        data = fetch_json(url)
        if not data:
            continue
        for release in data:
            pub_date = release.get("published_at", "")[:10]
            if pub_date < since_date:
                continue
            candidates.append({
                "title": f"{repo.split('/')[-1]} {release.get('tag_name', '')} released",
                "date": pub_date,
                "link": release.get("html_url", ""),
                "source": "GitHub",
                "raw_abstract": release.get("body", "")[:500],
            })
    return candidates


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main():
    print("=== Mountain Futures News Fetcher ===", file=sys.stderr)
    print(f"Looking back {LOOKBACK_DAYS} days\n", file=sys.stderr)

    glossary = load_glossary()
    existing_items, existing_keys = load_existing_news()
    since_date = (datetime.now() - timedelta(days=LOOKBACK_DAYS)).strftime("%Y-%m-%d")

    # Gather candidates from all sources
    all_candidates = []

    print("Searching academic sources...", file=sys.stderr)
    all_candidates += search_crossref(glossary["authors"], since_date)
    all_candidates += search_crossref_by_name(glossary["authors"], since_date)
    all_candidates += search_openalex(glossary["authors"], since_date)
    all_candidates += search_openalex_by_name(glossary["authors"], since_date)
    all_candidates += search_openalex_year_start(glossary["authors"])

    print("\nSearching web...", file=sys.stderr)
    all_candidates += search_google_news(glossary["search_terms"], since_date)
    all_candidates += search_person_mentions(
        glossary.get("person_search_terms", []), since_date)
    all_candidates += search_tool_mentions(
        glossary.get("tool_search_terms", []), since_date)

    print("\nChecking GitHub releases...", file=sys.stderr)
    all_candidates += search_github_releases(glossary.get("github_repos", []), since_date)

    print(f"\nFound {len(all_candidates)} raw candidates", file=sys.stderr)

    # Deduplicate against existing news
    new_candidates = []
    seen = set()
    for c in all_candidates:
        fp = fingerprint(c["title"])
        url_key = c.get("link", "")
        if fp in existing_keys or url_key in existing_keys:
            continue
        if fp in seen:
            continue
        seen.add(fp)
        new_candidates.append(c)

    print(f"After dedup: {len(new_candidates)} new candidates", file=sys.stderr)

    if not new_candidates:
        print("\nNo new items found.", file=sys.stderr)
        # Output empty array for the pipeline
        print("[]")
        return

    # Output candidates as JSON to stdout (for Claude Code to process)
    print(json.dumps(new_candidates, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
