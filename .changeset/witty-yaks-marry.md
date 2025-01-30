---
"sit-onyx": major
---

### feat(OnyxDataGrid)!: Implemented support for column types and custom renderers into the feature API

- The new feature property `typeRenderer` can be used to define custom renderers for column types. TypeRenderer keys of type `symbol` are intended for internal usage.
- These types can now be specified in the `column` configuration with the new `ColumnConfig` type.
- `watch` is not a required property anymore.
- Features can now define `modifyColumns` to add, drop or change the normalized column configuration.

### feat(DataGridRenderer)!: Removed `prop` from `DataGridRendererColumn`.

- The `component` has no need for this abstraction. Any props can be directly used in the passed component.
