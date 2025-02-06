#!/usr/bin/env sh
set -ex

# Runs the dev script with turbo watch for the given package.
# Turbo will run all dependency builds initially, but also watch and rebuild any changed dependencies 
pnpm exec turbo watch $1#dev 