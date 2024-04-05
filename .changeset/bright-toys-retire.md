---
"sit-onyx": major
---

refactor: align properties for selection components

- remove type `SelectionOption` and `ListboxOption` in favor of `SelectOption`. Affects: OnyxCheckboxGroup, OnyxRadioButtonGroup, OnyxListbox and OnyxSelect
- OnyxSelect: change property `modelValue` to be a select options instead of value only. This allows (e.g. to display a label for the current value(s) when the value(s) are not included in the options or the options are loading asynchronously)
- OnyxSelect: require property `options`
- OnyxRadioButtonGroup: change property `modelValue` to be the primitive value instead of a whole option
- fix(OnyxRadioButtonGroup): modelValue not shown as selected if type is number or boolean
- rename type `Multiple` to `SelectMultiple`
- remove utility type `TargetEvent`
