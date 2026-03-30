---
"sit-onyx": minor
---

feat(OnyxTimePicker): update implementation and use `OnyxFormElementV2` internally

- fix: use correct styles for "clock" icon
- fix: use correct component height (previously it was slightly bigger than other form elements)
- fix: update spacings for "range" mode popover
- fix: for "select" mode, use default values for min/max property when they contain invalid values (previously no options were shown)
- fix!: remove `infoLabel` property in favor of `popoverOptions.description`
- feat: support new slots: `leading`, `leadingIcons`, `trailingIcons`, `trailing` and `bottomRight`
- feat: in "default" mode, clicking the "clock" button now opens the native browser picker
- feat: add new `validityChange` event
- feat: expose native HTML `input`
