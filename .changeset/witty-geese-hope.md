---
"sit-onyx": major
---

feat(OnyxDataGrid): implement menu items for sorting feature

#### Breaking changes

- OnyxDataGrid: rename header actions property `listItems` to `menuItems`. It now expects `OnyxMenuItem` components instead of `OnyxListItem`

#### Features

- OnyxDataGrid: add German translations

#### Fixes

- OnyxDataGrid: update translations when locale changes
- OnyxUserMenu: use `OnyxMenuItem` for footer instead of `OnyxListItem`
