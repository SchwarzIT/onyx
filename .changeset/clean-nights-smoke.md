---
"sit-onyx": minor
---

feat(OnyxDataGrid): support new `type` option for usePagination feature that supports lazy and button loading

Also support new `_trAttributes` and `_columns` property for data grid entries/data:

- `_trAttributes`: can be used to pass attributes that are bound directly to the `<tr>` element
- `_columns`: override which columns to render for the specific row. Useful if creating custom full-width rows
