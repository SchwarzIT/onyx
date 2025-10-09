---
"sit-onyx": patch
---

fix(OnyxDatePicker): empty undefined instead of empty string when value is cleared

Also the type for the `update:modelValue` event has been fixed to be `string | undefined` instead of `DateValue | undefined` since its always a string timestamp if a date is selected.
