---
"sit-onyx": minor
---

fix(useOpenDirection): handle viewport boundaries when no overflow parent exists
feat(OnyxDataGrid): add `OnyxItemsPerPage` component and pagination page size control

- Add `OnyxItemsPerPage` component for configurable page size selection
- Add `itemsPerPage` option to `OnyxDataGrid` pagination feature to control visible rows per page

For now, the components are marked as experimental/unstable which means that they are still under active development and the API might change in patch or minor releases. Keep an eye on the [changelog](https://onyx.schwarz/development/packages/changelogs/sit-onyx.html) when using them.
