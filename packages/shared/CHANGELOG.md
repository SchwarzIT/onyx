# @sit-onyx/shared

## 1.0.0

### Major Changes

- 1911f6c: feat(dist)!: Removed commonjs builds
  - **BREAKING CHANGE:** We dropped commonjs (cjs) builds and packages are now shipped as a [pure esm package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#pure-esm-package). Node >= 18 is required.

- cc46754: bump minimum required Vite version to `>= 6`

### Patch Changes

- 3288513: fix(OnyxNavBar): prevent console warning for invalid `mobile` property
- 07549b9: fix(shared): change vite dependencies to optionalDependencies
- b6b4573: fix(@sit-onyx/shared): fix peerDependencies

  This fixed a dependency warning with a too strict version scope for `vue` and `sass-embedded` when a package is installed that depends on `@sit-onyx/shared` as peerDependency (e.g. `sit-onyx`)

## 1.0.0-beta.4

### Major Changes

- 1911f6c: feat(dist)!: Removed commonjs builds
  - **BREAKING CHANGE:** We dropped commonjs (cjs) builds and packages are now shipped as a [pure esm package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#pure-esm-package). Node >= 18 is required.

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
