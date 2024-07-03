---
"sit-onyx": major
---

refactor navigation components

- `OnyxFlyoutMenu`: rename default slot to options
- previous `OnyxNavItem` component is now `OnyxNavButton` with changed API
- new `OnyxNavItem` is now only intended to be used as children for the new `OnyxNavButton`
- `OnyxUserMenu`: property `avatar` now only accepts a string, not an object
