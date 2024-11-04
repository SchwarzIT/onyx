---
"@sit-onyx/storybook-utils": major
---

**BREAKING**: Removed brand defaults, `createPreview` now expects a new first parameter which requires brand details to be set.
**BREAKING**: Removed brand defaults, `createTheme` now requires brand details to be set, `base: "light" | "dark"` is now the secondary parameter.
feat: Added `getCustomProperty` function which is used to load color values for theme.
