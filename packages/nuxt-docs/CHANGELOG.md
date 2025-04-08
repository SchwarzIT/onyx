# @sit-onyx/nuxt-docs

## 1.0.0-beta.2

### Patch Changes

- ed69f4e: Fix some issues when trying to use the `@sit-onyx/nuxt-docs` package:

  - remove no longer existing OnyxNavButton in favor of OnyxNavItem. Also include type-check into the build to prevent such issues in the future
  - update docs to include missing required steps/configuration
  - use peerDependencies instead of dependencies
  - remove `useCollection` composable and move the code to the page directly because async composables are not yet fully supported

## 1.0.0-beta.1

### Patch Changes

- Updated dependencies [4b9f366]
  - sit-onyx@1.0.0-beta.190
  - @sit-onyx/nuxt@1.0.0-beta.192

## 1.0.0-beta.0

### Major Changes

- f565896: release initial version
