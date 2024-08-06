---
"sit-onyx": major
---

fix: require aria label for radio and checkbox group

Removed property `headline` from `OnyxRadioGroup` and `OnyxCheckbox` in favor of new required `label` property which is also used as aria label for screen readers.
If you want to visually hide the label, set the `hideLabel` property.
