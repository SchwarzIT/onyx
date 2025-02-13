#!/usr/bin/env sh
set -ex

# watch runs all the builds in parallel, which can lead to issues
pnpm exec turbo run build --filter=$1... --filter=\!$1
# Runs the dev script with turbo watch for the given package.
# Turbo will run all dependency builds initially, but also watch and rebuild any changed dependencies 
pnpm exec turbo watch $1#dev 