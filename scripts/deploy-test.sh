#!/bin/bash
# Build the site and push it to the password-protected test site on myserver.
#   https://test-site.mountainfutures.ch   (Caddy basic_auth, user: mf)
# See docs/test-site.md. Requires SSH access to joel@myserver.
set -euo pipefail
cd "$(dirname "$0")/.."

npm run build
rsync -az --delete dist/ joel@myserver:/var/www/test-site/
echo "==> deployed to https://test-site.mountainfutures.ch  ($(git rev-parse --short HEAD)$(git diff --quiet || echo '+uncommitted'))"
