#!/usr/bin/env bash
#
# Reset the shared password for the protected apps on apps.mountainfutures.ch.
# One command: hashes the new password, updates the generator, regenerates the
# Caddy auth snippet, validates, and reloads Caddy.
#
# Usage:  sudo /etc/caddy/set-apps-password.sh 'newpassword'
#
set -euo pipefail

if [ "$#" -ne 1 ] || [ -z "${1:-}" ]; then
    echo "Usage: sudo $0 'newpassword'" >&2
    exit 2
fi

NEWPASS="$1"
GEN=/etc/caddy/gen-apps-auth.sh
CADDYFILE=/etc/caddy/Caddyfile

# bcrypt-hash the new password (no prompt thanks to --plaintext)
HASH="$(caddy hash-password --plaintext "$NEWPASS")"

# Replace the HASH='...' line in the generator (python avoids sed escaping
# headaches with the $ and / characters in bcrypt hashes).
python3 - "$GEN" "$HASH" <<'PY'
import sys, re
path, newhash = sys.argv[1], sys.argv[2]
s = open(path).read()
s2, n = re.subn(r"^HASH='.*'$", lambda m: "HASH='" + newhash + "'", s, count=1, flags=re.M)
if n != 1:
    sys.stderr.write("ERROR: could not find a HASH='...' line in %s\n" % path)
    sys.exit(1)
open(path, "w").write(s2)
PY

# Regenerate the auth snippet, validate, reload
bash "$GEN" >/dev/null
if caddy validate --config "$CADDYFILE" --adapter caddyfile >/dev/null 2>&1; then
    systemctl reload caddy
    echo "Password updated and Caddy reloaded (HTTP user: mf)."
else
    echo "ERROR: Caddy validation failed — NOT reloaded. Check $CADDYFILE" >&2
    exit 1
fi
