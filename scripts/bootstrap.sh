#!/usr/bin/env bash
#
# bootstrap.sh — one-time setup for jni-server-lan (Ubuntu/Debian).
#
# Run this ONCE on the VPS, as your normal login user (NOT root — it uses sudo
# itself where needed). It:
#   1. installs Node 20 + build tools (for the better-sqlite3 native module)
#   2. clones the repo into a stable app dir
#   3. builds the app
#   4. installs + starts the systemd service
#   5. grants the deploy user a narrow passwordless-sudo rule (restart only)
#   6. (optional) registers the GitHub Actions self-hosted runner
#
# Re-running is safe: it updates the existing clone and re-applies config.
#
# Usage:
#   git clone https://github.com/JinzoU-MwM/jamnasindo-website.git /tmp/jni-setup
#   bash /tmp/jni-setup/scripts/bootstrap.sh

set -euo pipefail

# ---------------------------------------------------------------------------
# Config — change to match your box. If you edit APP_DIR, also update the path
# in .github/workflows/deploy.yml.
# ---------------------------------------------------------------------------
APP_DIR="/opt/jamnasindo/app"
REPO_URL="https://github.com/JinzoU-MwM/jamnasindo-website.git"
BRANCH="main"
SERVICE_NAME="jamnasindo"
PORT="3100"          # 3000/3001/3002/8080 are already used on this box
NODE_MAJOR="20"
RUN_USER="${SUDO_USER:-$(id -un)}"
# ---------------------------------------------------------------------------

GITHUB_REPO_URL="${REPO_URL%.git}"   # web URL used to register the Actions runner

log()  { printf '\n\033[1;34m==>\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m!!\033[0m %s\n' "$*" >&2; }

require_not_root() {
  if [ "$(id -u)" -eq 0 ]; then
    warn "Run this as your normal user (it uses sudo itself), not as root."
    exit 1
  fi
}

install_packages() {
  log "Installing base packages (git, build tools, python3 for better-sqlite3)"
  # An unrelated broken third-party apt source (e.g. anydesk) can make `update`
  # exit non-zero; our packages come from the main Ubuntu repos, so don't abort.
  sudo apt-get update -y || warn "apt-get update had errors (unrelated repo?) — continuing"
  sudo apt-get install -y ca-certificates curl git build-essential python3
}

install_node() {
  if command -v node >/dev/null 2>&1 \
     && [ "$(node -v | sed 's/v\([0-9]*\).*/\1/')" -ge "$NODE_MAJOR" ]; then
    log "Node $(node -v) already installed — skipping"
    return
  fi
  log "Installing Node ${NODE_MAJOR}.x via NodeSource"
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | sudo -E bash -
  sudo apt-get install -y nodejs
  log "Installed $(node -v) / npm $(npm -v)"
}

clone_or_update() {
  log "Preparing app dir $APP_DIR"
  sudo mkdir -p "$(dirname "$APP_DIR")"
  sudo chown "$RUN_USER":"$RUN_USER" "$(dirname "$APP_DIR")"
  if [ -d "$APP_DIR/.git" ]; then
    log "Repo exists — fetching latest"
    git -C "$APP_DIR" fetch --all --prune
    git -C "$APP_DIR" checkout "$BRANCH"
    git -C "$APP_DIR" reset --hard "origin/$BRANCH"
  else
    log "Cloning $REPO_URL (branch $BRANCH)"
    git clone --branch "$BRANCH" "$REPO_URL" "$APP_DIR"
  fi
}

build_app() {
  log "Installing dependencies + building"
  cd "$APP_DIR"
  npm ci
  npm run build
}

install_service() {
  log "Installing systemd service '$SERVICE_NAME'"
  local node_bin; node_bin="$(command -v node)"
  sed -e "s|__USER__|$RUN_USER|g" \
      -e "s|__APP_DIR__|$APP_DIR|g" \
      -e "s|__NODE__|$node_bin|g" \
      -e "s|__PORT__|$PORT|g" \
      "$APP_DIR/deploy/jamnasindo.service" \
    | sudo tee "/etc/systemd/system/$SERVICE_NAME.service" >/dev/null
  sudo systemctl daemon-reload
  sudo systemctl enable --now "$SERVICE_NAME"
  sleep 3
  if systemctl is-active --quiet "$SERVICE_NAME"; then
    log "$SERVICE_NAME is running on port $PORT"
  else
    warn "$SERVICE_NAME failed to start — check: journalctl -u $SERVICE_NAME -n 50"
  fi
}

install_sudoers() {
  log "Granting $RUN_USER passwordless sudo to control $SERVICE_NAME only"
  local systemctl_bin; systemctl_bin="$(command -v systemctl)"
  local tmp; tmp="$(mktemp)"
  cat > "$tmp" <<EOF
# Managed by scripts/bootstrap.sh — lets the deploy restart the app, nothing else.
$RUN_USER ALL=(root) NOPASSWD: $systemctl_bin restart $SERVICE_NAME, $systemctl_bin start $SERVICE_NAME, $systemctl_bin stop $SERVICE_NAME
EOF
  if sudo visudo -cf "$tmp" >/dev/null; then
    sudo install -m 0440 "$tmp" "/etc/sudoers.d/$SERVICE_NAME"
  else
    warn "sudoers validation failed — not installing. Restart will need a password."
  fi
  rm -f "$tmp"
  # Let the deploy user read service logs without sudo.
  sudo usermod -aG systemd-journal "$RUN_USER" || true
}

install_runner() {
  log "GitHub Actions self-hosted runner setup"
  local token="${RUNNER_TOKEN:-}"
  if [ -z "$token" ]; then
    echo "   Token: GitHub repo -> Settings -> Actions -> Runners -> 'New self-hosted runner'"
    echo "   (copy the value after --token in the ./config.sh line)."
    read -rp "   Paste runner registration token (blank to skip): " token || token=""
  fi
  if [ -z "$token" ]; then
    warn "Skipping runner install — set RUNNER_TOKEN and re-run to add it."
    return
  fi
  # Dedicated dir + name so this runner never clobbers another repo's runner on
  # the same box (svc.sh names the service after owner-repo.name, so it's unique).
  local dir="$HOME/actions-runner-$SERVICE_NAME"
  mkdir -p "$dir"; cd "$dir"
  if [ ! -f ./config.sh ]; then
    local existing
    existing="$(ls "$HOME"/actions-runner*/actions-runner-linux-x64.tar.gz 2>/dev/null | head -1 || true)"
    if [ -n "$existing" ] && [ -f "$existing" ]; then
      log "Reusing runner tarball $existing (skips ~119MB download)"
      tar xzf "$existing"
    else
      local ver
      ver="$(curl -fsSL https://api.github.com/repos/actions/runner/releases/latest \
        | grep -oP '"tag_name":\s*"v\K[^"]+')"
      log "Downloading runner v$ver"
      curl -fsSL -o actions-runner.tar.gz \
        "https://github.com/actions/runner/releases/download/v${ver}/actions-runner-linux-x64-${ver}.tar.gz"
      tar xzf actions-runner.tar.gz && rm -f actions-runner.tar.gz
    fi
  fi
  ./config.sh --url "$GITHUB_REPO_URL" --token "$token" \
    --name "$(hostname)-$SERVICE_NAME" --labels self-hosted,linux,x64 \
    --work _work --unattended --replace
  sudo ./svc.sh install "$RUN_USER"
  sudo ./svc.sh start
  log "Runner installed and started as a service."
}

print_next_steps() {
  cat <<EOF

============================================================
 Bootstrap done. Remaining manual step: Cloudflare Tunnel.
============================================================
Your tunnel already exists, so just point jamnas.id at this app:

1. Add to your ~/.cloudflared/config.yml ingress list (catch-all stays LAST):
     - hostname: jamnas.id
       service: http://localhost:${PORT}
     - hostname: www.jamnas.id
       service: http://localhost:${PORT}

2. Create the DNS routes (replace <TUNNEL> with your tunnel name/UUID):
     cloudflared tunnel route dns <TUNNEL> jamnas.id
     cloudflared tunnel route dns <TUNNEL> www.jamnas.id

3. Restart cloudflared:
     sudo systemctl restart cloudflared

See deploy/cloudflared-ingress.yml and DEPLOY.md for details.

From now on: push to '$BRANCH' -> the runner builds & restarts automatically.
Local check:  curl -I http://localhost:${PORT}
============================================================
EOF
}

main() {
  require_not_root
  install_packages
  install_node
  clone_or_update
  build_app
  install_service
  install_sudoers
  install_runner
  print_next_steps
}

main "$@"
