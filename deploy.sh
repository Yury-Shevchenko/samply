#!/bin/bash
# Deploy / update the combined Express + Next.js server.
# Run from the Website/ directory on the production server.
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
git pull

echo "==> Installing Express deps..."
npm install

echo "==> Installing + building Next.js..."
cd nextapp
npm install
npm run build
cd ..

if [ "$1" = "--first" ]; then
  echo "==> Starting with pm2 (first deploy)..."
  pm2 start ecosystem.config.js --env production
  pm2 save
  echo ""
  echo "If pm2 isn't set to start on boot yet, run:  pm2 startup"
else
  echo "==> Restarting pm2 process..."
  pm2 restart samply --update-env
fi

echo ""
echo "Done. Combined server runs on port 3000 (pm2 name: samply)."
echo "Status: pm2 status      Logs: pm2 logs samply"
