---
"@sit-onyx/headless": major
"sit-onyx": minor
---

- implemented headless feature: `createNavigationMenu`
- headless MenuButton:
  - now takes an `isExpandedRef` and `onToggle` via it's options
  - `flyout` element is removed as it is not needed
  - removed hover and focus toggle features and moved them to the onyx component directly as these are non spec features
- update headless implementation in `sit-onyx`
