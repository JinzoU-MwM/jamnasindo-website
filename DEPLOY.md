# Deployment

**Push to `main` → the app rebuilds and restarts on `jni-server-lan`**, served at
https://jamnas.id through your existing Cloudflare Tunnel.

## How it works

1. You push to `main`.
2. GitHub triggers `.github/workflows/deploy.yml`.
3. A **self-hosted runner** on `jni-server-lan` picks up the job. It polls GitHub
   outbound, so nothing has to be exposed — same philosophy as the tunnel.
4. The runner runs `scripts/deploy.sh` against the stable clone at
   `/opt/jamnasindo/app`:
   - `git fetch` + `git reset --hard origin/main`
   - `npm ci`
   - `npm run build`
   - `sudo systemctl restart jamnasindo`
5. `jamnasindo.service` runs `next start` on port `3100`.
6. The Cloudflare Tunnel routes `jamnas.id` → `http://localhost:3100`.

The SQLite database (`data.db`) lives in `/opt/jamnasindo/app` and is **never**
touched by deploys — it's gitignored and we never run `git clean`.

## First-time setup (run once on the VPS)

SSH in and run the bootstrap as your normal user (not root):

```bash
ssh jni-server-lan
git clone https://github.com/JinzoU-MwM/jamnasindo-website.git /tmp/jni-setup
bash /tmp/jni-setup/scripts/bootstrap.sh
```

Bootstrap installs Node 20 + build tools, clones into `/opt/jamnasindo/app`,
builds, installs the systemd service, grants a narrow passwordless-sudo rule
(restart only), and offers to register the Actions runner.

### Step 1 — Register the self-hosted runner

When bootstrap asks for a token (or to add one later by re-running it):
GitHub repo → **Settings → Actions → Runners → New self-hosted runner**, copy the
token from the `./config.sh --token …` line, and paste it. Bootstrap downloads the
runner, registers it, and installs it as a service so it survives reboots.

### Step 2 — Point the tunnel at the app

Your tunnel already exists, so just add two ingress rules — see
`deploy/cloudflared-ingress.yml`. In short:

```yaml
# ~/.cloudflared/config.yml  (catch-all 404 stays LAST)
ingress:
  - hostname: jamnas.id
    service: http://localhost:3100
  - hostname: www.jamnas.id
    service: http://localhost:3100
  - service: http_status:404
```

```bash
cloudflared tunnel route dns <YOUR_TUNNEL> jamnas.id
cloudflared tunnel route dns <YOUR_TUNNEL> www.jamnas.id
sudo systemctl restart cloudflared
```

## Everyday use

```bash
git push origin main        # → auto build + restart
```

Watch a deploy in the repo's **Actions** tab.

## Operating the service on the VPS

```bash
systemctl status jamnasindo
journalctl -u jamnasindo -f                  # live logs
sudo systemctl restart jamnasindo            # manual restart
bash /opt/jamnasindo/app/scripts/deploy.sh   # manual deploy
```

## Customization

`scripts/bootstrap.sh` has variables at the top (`APP_DIR`, `PORT`,
`SERVICE_NAME`, `BRANCH`, `NODE_MAJOR`). If you change `APP_DIR`, also update the
path in `.github/workflows/deploy.yml`.
