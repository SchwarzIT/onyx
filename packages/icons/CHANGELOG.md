# @sit-onyx/icons

## 1.0.0-beta.23

### Patch Changes

- a18d955: fix declaration of "sideEffects" in package.json

## 1.0.0-beta.22

### Major Changes

- c235692: feat: export all icons also as JavaScript constants

  All icons are now also offered as JavaScript exports instead of only providing the raw SVG files.
  This enables a better developer experience, IDE intellisense and easier import handling.
  The SVG imports are still available. However, it is recommended to use the JavaScript exports for a better developer experience if possible.

  When using the JavaScript exports, the icon names are prefixed with "icon", followed by the pascal case icon name.
  This ensures there are no conflicts with native JavaScript keywords and also makes it clearer that you are working with an icon.

  Option 1: JavaScript exports (recommended)

  ```ts
  import { iconFileArchive, iconFileCsv, iconFilePdf } from "@sit-onyx/icons";

  // to import all icons:
  // import * as ALL_ICONS from "@sit-onyx/icons";
  ```

  Option 2: import SVG files directly

  ```ts
  import fileArchive from "@sit-onyx/icons/file-archive.svg?raw";
  import fileCsv from "@sit-onyx/icons/file-csv.svg?raw";
  import filePdf from "@sit-onyx/icons/file-pdf.svg?raw";
  ```

  #### Breaking changes
  - utility functions and types are moved from `@sit-onyx/icons` to `@sit-onyx/icons/utils` so the root path only includes icons
  - removed import `@sit-onyx/icons/metadata.json`, use `import { ICON_METADATA } from "@sit-onyx/icons/utils";` instead

## 1.0.0-beta.21

### Major Changes

- 1911f6c: feat(dist)!: Removed commonjs builds
  - **BREAKING CHANGE:** We dropped commonjs (cjs) builds and packages are now shipped as a [pure esm package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#pure-esm-package). Node >= 18 is required.

## 1.0.0-beta.20

### Minor Changes

- eb481fe: feat: update icons

  #### New
  - server-edit

## 1.0.0-beta.19

### Minor Changes

- 5a27c6a: feat: update icons

  #### New
  - notebook-code
  - terraform

## 1.0.0-beta.18

### Minor Changes

- d1df993: feat: update icons

  #### New
  - workflows

## 1.0.0-beta.17

### Minor Changes

- 0f045f0: feat: update icons

  #### New
  - expand-window-small
  - network-card
  - RSS-web-feed
  - traffic-light
  - weight-kg

  #### Modified
  - eye-closed
  - notification-flag

## 1.0.0-beta.16

### Minor Changes

- de2a1e8: feat: update icons

  #### New icons
  - check-read

## 1.0.0-beta.15

### Minor Changes

- e9ef809: feat: update icons

  #### New icons
  - eye-closed

## 1.0.0-beta.14

### Minor Changes

- 41eb73c: feat: update icons

  #### New icons
  - cloud-edge
  - computer-security-warning
  - cookie
  - profile-hook
  - server-search

## 1.0.0-beta.13

### Minor Changes

- 9319044: feat: update icons

  #### New icons
  - hacker
  - paragraph

## 1.0.0-beta.12

### Major Changes

- 00ca133: feat: update icons

  #### Deleted icons
  - mail-key

  #### New icons
  - bullet-list
  - key-mail
  - list-arrow-down
  - list-arrow-up
  - more-horizontal-small
  - more-vertical-small
  - settings-arrows

  #### Modified icons
  - key-clock
  - notification-flag
  - sidebar-arrow-left

## 1.0.0-beta.11

### Minor Changes

- f471335: feat: update icons

  #### New icons
  - book-binocular
  - key-clock
  - mail-key

## 1.0.0-beta.10

### Minor Changes

- ad447e9: feat: update icons

  #### New icons
  - browser-domain

  #### Modified icons
  - key-settings

## 1.0.0-beta.9

### Minor Changes

- ee0fcd2: feat: update icons

  #### New icons
  - browser-domain

  #### Modified icons
  - key-settings

## 1.0.0-beta.8

### Minor Changes

- 6755052: feat: update icons

  #### New icons
  - cloud-files
  - folder-file

## 1.0.0-beta.7

### Minor Changes

- f6f01c6: feat: update icons

  #### New icons
  - bookmark-filled

## 1.0.0-beta.6

### Minor Changes

- be5b415: feat: update icons

  #### Modified icons
  - cancellation-undone
  - sidebar-arrow-right

## 1.0.0-beta.5

### Minor Changes

- 3e49c73: feat: update icons

  #### New icons
  - key-settings

## 1.0.0-beta.4

### Minor Changes

- 33700f9: feat: update icons

  Also fixed icon aliases in the metadata for most icons which are now separated correctly

  #### New icons
  - heptagon-cloud-foundry

  #### Modified icons
  - sidebar-arrow-right

## 1.0.0-beta.3

### Patch Changes

- 188c94d: fix(icons): prevent empty string aliases

## 1.0.0-beta.2

### Minor Changes

- 79033ac: feat: update icons

  #### New icons
  - heart-filled
  - rocket-plus
  - star-filled

## 1.0.0-beta.1

### Major Changes

- b525ca5: feat: update latest icons

  All icons are updated to use the latest icons from

  #### New icons
  - anchor
  - arrow-small-up-right-top
  - broom
  - can
  - cheese
  - chocolate
  - company-plus
  - computer-eye
  - container-large
  - container-small
  - containers
  - controller
  - crane
  - dolphin
  - git
  - globe-network
  - globe-shield
  - icecream
  - parking-search
  - prawn
  - ship-container
  - store-test
  - tie
  - truck-attention
  - truck-empty

  #### Deleted icons
  - computer-argus (renamed to computer-eye)

  #### Other breaking changes
  - removed `ICON_CATEGORIES`, use `groupIconsByCategory(ICON_METADATA)` instead
  - removed `optimizeSvg`, `isDirectory` and `readAllIconPaths`
  - moved exported types from `/utils` to `/types`

## 1.0.0-beta.0

### Major Changes

- bf3ea0a: release beta version

  🎉 onyx is now beta! There are no breaking changes to the last `1.0.0.-alpha.*` version

## 0.1.0-alpha.2

### Minor Changes

- fad8140: feat: add new icons
  - arrow-small-down
  - arrow-small-up
  - car-electric
  - circle-contrast
  - heptagon-cloud-lock
  - heptagon-cloud
  - heptagon-lock
  - kubernetes-shield
  - new
  - print-dots
  - print-list
  - search-x
  - server-shield
  - soccer

## 0.1.0-alpha.1

### Minor Changes

- 99b2089: feat: add `getIconImportName` utility

## 0.1.0-alpha.0

### Minor Changes

- 5ac259d: feat(icons): update icons

  The new available icons are:
  - chevron-down-up
  - plus-minus
  - server-lock
  - kubernetes-lock
