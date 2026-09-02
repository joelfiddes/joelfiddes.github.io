#!/usr/bin/env python3
"""
Mountain Futures news filter.

Takes the raw candidate list from fetch-news.py and decides which items belong
on the news feed, writing a JSON array of finished posts to stdout.

Two backends, one prompt:

  * ANTHROPIC_API_KEY set -> the Anthropic API (used by the GitHub Action, which
    has no keychain to read).
  * otherwise             -> the local `claude -p` CLI, which authenticates from
    the macOS login keychain and bills against the Claude subscription.

Keeping the prompt here rather than in update-news.sh means the scheduled run
and a local run cannot drift apart.

Usage:
    filter-news.py <candidates.json> [news.json]
"""

import json
import os
import subprocess
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
REPO_ROOT = SCRIPT_DIR.parent
DEFAULT_NEWS_JSON = REPO_ROOT / "src" / "data" / "news.json"

MODEL = "claude-opus-5"

# The response shape. Wrapped in an object because a bare array is not a valid
# json_schema root for structured outputs.
SCHEMA = {
    "type": "object",
    "properties": {
        "items": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "title": {"type": "string"},
                    "date": {"type": "string"},
                    "summary": {"type": "string"},
                    "link": {"type": "string"},
                    "tags": {"type": "array", "items": {"type": "string"}},
                },
                "required": ["title", "date", "summary", "link", "tags"],
                "additionalProperties": False,
            },
        }
    },
    "required": ["items"],
    "additionalProperties": False,
}


def build_prompt(news_json_text, candidates_text):
    return f"""You are curating a news feed for Mountain Futures (mountainfutures.ch), a Swiss
consultancy by Joel Fiddes and Simon Allen focused on cryosphere science, mountain
hazards, and climate adaptation.

Key topics: snow monitoring (SnowMapper), glacial lake outburst floods (GLOFs),
cryosphere observation (CROMO-ADAPT), climate downscaling (TopoPyScale),
mountain hazard assessment, Central Asia, Himalaya, Andes.

EXISTING news posts (do NOT duplicate):
{news_json_text}

NEW candidates from automated search:
{candidates_text}

INSTRUCTIONS:
1. STRICTLY filter: only include items directly about Mountain Futures' work, their
   named people (Joel Fiddes, Simon Allen - the cryosphere researchers, not other
   people with the same name), or their specific projects/topics.
2. Items with an "mf_author" field are ORCID-verified to be authored by that MF
   team member - ACCEPT these by default unless the title is clearly off-topic
   (e.g. unrelated domain like marine biology or pathogens, which can occur due
   to OpenAlex author-merging errors).
3. Items with an "mf_mention" field came from a name search and are press
   coverage that quotes or names that MF person. ACCEPT these when the article
   is in the cryosphere / glacier / mountain-hazard domain AND the person is
   plausibly the MF researcher rather than a namesake (Simon Allen especially
   is a common name - check the subject matter fits). These are press mentions,
   not publications: tag them "media" and say in the summary that the person
   commented on or was quoted about the event.
4. REJECT generic climate/mountain news and papers by unrelated authors when
   neither "mf_author" nor "mf_mention" is present.
5. For accepted items, write a clean 1-2 sentence summary. Mention the MF person
   by name in the summary when "mf_author" or "mf_mention" is set.

CRITICAL: When in doubt, EXCLUDE. Do NOT fabricate information.

Return a JSON object with a single key "items", holding an array of accepted
posts. Each post: title, date (YYYY-MM-DD), summary, link, tags.
If nothing is relevant, return {{"items": []}}.
"""


def filter_via_api(prompt):
    """Use the Anthropic API. Structured outputs guarantee a parseable response."""
    import anthropic

    client = anthropic.Anthropic()
    response = client.messages.create(
        model=MODEL,
        max_tokens=16000,
        thinking={"type": "adaptive"},
        output_config={"format": {"type": "json_schema", "schema": SCHEMA}},
        messages=[{"role": "user", "content": prompt}],
    )
    if response.stop_reason == "refusal":
        raise RuntimeError(f"Model refused: {response.stop_details}")
    text = next(b.text for b in response.content if b.type == "text")
    return json.loads(text)["items"]


def filter_via_cli(prompt):
    """Use the local Claude Code CLI, which reads credentials from the keychain."""
    env = dict(os.environ)
    env.pop("CLAUDECODE", None)  # allow nesting inside a Claude Code session
    try:
        proc = subprocess.run(
            ["claude", "-p", prompt, "--output-format", "text"],
            capture_output=True, text=True, env=env,
        )
    except FileNotFoundError:
        sys.stderr.write(
            "Error: the 'claude' CLI is not installed, and ANTHROPIC_API_KEY is\n"
            "not set, so there is no way to run the filter.\n"
            "Set ANTHROPIC_API_KEY to use the API backend instead.\n"
        )
        raise SystemExit(1)
    if proc.returncode != 0:
        sys.stderr.write(
            f"'claude -p' exited {proc.returncode}\n"
            f"--- stderr ---\n{proc.stderr}\n"
            f"--- stdout ---\n{proc.stdout[:800]}\n"
        )
        if "Not logged in" in proc.stdout or "Not logged in" in proc.stderr:
            sys.stderr.write(
                "The CLI could not reach the login keychain. Scheduled runs must go\n"
                "through the launchd agent, not cron. Or set ANTHROPIC_API_KEY to\n"
                "use the API backend instead.\n"
            )
        raise SystemExit(1)

    text = proc.stdout.strip()
    start, end = text.find("{"), text.rfind("}")
    if start == -1 or end == -1:
        sys.stderr.write(f"No JSON object in CLI output:\n{text[:800]}\n")
        raise SystemExit(2)
    try:
        return json.loads(text[start:end + 1])["items"]
    except (json.JSONDecodeError, KeyError) as e:
        sys.stderr.write(f"Could not parse CLI output ({e}):\n{text[:800]}\n")
        raise SystemExit(2)


def main():
    if len(sys.argv) < 2:
        sys.stderr.write(__doc__)
        raise SystemExit(2)

    candidates_text = Path(sys.argv[1]).read_text()
    news_path = Path(sys.argv[2]) if len(sys.argv) > 2 else DEFAULT_NEWS_JSON
    news_json_text = news_path.read_text()

    prompt = build_prompt(news_json_text, candidates_text)

    # GitHub sets an unset secret to the empty string rather than omitting it.
    api_key = os.environ.get("ANTHROPIC_API_KEY") or None

    if api_key:
        sys.stderr.write(f"  Filtering via Anthropic API ({MODEL})...\n")
        items = filter_via_api(prompt)
    elif os.environ.get("GITHUB_ACTIONS") == "true":
        # There is no keychain and no CLI on a runner; the fallback cannot work.
        sys.stderr.write(
            "Error: ANTHROPIC_API_KEY is not set.\n"
            "Add it under Settings -> Secrets and variables -> Actions.\n"
        )
        raise SystemExit(1)
    else:
        sys.stderr.write("  Filtering via local claude CLI...\n")
        items = filter_via_cli(prompt)

    json.dump(items, sys.stdout, indent=2, ensure_ascii=False)
    sys.stdout.write("\n")


if __name__ == "__main__":
    main()
