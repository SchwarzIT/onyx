#!/usr/bin/env sh
set -ex

PKG_NAME=$1

# Add the @sit-onyx scope if the package is not sit-onyx itself. 
if [ "$PKG_NAME" != "sit-onyx" ]; then
    PKG_NAME="@sit-onyx/$PKG_NAME"
fi

# watch runs all the builds in parallel, which can lead to issues
pnpm exec turbo run build --filter=$PKG_NAME... --filter=\!$PKG_NAME
# Runs the dev script with turbo watch for the given package.
# Turbo will run all dependency builds initially, but also watch and rebuild any changed dependencies 
pnpm exec turbo watch $1#dev 