# @sit-onyx/tiptap

## 0.1.0

### Minor Changes

- ad676a1: Release initial version
- 8e291bb: feat(OnyxTextEditor): support new properties: placeholder, reserveMessageSpace, labelTooltip and density

  Also fix the autosize behavior so the editor width does not grow when adding more rows

### Patch Changes

- ec1e096: fix(OnyxTextEditor): implement several bug fixes
  - disable toolbar actions when editor is disabled
  - add fixed with to link dialog to prevent jumpy layouts
  - hide redo/undo buttons when extension is disabled
  - wrap words correctly to prevent overflow
  - export type `OnyxStarterKitOptions`

- Updated dependencies
  - sit-onyx@1.9.0
  - @sit-onyx/icons@1.7.0
