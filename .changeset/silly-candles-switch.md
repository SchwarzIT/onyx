---
"sit-onyx": major
---

In order to align the design systems closer between DEV and UX (Vue.js library and Figma library), some technical changes have been made to the components:

- renamed `OnyxFab` to `OnyxFAB`
- renamed `OnyxFabItem` to `OnyxFABItem`
- renamed `OnyxFabButton` to `OnyxFABButton`
- renamed `OnyxProgressStep` to `OnyxProgressItem`
- added new box-shadow CSS variables `var(--onyx-shadow-medium-top)` and `var(--onyx-shadow-soft-top)`
- OnyxButton: support new `iconPosition` property to show a right aligned icon
- OnyxColorSchemeDialog: update SVGs for auto, light and dark mode
