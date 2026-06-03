#!/usr/bin/env bash
#
# Installs the password layer for apps.mountainfutures.ch.
# Run as root:  sudo bash ~/apps-auth-staging/install.sh
#
# Idempotent and safe: backs up files it replaces, validates the Caddy
# config before reloading, and rolls the Caddyfile back if validation fails.
#
set -euo pipefail

STAGING="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APPS_DIR=/var/www/apps
CADDYFILE=/etc/caddy/Caddyfile
STAMP="$(date +%Y%m%d-%H%M%S)"

echo "==> Staging dir: $STAGING"

# 1. apps.json (canonical config)
cp "$STAGING/apps.json" "$APPS_DIR/apps.json"
chown joel:joel "$APPS_DIR/apps.json"
chmod 644 "$APPS_DIR/apps.json"
echo "==> Installed $APPS_DIR/apps.json"

# 2. index.html (backup the old one first)
cp -a "$APPS_DIR/index.html" "$APPS_DIR/index.html.bak-$STAMP"
cp "$STAGING/index.html" "$APPS_DIR/index.html"
chown joel:joel "$APPS_DIR/index.html"
chmod 644 "$APPS_DIR/index.html"
echo "==> Installed $APPS_DIR/index.html (backup: index.html.bak-$STAMP)"

# 3. Generator + password-reset helper
cp "$STAGING/gen-apps-auth.sh" /etc/caddy/gen-apps-auth.sh
chmod 700 /etc/caddy/gen-apps-auth.sh
echo "==> Installed /etc/caddy/gen-apps-auth.sh"
if [ -f "$STAGING/set-apps-password.sh" ]; then
    cp "$STAGING/set-apps-password.sh" /etc/caddy/set-apps-password.sh
    chmod 700 /etc/caddy/set-apps-password.sh
    echo "==> Installed /etc/caddy/set-apps-password.sh"
fi

# 4. Generate apps_auth.conf
bash /etc/caddy/gen-apps-auth.sh

# 5. Ensure the Caddyfile imports apps_auth.conf (inside the apps vhost block)
cp -a "$CADDYFILE" "$CADDYFILE.bak-$STAMP"
if grep -q 'import apps_auth.conf' "$CADDYFILE"; then
    echo "==> Caddyfile already imports apps_auth.conf"
else
    sed -i '/apps\.mountainfutures\.ch {/a\    import apps_auth.conf' "$CADDYFILE"
    echo "==> Added 'import apps_auth.conf' to Caddyfile (backup: Caddyfile.bak-$STAMP)"
fi

# 6. Validate before reloading; roll back the Caddyfile if invalid
if caddy validate --config "$CADDYFILE" --adapter caddyfile; then
    systemctl reload caddy
    echo "==> Caddy validated and reloaded successfully."
else
    echo "!! Caddy validation FAILED — restoring Caddyfile and aborting (no reload)." >&2
    cp -a "$CADDYFILE.bak-$STAMP" "$CADDYFILE"
    exit 1
fi

echo
echo "Done. Protected apps will now prompt for the password (user: mf)."
echo "Toggle protection later by editing $APPS_DIR/apps.json, then:"
echo "  sudo bash /etc/caddy/gen-apps-auth.sh && sudo caddy validate --config $CADDYFILE --adapter caddyfile && sudo systemctl reload caddy"
