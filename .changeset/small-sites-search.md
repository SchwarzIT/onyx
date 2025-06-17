---
"sit-onyx": minor
---

feat(OnyxDataGrid): support new `usePagination` feature

- features are now able to pass slots to the underlying OnyxTable of the data grid. Supported slots are: headline, bottomLeft and pagination (see [OnyxTable](https://storybook.onyx.schwarz/?path=/story/data-table--with-slots)).
- the feature context now also includes the `skeleton` of the data grid which can be used for custom components
- the skeleton now considers the current data when determining the skeleton count so the data grid layout does not shift
