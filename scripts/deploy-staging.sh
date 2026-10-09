#!/bin/sh
set -eu

TARGET="/opt/myapp-staging"
ARCHIVE="dist/myapp.tar.gz"

echo "Starting staging deployment..."

# Confirm the package exists and is readable
test -f "$ARCHIVE"
tar -tzf "$ARCHIVE" > /dev/null

# Replace the previous application files
rm -rf "$TARGET/src" "$TARGET/node_modules"
tar -xzf "$ARCHIVE" -C "$TARGET"

# Install production dependencies
cd "$TARGET"
npm ci --omit=dev --no-audit --no-fund

# Restart the staging application
sudo -n /usr/bin/systemctl restart myapp-staging.service

# Verify the deployed application responds
curl -fsS \
  --retry 10 \
  --retry-delay 1 \
  --retry-connrefused \
  http://127.0.0.1:3001/health

echo ""
echo "Staging deployment successful!"
