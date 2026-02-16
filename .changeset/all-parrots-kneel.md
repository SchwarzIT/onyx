---
"sit-onyx": patch
---

refactor: rename the "Timepicker" component, its related types and CSS classes to "TimePicker" (camel case) to be aligned with common naming conventions.
This affects:

- Component name: `OnyxUnstableTimepicker` to `OnyxUnstableTimePicker`
- CSS classes: `.onyx-timepicker-*` to `.onyx-time-picker-*`
- types: `OnyxTimepickerProps` to `OnyxTimePickerProps`, `TIMEPICKER_TYPES` to `TIME_PICKER_TYPES` and `TimepickerSelectOptions` to `TimePickerSelectOptions`
