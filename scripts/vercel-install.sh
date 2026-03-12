#!/usr/bin/env bash
set -euo pipefail

# Clone and build sibling packages required by file: dependencies
SIBLING_DIR="../megastorybook"

if [ ! -d "$SIBLING_DIR" ]; then
  git clone --depth 1 https://github.com/donovangriggs/arc-design-system-storybook.git "$SIBLING_DIR"
fi

# Build all packages from the Turborepo workspace root
cd "$SIBLING_DIR"
npm install -g pnpm
pnpm install --frozen-lockfile
pnpm build

cd "$OLDPWD"

pnpm install --frozen-lockfile
