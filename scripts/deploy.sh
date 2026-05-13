#!/usr/bin/env bash
set -euo pipefail

# VRTCLS.AI deploy script — run on the Vultr host as the deploy user.

cd "$(dirname "$0")/.."

echo "→ Pulling latest from git…"
git pull --ff-only

echo "→ Installing dependencies…"
npm install --legacy-peer-deps --no-audit --no-fund

echo "→ Applying schema migrations…"
npm run db:push

echo "→ Seeding baseline data (idempotent)…"
npm run db:seed

echo "→ Building…"
npm run build

echo "→ Reloading PM2…"
pm2 reload ecosystem.config.cjs

echo "✓ Deploy complete."
