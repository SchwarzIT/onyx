# @sit-onyx/shared

## 1.0.0-beta.3

### Patch Changes

- 3288513: fix(OnyxNavBar): prevent console warning for invalid `mobile` property

## 1.0.0-beta.2

### Patch Changes

- 07549b9: fix(shared): change vite dependencies to optionalDependencies

## 1.0.0-beta.1

### Major Changes

- cc46754: bump minimum required Vite version to `>= 6`

## 0.0.1-beta.0

### Patch Changes

- b6b4573: fix(@sit-onyx/shared): fix peerDependencies

  This fixed a dependency warning with a too strict version scope for `vue` and `sass-embedded` when a package is installed that depends on `@sit-onyx/shared` as peerDependency (e.g. `sit-onyx`)
