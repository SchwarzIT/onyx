---
"sit-onyx": minor
---

fix(OnyxDatePickerV2): implement several bug fixes

- remove non-existing properties `hideLabel` and `labelTooltip` in favor of `label.hidden` and `label.tooltipText`
- use correct type for `message`, `error`, `success` and `selectionMode` property
- remove default `popoverOptions.fitParent` so the calendar popover is always displayed correctly, even when the date picker width is very small
- use correct aria-label for calendar popover
- support new property `hideClearIcon`
- support new slots: leading, leadingIcons, trailingIcons, trailing and bottomRight
