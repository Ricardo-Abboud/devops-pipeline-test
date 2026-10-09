#!/bin/sh
set -eu

TARGET="/opt/myapp-production"
ARCHIVE="dist/myapp.tar.gz"

echo "Starting production deployment..."

# Verify package
test -f "$ARCHIVE"
tar -tzf "$ARCHIVE" > /dev/null

# Deploy application files
rm -rf "$TARGET/src" "$TARGET/node_modules"
tar -xzf "$ARCHIVE" -C "$TARGET"

# Install production dependencies
cd "$TARGET"
npm ci --omit=dev --no-audit --no-fund

# Restart production service
sudo -n /usr/bin/systemctl restart myapp-production.service

# Verify application
curl -fsS \
  --retry 10 \
  --retry-delay 1 \
  --retry-connrefused \
  http://127.0.0.1:3002/health

echo ""
echo "Production deployment successful!"
