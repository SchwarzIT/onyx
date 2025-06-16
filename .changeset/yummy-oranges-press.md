---
"sit-onyx": major
---

- feat(OnyxDataGrid)!: Support async (disabling) data transformation

BREAKING CHANGE: The `createFeature` and `useDataGridFeatures` API has been adapted.
The type `DataGridFeature`, which they use, is now called `DataGridFeatureDescription`.
`DataGridFeature` is now a function which enables the passing of context from the `OnyxDataGrid` itself to the features.
The function `DataGridFeature` is required to return a `DataGridFeatureDescription` type.
Simply wrap a `DataGridFeatureDescription` into a function to stay compatible.
