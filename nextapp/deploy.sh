#!/bin/bash
# Deploy / update the Next.js researcher dashboard on the server.
# Run this from Website/nextapp/ on the production server.
#
# First deploy:
#   chmod +x deploy.sh
#   ./deploy.sh --first
#
# Subsequent updates:
#   ./deploy.sh

set -e
cd "$(dirname "$0")"

echo "==> Pulling latest code..."
git -C ../.. pull

echo "==> Installing dependencies..."
npm install --frozen-lockfile

echo "==> Building..."
npm run build

if [ "$1" = "--first" ]; then
  echo "==> Starting with pm2 (first deploy)..."
  pm2 start ecosystem.config.js
  pm2 save
  echo ""
  echo "If you haven't set pm2 to start on boot yet, run:"
  echo "  pm2 startup"
  echo "and follow the printed instruction."
else
  echo "==> Restarting pm2 process..."
  pm2 restart samply-next
fi

echo ""
echo "Done. Next.js is running on port 3001."
echo "Check status with: pm2 status"
echo "View logs with:    pm2 logs samply-next"
