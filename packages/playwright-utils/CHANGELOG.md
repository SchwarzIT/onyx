# @sit-onyx/playwright-utils

## 1.0.0-beta.4

### Major Changes

- 1911f6c: feat(dist)!: Removed commonjs builds

  - **BREAKING CHANGE:** We dropped commonjs (cjs) builds and packages are now shipped as a [pure esm package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#pure-esm-package). Node >= 18 is required.

## 1.0.0-beta.3

### Minor Changes

- ec6e617: feat: add utility `useFocusStateHooks`

## 1.0.0-beta.2

### Patch Changes

- db28d04: fix: prevent `Unknown file extension ".ts"` error

## 1.0.0-beta.1

### Major Changes

- 6709c88: release version `1.0.0-beta.1`

  There are no changes in this version. We only bumped/fixed the package version to `1.0.0-beta.1` to be aligned with other packages.

## 0.1.0-beta.0

### Minor Changes

- ad309b3: feat: implement `useMatrixScreenshotTest` and `adjustSizeToAbsolutePosition`

  See our [docs](https://onyx.schwarz/development/packages/playwright-utils.html) for further information.
