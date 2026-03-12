#!/usr/bin/env bash
set -euo pipefail

# Clone and build sibling packages required by file: dependencies
SIBLING_DIR="../megastorybook"

if [ ! -d "$SIBLING_DIR" ]; then
  git clone --depth 1 https://github.com/donovangriggs/arc-design-system-storybook.git "$SIBLING_DIR"
fi

cd "$SIBLING_DIR/packages/tokens"
npm install --ignore-scripts
npm run build 2>/dev/null || true

cd ../core
npm install --ignore-scripts
npm run build 2>/dev/null || true

cd "$OLDPWD"

pnpm install --frozen-lockfile
