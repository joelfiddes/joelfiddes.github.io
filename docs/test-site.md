# test-site.mountainfutures.ch — password-protected preview

A private copy of the site for trying new features and sharing with team members
before pushing to the live GitHub Pages site. Same pattern as `hr.mountainfutures.ch`:
static files on **myserver**, served by **Caddy** with server-side `basic_auth`.

- **URL:** https://test-site.mountainfutures.ch
- **HTTP user:** `mf` — password is *not* in this (public) repo; ask Joel / see password manager.
- **Docroot:** `/var/www/test-site/` on myserver (owned by `joel`, so deploys need no sudo).
- **DNS:** A record `test-site` → `85.2.53.131` at Hostpoint (renamed from the retired `hr`
  record, 2026-08-19). The old `hr.mountainfutures.ch` vhost is commented out in the
  Caddyfile; its files remain in `/var/www/hr/`.
- **Caddy block:** in `/etc/caddy/Caddyfile`; `try_files {path} /index.html` gives SPA routing.

## Deploy (from Mac)

```bash
npm run deploy:test      # vite build + rsync dist/ → myserver:/var/www/test-site/
```

Works from any branch / with uncommitted changes — that's the point. The live site is
still only updated by `git push` to `main`.

## Change the password

```bash
ssh joel@myserver "caddy hash-password --plaintext 'newpassword'"   # copy the $2a$… hash
ssh -t joel@myserver 'sudo nano /etc/caddy/Caddyfile'               # replace hash in test-site block
ssh -t joel@myserver 'sudo systemctl reload caddy'
```

## One-time server install

Staging dir `~/test-site_deploy/` on myserver holds `test-site.caddy` + `install.sh`
(creates docroot, comments out the retired `hr.` vhost, appends the test-site vhost to
the Caddyfile, validates, restarts caddy).
`systemctl restart` (not reload) is used deliberately: it clears any ACME backoff if the
cert was first requested before DNS existed.
