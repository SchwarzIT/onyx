# @sit-onyx/playwright-utils

## 1.1.0

### Minor Changes

- effbc01: feat(useMatrixScreenshotTest): support passing a custom `test` function

  This allows e.g. to pass in custom text [fixtures](https://playwright.dev/docs/test-fixtures#creating-a-fixture).
  Example:

  ```ts
  import { test } from "./custom-fixtures";

  export const { executeMatrixScreenshotTest } = useMatrixScreenshotTest({ test });
  ```

## 1.0.0

### Major Changes

- 7fde5eb: We proudly announce:

  ## 🎉 Major release of version 1.0.0 🎉

  _There are no changes to the latest `beta` version._

  Thanks for all your help, bug reports and feature requests that made this possible.
  Our work still continues, we are actively working on new and more features and bug-fixes.

  Meet us at the [SITCON.perform](https://sitcon.schwarz/) in our UXDS Design room.

  With the **1.0.0** release the package API is stable and there won't be any breaking changes until the next major release.
  We don't expect more then one major release per year.

## 1.0.0-beta.5

### Minor Changes

- 17edbba: feat: implemented emit spy helper functions: `createEmitSpy` and `expectEmit`

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
