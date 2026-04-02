---
"@sit-onyx/tiptap": minor
---

feat(OnyxTextEditor): use `OnyxFormElementV2` internally

- refactor!: change type for `message` and `success` property
- refactor!: remove `hideLabel` and `labelTooltip` property in favor of `label.hidden` and `label.tooltipText`
- feat: support left aligned label using `label.position`
- feat: support new properties: `loading`, `error` `showError`, `required` and `requiredMarker`
