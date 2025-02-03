---
"sit-onyx": patch
---

fix(OnyxDataGrid): export sorting types

Previously, all data grid types were exported under the `DataGridFeatures` namespace so if you e.g. wanted to use the `SortState` type, you'd need to use `DataGridFeatures.SortState`.

This is unintuitive so those types are now directly exported individually from `sit-onyx`. The data grid features itself are still exported under the `DataGridFeatures` namespace.
