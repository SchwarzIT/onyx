---
"sit-onyx": major
---

refactor: align properties for selection components

- remove type `SelectionOption` and `ListboxOption` in favor of `SelectOption`. Affects: OnyxCheckboxGroup, OnyxRadioButtonGroup, OnyxListbox and OnyxSelect
- OnyxRadioButtonGroup: change property `modelValue` to be the primitive value instead of a whole option
- OnyxSelect: require property `options`
- fix(OnyxRadioButtonGroup): modelValue not shown as selected if type is number or boolean
- rename type `Multiple` to `SelectMultiple`
- remove utility type `TargetEvent`
