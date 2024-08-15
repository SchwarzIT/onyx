---
"@sit-onyx/icons": major
---

feat: sync icons with Figma library

All icons are now synched with [Figma library](https://www.figma.com/design/YfEUBOHk4J4nYrk04geswG/Onyx-Component-Library?node-id=6-854) to ensure consistency between DEV and UX and to improve the maintenance workflow.

#### New icons

- car-circle-check
- cart-checkmark
- circle-both-directions
- clipboard-check
- clipboard-secure
- company-plus
- controller
- dolphin
- dynamit
- edit-disabled
- emoji-neutral
- file-block
- file-check
- mask
- parking-search
- rollwagen
- test
- tie
- tool-crop-1
- user-setting

#### Deleted icons

- box-check
- box
- car-check
- cart-check
- circle-both-direction
- clipboard-circle-check
- clipboard-shield
- dynamite
- edit-disabled
- emoji-neutral-1
- engine
- file-blocked
- file-circle-check
- logout
- mask-1
- print-dots
- print-list
- test-tube
- tool-crop
- trolley
- user-settings

#### Other breaking changes

- removed `ICON_CATEGORIES`, use `groupIconsByCategory(ICON_METADATA)` instead
- removed `optimizeSvg`, `isDirectory` and `readAllIconPaths`
- moved exported types from `/utils` to `/types`
