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

#### Other breaking changes

- removed `ICON_CATEGORIES`, use `groupIconsByCategory(ICON_METADATA)` instead
- removed `optimizeSvg`, `isDirectory` and `readAllIconPaths`
- moved exported types from `/utils` to `/types`
