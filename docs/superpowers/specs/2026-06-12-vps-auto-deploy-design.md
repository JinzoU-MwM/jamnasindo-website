# VPS Auto-Deploy — Design

**Date:** 2026-06-12
**Status:** Approved

## Goal

Push to `main` on GitHub → the Next.js app automatically builds and restarts on
`jni-server-lan` (a LAN box behind NAT) and is served at `https://jamnas.id`
through an existing Cloudflare Tunnel.

## Constraints / context

- App: Next.js 14, built/run with `next build` / `next start` (port 3100).
- DB: `better-sqlite3` (native module) writing `data.db` in `process.cwd()`;
  schema auto-creates and seeds on first run. `data.db` is gitignored and lives
  on the server — it must persist across deploys.
- The VPS is on a LAN (likely NAT'd), so the trigger must work outbound-only.
- A Cloudflare Tunnel already exists; we only add ingress for jamnas.id.

## Decisions

| Decision | Choice | Why |
|---|---|---|
| Trigger | GitHub Actions **self-hosted runner** on the VPS | Polls GitHub outbound; no exposed ports; NAT-friendly |
| Deploy branch | `main` | Repo's stated default |
| Runtime | **systemd** service | Survives reboots, no extra deps, journald logs |
| Build location | Stable dir `/opt/jamnasindo/app` (not runner workspace) | Keeps `data.db` safe across deploys |
| OS | Ubuntu/Debian (apt + NodeSource Node 20) | User's box |
| Tunnel | Reuse existing; add ingress only | Tunnel already configured |

## Flow

```
git push origin main
  └─ GitHub fires deploy.yml
      └─ self-hosted runner (on jni-server-lan) runs scripts/deploy.sh:
           git fetch && git reset --hard origin/main   (never git clean)
           npm ci
           npm run build
           sudo systemctl restart jamnasindo
  jamnasindo.service ──► next start :3100
  existing cloudflared tunnel ──► jamnas.id (+ www) ► http://localhost:3100
```

## Key safety points

- Deploy uses `fetch` + `reset --hard`, **never `git clean`** → gitignored
  `data.db` survives.
- Runner user gets a **narrow** passwordless sudoers rule for `systemctl
  {restart,start,stop} jamnasindo` only; added to `systemd-journal` for log reads.
- Bootstrap installs `build-essential` + `python3` so `better-sqlite3` builds.
- `.gitattributes` forces LF on `*.sh`/`*.service`/`*.yml` so scripts run on Linux.

## Deliverables

| File | Purpose |
|---|---|
| `.github/workflows/deploy.yml` | push to main → self-hosted → run deploy |
| `scripts/deploy.sh` | fetch → `npm ci` → build → restart (wrapped in `main()` for self-update safety) |
| `scripts/bootstrap.sh` | one-time VPS setup (vars at top) + optional runner registration |
| `deploy/jamnasindo.service` | systemd unit template (placeholders filled by bootstrap) |
| `deploy/cloudflared-ingress.yml` | ingress snippet + `route dns` commands for the existing tunnel |
| `DEPLOY.md` | end-to-end runbook incl. the two interactive steps |

## Manual steps (cannot be scripted — interactive/secret)

1. Paste the GitHub Actions runner registration token when bootstrap prompts.
2. Add the ingress rules to the existing cloudflared config and run
   `cloudflared tunnel route dns …` for jamnas.id + www.
