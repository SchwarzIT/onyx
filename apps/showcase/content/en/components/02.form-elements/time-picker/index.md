---
title: Time picker
componentName: OnyxTimePicker
status: experimental
---

The time picker allows users to select a specific time or a time range.

## Examples

### Basic

Times can be typed directly or selected from the clock flyout menu.

<<< ./examples/Basic.example.vue preview=true  layout="grow" orientation="vertical"

### Range

Select a time range with explicit start and end times.

<<< ./examples/Range.example.vue preview=true  layout="grow"

### Select options

To restrict choices to predefined intervals, use `select` mode. Options can be generated automatically with a step interval (e.g. every 30 minutes) or supplied as a custom list.

<<< ./examples/Select.example.vue preview=true  layout="grow" orientation="vertical"

### AM / PM

Enable the AM/PM toggle for 12-hour clock formats. Set to `auto` to resolve format based on the active locale.

<<< ./examples/AmPm.example.vue preview=true  layout="grow" orientation="vertical"

### Min and max time

Constrain selectable times using `min` and `max` limits. Entering a value outside these bounds marks the input invalid with an error message.

<<< ./examples/MinMax.example.vue preview=true  layout="grow"

### Readonly & disabled

Use readonly or disabled states when time editing is prohibited.

<<< ./examples/Readonly.example.vue preview=true  layout="grow"

### Loading & skeleton

The `loading` state indicates asynchronous operations following user input, while `skeleton` renders a loading placeholder on initial page load.

<<< ./examples/Loading.example.vue preview=true  layout="grow"

### Message

Supports hint, error, and success messages with optional tooltip context. When multiple states apply, errors take precedence.

<<< ./examples/Message.example.vue preview=true  layout="grow" orientation="vertical"

### Slots

Custom slots are available for prefix and suffix content.

<<< ./examples/Slots.example.vue preview=true  layout="grow"

### Label positions

Labels can be aligned top, left, or floating to match form structures.

<<< ./examples/LabelPositions.example.vue preview=true  layout="grow" orientation="vertical"

### Date and time picker

See [date picker](/components/form-elements/date-picker-v2#date-and-time-picker) component for examples combining date and time inputs.
