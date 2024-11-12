---
"@sit-onyx/shared": patch
---

fix(@sit-onyx/shared): fix peerDependencies

This fixed a dependency warning with a too strict version scope for `vue` and `sass-embedded` when a package is installed that depends on `@sit-onyx/shared` as peerDependency (e.g. `sit-onyx`)
