---
"sit-onyx": major
---

refactor: align list items

- OnyxSelect: remove property `color`
- OnyxUserMenu: remove property `options` and even `optionsClick` in favor of a `default` slot where `<OnyxListItem>` should be placed
