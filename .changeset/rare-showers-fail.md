---
"sit-onyx": patch
---

- fix(OnyxDatePickerV2): remove non-existing properties `hideLabel` and `labelTooltip` in favor of `label.hidden` and `label.tooltipText`
- fix(OnyxDatePickerV2): correctly type `selectionMode` property
- feat(OnyxDatePickerV2): support new property `hideClearIcon`
- fix(OnyxDatePickerV2): use correct type for `message`, `error` and `success` property
- fix(OnyxDatePickerV2): remove default `popoverOptions.fitParent` so the calendar popover is always displayed correctly, even when the date picker width is very small
