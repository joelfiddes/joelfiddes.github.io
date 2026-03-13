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
from pathlib import Path


SCRIPT_DIR = Path(__file__).parent
REPO_ROOT = SCRIPT_DIR.parent
NEWS_JSON = REPO_ROOT / "src" / "data" / "news.json"
GLOSSARY_JSON = SCRIPT_DIR / "glossary.json"

# How far back to search (days)
LOOKBACK_DAYS = int(os.environ.get("LOOKBACK_DAYS", "30"))


def load_existing_news():
    """Load existing news.json and return set of link URLs for dedup."""
    if not NEWS_JSON.exists():
        return [], set()
    with open(NEWS_JSON) as f:
        items = json.load(f)
    urls = {item["link"] for item in items}
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


# ---------------------------------------------------------------------------
# Source: CrossRef (publications by author)
# ---------------------------------------------------------------------------
def search_crossref(authors, since_date):
    """Search CrossRef for recent publications by authors."""
    candidates = []
    for author in authors:
        print(f"  CrossRef: searching for '{author}'...", file=sys.stderr)
        query = urllib.parse.urlencode({
            "query.author": author,
            "filter": f"from-pub-date:{since_date}",
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
            # Get publication date
            date_parts = (
                item.get("published-print", {}).get("date-parts", [[]])
                or item.get("published-online", {}).get("date-parts", [[]])
            )
            if date_parts and date_parts[0]:
                parts = date_parts[0]
                date_str = f"{parts[0]}-{parts[1]:02d}-{parts[2]:02d}" if len(parts) >= 3 else f"{parts[0]}-{parts[1]:02d}-01" if len(parts) >= 2 else f"{parts[0]}-01-01"
            else:
                date_str = since_date
            candidates.append({
                "title": title,
                "date": date_str,
                "link": link,
                "source": "CrossRef",
                "raw_abstract": item.get("abstract", ""),
            })
    return candidates


# ---------------------------------------------------------------------------
# Source: OpenAlex (publications by author name)
# ---------------------------------------------------------------------------
def search_openalex(authors, since_date):
    """Search OpenAlex for recent publications by authors."""
    candidates = []
    for author in authors:
        print(f"  OpenAlex: searching for '{author}'...", file=sys.stderr)
        safe_author = urllib.parse.quote(author)
        query = f"filter=authorships.author.display_name.search:{safe_author},from_publication_date:{since_date}&sort=publication_date:desc&per-page=10&mailto=info@mountainfutures.ch"
        url = f"https://api.openalex.org/works?{query}"
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
                "raw_abstract": (item.get("abstract_inverted_index") or "")
                    if isinstance(item.get("abstract_inverted_index"), str)
                    else "",
            })
    return candidates


# ---------------------------------------------------------------------------
# Source: Google News RSS (web search from glossary terms)
# ---------------------------------------------------------------------------
def search_google_news(search_terms):
    """Search Google News RSS for recent mentions."""
    candidates = []
    for term in search_terms:
        print(f"  Google News: searching for '{term}'...", file=sys.stderr)
        encoded = urllib.parse.quote(term)
        url = f"https://news.google.com/rss/search?q={encoded}&hl=en&gl=CH&ceid=CH:en"
        root = fetch_xml(url)
        if root is None:
            continue
        channel = root.find("channel")
        if channel is None:
            continue
        for item in channel.findall("item")[:5]:  # Top 5 per term
            title = item.findtext("title", "")
            link = item.findtext("link", "")
            pub_date = item.findtext("pubDate", "")
            # Parse RSS date to YYYY-MM-DD
            date_str = datetime.now().strftime("%Y-%m-%d")
            if pub_date:
                try:
                    from email.utils import parsedate_to_datetime
                    dt = parsedate_to_datetime(pub_date)
                    date_str = dt.strftime("%Y-%m-%d")
                except Exception:
                    pass
            candidates.append({
                "title": title,
                "date": date_str,
                "link": link,
                "source": f"Google News ({term})",
                "raw_abstract": item.findtext("description", ""),
            })
    return candidates


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
    all_candidates += search_openalex(glossary["authors"], since_date)

    print("\nSearching web...", file=sys.stderr)
    all_candidates += search_google_news(glossary["search_terms"])

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
