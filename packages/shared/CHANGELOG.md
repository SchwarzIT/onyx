# @sit-onyx/shared

## 0.0.1-beta.0

### Patch Changes

- b6b4573: fix(@sit-onyx/shared): fix peerDependencies

  This fixed a dependency warning with a too strict version scope for `vue` and `sass-embedded` when a package is installed that depends on `@sit-onyx/shared` as peerDependency (e.g. `sit-onyx`)
