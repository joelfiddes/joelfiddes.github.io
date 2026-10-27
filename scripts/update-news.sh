#!/bin/bash
# Mountain Futures News Update
#
# Fetches candidates, uses Claude Code to filter/write posts,
# then creates a PR for review. Nothing publishes without your approval.
#
# Usage:
#   ./scripts/update-news.sh              # default 30 day lookback
#   LOOKBACK_DAYS=90 ./scripts/update-news.sh  # custom lookback

set -euo pipefail

# Allow running from cron or from within Claude Code
unset CLAUDECODE 2>/dev/null || true

# cron runs with a minimal PATH (/usr/bin:/bin) — claude and gh are not on it.
# Without this the script dies at Step 2 with "claude: command not found".
export PATH="$HOME/.local/bin:/opt/homebrew/bin:/usr/local/bin:$PATH"

echo "=== Run started $(date '+%Y-%m-%d %H:%M:%S') ==="

# Fail loudly and early if a required tool is missing
for cmd in claude gh git python3; do
    if ! command -v "$cmd" >/dev/null 2>&1; then
        echo "Error: required command '$cmd' not found in PATH ($PATH)" >&2
        exit 1
    fi
done

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_DIR"

# Note: macOS BSD mktemp only randomizes trailing X's — no suffix after them.
CANDIDATES_FILE=$(mktemp /tmp/news-candidates.XXXXXX)
FILTERED_FILE=$(mktemp /tmp/news-filtered.XXXXXX)
NEWS_BEFORE=$(mktemp /tmp/news-before.XXXXXX)
PR_BODY_FILE=$(mktemp /tmp/news-pr-body.XXXXXX)
NEWS_JSON="$REPO_DIR/src/data/news.json"

cleanup() { rm -f "$CANDIDATES_FILE" "$FILTERED_FILE" "$NEWS_BEFORE" "$PR_BODY_FILE"; }
trap cleanup EXIT

# Kept so the PR body can list exactly what the merge added.
cp "$NEWS_JSON" "$NEWS_BEFORE"

echo "=== Step 1: Fetching candidates ==="
python3 scripts/fetch-news.py > "$CANDIDATES_FILE"

NUM_CANDIDATES=$(python3 -c "import json; print(len(json.load(open('$CANDIDATES_FILE'))))")
echo "Found $NUM_CANDIDATES new candidates"

if [ "$NUM_CANDIDATES" = "0" ]; then
    echo "No new candidates. Nothing to do."
    exit 0
fi

echo ""
echo "=== Step 2: Filtering candidates ==="

# The prompt and both backends (Anthropic API when ANTHROPIC_API_KEY is set,
# otherwise the local claude CLI) live in filter-news.py, shared with the
# GitHub Action so the two cannot drift apart.
python3 scripts/filter-news.py "$CANDIDATES_FILE" "$NEWS_JSON" > "$FILTERED_FILE"

NUM_POSTS=$(python3 -c "import json; print(len(json.load(open('$FILTERED_FILE'))))")
echo "Approved $NUM_POSTS items"

if [ "$NUM_POSTS" = "0" ]; then
    echo "No relevant items. Nothing to do."
    exit 0
fi

echo ""
echo "=== Step 3: Merging into news.json ==="
python3 scripts/merge-news.py "$FILTERED_FILE" "$NEWS_JSON" || true


if git diff --quiet src/data/news.json; then
    echo "No new items after dedup. Nothing to do."
    exit 0
fi

echo ""
echo "=== Step 4: Creating PR ==="

BRANCH="news-update-$(date +%Y%m%d-%H%M)"
git checkout -b "$BRANCH"
git add src/data/news.json
git commit -m "$(cat <<'EOF'
Add new items to news feed

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
git push origin "$BRANCH"

# The body carries the items themselves: it is what lands in the review email,
# so a bare link would make that email useless.
python3 scripts/news-pr-body.py "$NEWS_BEFORE" "$NEWS_JSON" > "$PR_BODY_FILE"

gh pr create \
    --title "News feed update $(date +%Y-%m-%d)" \
    --body-file "$PR_BODY_FILE" \
    --base main \
    --head "$BRANCH"

PR_URL=$(gh pr view "$BRANCH" --json url -q '.url')
echo "PR ready for review: $PR_URL"

# Desktop conveniences, only when there is a desktop. The scheduled run is on
# myserver (headless Ubuntu), where both of these would abort the script.
if [ "$(uname)" = "Darwin" ] && [ -t 1 ]; then
    open "$PR_URL"
    osascript -e "display notification \"$NUM_POSTS new items ready for review\" with title \"Mountain Futures News\" sound name \"Glass\"" || true
fi

# Switch back to main
git checkout main

echo ""
echo "Done! Review the PR on GitHub, edit if needed, then merge to publish."
