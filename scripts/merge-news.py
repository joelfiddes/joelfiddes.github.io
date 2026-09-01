#!/usr/bin/env python3
"""
Merge filtered news posts into news.json.

Shared by update-news.sh (local run) and the GitHub Action so the two cannot
drift. Dedupes on link, keeps the file sorted newest-first, and prints what it
added. Exit status 0 if anything was added, 1 if nothing was.

Usage:
    merge-news.py <filtered.json> [news.json]
"""

import json
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
REPO_ROOT = SCRIPT_DIR.parent
DEFAULT_NEWS_JSON = REPO_ROOT / "src" / "data" / "news.json"


def main():
    if len(sys.argv) < 2:
        sys.stderr.write(__doc__)
        raise SystemExit(2)

    new_posts = json.loads(Path(sys.argv[1]).read_text())
    news_path = Path(sys.argv[2]) if len(sys.argv) > 2 else DEFAULT_NEWS_JSON
    existing = json.loads(news_path.read_text())

    existing_links = {item["link"] for item in existing}
    added = [p for p in new_posts if p["link"] not in existing_links]

    if not added:
        print("No new items after dedup.")
        return 1

    merged = added + existing
    merged.sort(key=lambda x: x["date"], reverse=True)
    with open(news_path, "w") as f:
        json.dump(merged, f, indent=2, ensure_ascii=False)
        f.write("\n")

    print(f"Added {len(added)} new items. Total: {len(merged)}")
    for p in added:
        print(f"  + {p['title']}")
        if "news.google.com" in p.get("link", ""):
            print("    NOTE: Google News redirect link - replace with the "
                  "publisher URL before merging.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
