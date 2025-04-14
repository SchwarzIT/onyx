---
"sit-onyx": major
---

- fix(OnyxDataGrid): fixed issue related to sticky columns and restricted height.
- feat!(OnyxDataGrid): `width` can now be defined using the `columns` configuration. All track-list values that are supported by [grid-template-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns) can be used.
  - BREAKING: table is now formatted using CSS (sub-)grids. Existing stylings might break.
- feat(OnyxDataGrid/resizing): support double-click to auto-size column.
