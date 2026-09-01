#!/usr/bin/env python3
"""
Email the team when a news item goes live on mountainfutures.ch.

Compares two versions of news.json, and if the new one has items the old one
did not, sends one email covering them. Run from the GitHub Action on push to
main, after the site has been rebuilt.

Config (environment):
    SMTP_HOST       required, e.g. smtp.hostpoint.ch
    SMTP_PORT       default 587 (STARTTLS)
    SMTP_USER       required, the mailbox to authenticate as
    SMTP_PASSWORD   required
    MAIL_FROM       default: SMTP_USER
    MAIL_TO         default: joel.fiddes + simon.allen @mountainfutures.ch
    DRY_RUN         set to 1 to print the email instead of sending it

Usage:
    announce-news.py <old-news.json> <new-news.json>

Exits 0 when there is nothing to announce, so it is safe to run on every push.
"""

import json
import os
import smtplib
import sys
from email.message import EmailMessage
from html import escape
from pathlib import Path

NEWS_URL = "https://mountainfutures.ch/news"
DEFAULT_TO = "joel.fiddes@mountainfutures.ch,simon.allen@mountainfutures.ch"


def env(name, default=None):
    """Unset GitHub secrets expand to an empty string, not absence."""
    v = os.environ.get(name)
    return v if v else default


def load(path):
    try:
        return json.loads(Path(path).read_text())
    except (FileNotFoundError, json.JSONDecodeError):
        return []


def render(items):
    n = len(items)
    subject = "New News Item at mountainfutures.ch" if n == 1 \
        else f"{n} New News Items at mountainfutures.ch"

    lines = [
        f"{'A new item is' if n == 1 else f'{n} new items are'} live on the "
        "Mountain Futures news page.",
        "",
    ]
    for it in items:
        lines += [
            it["title"],
            f"  {it['date']}",
            f"  {it['summary']}",
            f"  Source: {it['link']}",
            "",
        ]
    lines += [f"Read them on the site: {NEWS_URL}", ""]
    text = "\n".join(lines)

    cards = []
    for it in items:
        cards.append(
            '<div style="margin:0 0 28px;padding:0 0 24px;'
            'border-bottom:1px solid #C9C9C9;">'
            f'<div style="font:12px/1.4 monospace;color:#858585;'
            f'letter-spacing:.05em;">{escape(it["date"])}</div>'
            f'<h2 style="margin:6px 0 10px;font:600 19px/1.35 '
            f'-apple-system,Segoe UI,sans-serif;color:#122023;">'
            f'{escape(it["title"])}</h2>'
            f'<p style="margin:0 0 12px;font:15px/1.6 '
            f'-apple-system,Segoe UI,sans-serif;color:#122023;">'
            f'{escape(it["summary"])}</p>'
            f'<a href="{escape(it["link"])}" '
            f'style="font:14px/1.4 -apple-system,Segoe UI,sans-serif;'
            f'color:#272E3F;">Read the source &rarr;</a>'
            "</div>"
        )

    html = (
        '<div style="max-width:600px;margin:0 auto;padding:32px 24px;'
        'background:#F5F5F5;">'
        '<div style="font:12px/1.4 monospace;color:#858585;'
        'letter-spacing:.08em;text-transform:uppercase;margin-bottom:24px;">'
        "Mountain Futures &middot; News</div>"
        + "".join(cards) +
        f'<p style="margin:24px 0 0;font:15px/1.6 '
        f'-apple-system,Segoe UI,sans-serif;">'
        f'<a href="{NEWS_URL}" style="color:#272E3F;font-weight:600;">'
        f"View the news page &rarr;</a></p>"
        "</div>"
    )
    return subject, text, html


def main():
    if len(sys.argv) < 3:
        sys.stderr.write(__doc__)
        return 2

    old, new = load(sys.argv[1]), load(sys.argv[2])
    old_links = {i["link"] for i in old}
    added = [i for i in new if i["link"] not in old_links]

    if not added:
        print("No newly published items - nothing to announce.")
        return 0

    subject, text, html = render(added)
    to = [a.strip() for a in env("MAIL_TO", DEFAULT_TO).split(",") if a.strip()]

    print(f"Announcing {len(added)} item(s) to {', '.join(to)}")
    for i in added:
        print(f"  + {i['title']}")

    if env("DRY_RUN") == "1":
        print(f"\n[DRY_RUN] Subject: {subject}\n\n{text}")
        return 0

    host = env("SMTP_HOST")
    user = env("SMTP_USER")
    password = env("SMTP_PASSWORD")
    if not (host and user and password):
        sys.stderr.write(
            "Error: SMTP_HOST, SMTP_USER and SMTP_PASSWORD must all be set.\n"
        )
        return 1

    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = env("MAIL_FROM", user)
    msg["To"] = ", ".join(to)
    msg.set_content(text)
    msg.add_alternative(html, subtype="html")

    port = int(env("SMTP_PORT", "587"))
    with smtplib.SMTP(host, port, timeout=30) as smtp:
        smtp.starttls()
        smtp.login(user, password)
        smtp.send_message(msg)
    print("Sent.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
