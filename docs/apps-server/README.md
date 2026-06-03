# apps.mountainfutures.ch — password layer

Password protection for individual apps on `apps.mountainfutures.ch`, served by
**Caddy** from `/var/www/apps/` on **myserver** (`joel@myserver`). Protection is
enforced server-side with Caddy `basic_auth` (real protection — files aren't
served without valid credentials, over the existing auto-HTTPS). It is **not** a
client-side JS gate.

> This server is operated by direct file placement (not via this git repo's
> build). The files here are version-controlled copies of what lives on the
> server — edit on the server, then keep these in sync (or vice-versa).

## Credentials

- **HTTP username:** `karteam`
- **Password:** `<password>` — stored on the server only as a **bcrypt hash**; not recoverable, only resettable (see below). Keep the plaintext in a password manager.

## How it works

```
/var/www/apps/apps.json          Canonical app registry (single source of truth)
        │
        ├─ index.html            fetches apps.json → renders cards + 🔒 badges
        │
        └─ /etc/caddy/gen-apps-auth.sh   reads apps.json → writes …
                 │
                 └─ /etc/caddy/apps_auth.conf   @protected matcher + basic_auth
                          │
                          └─ imported by /etc/caddy/Caddyfile (apps vhost block)
```

`apps.json` entries:

| field       | meaning |
|-------------|---------|
| `slug`      | URL path segment / folder name |
| `title`, `desc`, `tag`, `tagLabel`, `icon` | card presentation on the index |
| `protected` | `true` → requires the password |
| `listed`    | `false` → hidden from the index but **still served and still gated** (e.g. `network-monitor`) |

Currently protected: **`ops-dashboard`**, **`network-monitor`**.

## Toggle which apps are protected

Edit `/var/www/apps/apps.json` (flip a `protected` boolean), then regenerate +
reload:

```bash
sudo bash /etc/caddy/gen-apps-auth.sh
sudo caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile
sudo systemctl reload caddy
```

## Reset / change the password

One command (hashes, regenerates, validates, reloads):

```bash
sudo /etc/caddy/set-apps-password.sh 'newpassword'
```

Manual equivalent if the helper isn't present:

```bash
caddy hash-password --plaintext 'newpassword'     # copy the $2a$… hash
sudo nano /etc/caddy/gen-apps-auth.sh             # paste into the HASH='…' line
sudo bash /etc/caddy/gen-apps-auth.sh && sudo systemctl reload caddy
```

There is one shared password for all protected apps, so a reset changes it for
all of them. You never need the old password to reset — you have sudo.

## Files in this directory

| file | server location |
|------|-----------------|
| `apps.json` | `/var/www/apps/apps.json` |
| `gen-apps-auth.sh` | `/etc/caddy/gen-apps-auth.sh` |
| `set-apps-password.sh` | `/etc/caddy/set-apps-password.sh` |
| `install.sh` | one-shot installer (run from the staging dir on the server) |

The Caddyfile gains one line inside the `apps.mountainfutures.ch { … }` block:

```
import apps_auth.conf
```

## First-time install

```bash
# stage the files in ~/apps-auth-staging on the server, then:
ssh -t joel@myserver 'sudo bash ~/apps-auth-staging/install.sh'
```

`install.sh` backs up `index.html` and the `Caddyfile`, validates the config
before reloading, and rolls the Caddyfile back automatically if validation fails.

## Verify

```bash
B=https://apps.mountainfutures.ch
curl -s -o /dev/null -w '%{http_code}\n' $B/ops-dashboard/                       # 401
curl -s -o /dev/null -w '%{http_code}\n' $B/snow-explorer/                       # 200
curl -s -o /dev/null -w '%{http_code}\n' -u 'karteam:<password>' $B/ops-dashboard/ # 200
```
