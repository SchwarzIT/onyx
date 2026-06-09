# @sit-onyx/tiptap

## 0.3.0

### Minor Changes

- 2d6a854: feat: generate and publish `component-meta.json` file which includes the onyx API as JSON

### Patch Changes

- 85d97a2: fix: do not bundle any Tiptap dependencies

  Previously some `@tiptap/` dependencies were bundled inline into the `@sit-onyx/tiptap` package which might have caused issues when additional Tiptap dependencies are installed in the project. This fix also reduces the bundles size of `@sit-onyx/tiptap` by ~85%.

## 0.2.0

### Minor Changes

- 9ac6890: feat(OnyxTextEditor): support `minlength`, `maxlength` and `withCounter` properties
- 2581398: feat(OnyxTextEditor): use `OnyxFormElementV2` internally
  - refactor!: change type for `message` and `success` property
  - refactor!: remove `hideLabel` and `labelTooltip` property in favor of `label.hidden` and `label.tooltipText`
  - feat: support left aligned label using `label.position`
  - feat: support new properties: `loading`, `error` `showError`, `required` and `requiredMarker`

### Patch Changes

- b49d8e6: fix(OnyxTextEditor): consider errors in native HTML form validation
- 08c21b2: fix: remove focus border and outline styles
- Updated dependencies
  - sit-onyx@1.12.0
  - @sit-onyx/icons@1.9.0

## 0.1.0

### Minor Changes

- ad676a1: Release initial version

  For further information, please refer to the [documentation](https://storybook.onyx.schwarz/?path=/docs/form-elements-texteditor--docs)
