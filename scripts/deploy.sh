#!/usr/bin/env bash
#
# deploy.sh — build-and-restart deploy, run by the GitHub Actions self-hosted
# runner on every push to main (see .github/workflows/deploy.yml).
#
# It operates on the STABLE app dir (not the runner's workspace) and uses
# fetch + reset --hard — never `git clean` — so the gitignored SQLite data.db
# in the app dir survives every deploy.
#
# The whole body lives in main() on purpose: bash reads a function definition
# fully into memory before running it, so the `git reset` below can rewrite
# this very file mid-deploy without corrupting the running script.

set -euo pipefail

# Build dengan node yang SAMA dengan runtime systemd (/usr/bin/node = v24).
# Tanpa ini, runner (nvm v22) membangun better-sqlite3 untuk ABI berbeda dari
# node service → "Module did not self-register" di API route saat runtime.
export PATH="/usr/bin:$PATH"

APP_DIR="${APP_DIR:-/opt/jamnasindo/app}"
BRANCH="${DEPLOY_BRANCH:-main}"
SERVICE="${SERVICE_NAME:-jamnasindo}"

main() {
  echo "==> Deploying '$SERVICE' from origin/$BRANCH into $APP_DIR"
  cd "$APP_DIR"

  echo "==> Fetching latest code"
  git fetch --all --prune
  git reset --hard "origin/$BRANCH"
  # NOTE: deliberately NO `git clean` here — it would delete data.db.

  echo "==> Installing dependencies (npm ci) with $(node -v)"
  npm ci

  echo "==> Rebuilding native modules for runtime node ($(node -v))"
  npm rebuild better-sqlite3

  echo "==> Building (npm run build)"
  npm run build

  echo "==> Restarting $SERVICE"
  sudo systemctl restart "$SERVICE"

  echo "==> Verifying $SERVICE is up"
  sleep 3
  if systemctl is-active --quiet "$SERVICE"; then
    echo "==> Deploy complete — $SERVICE is active."
  else
    echo "!! $SERVICE is NOT active. Recent logs:" >&2
    journalctl -u "$SERVICE" -n 40 --no-pager >&2 || true
    exit 1
  fi
}

main "$@"
