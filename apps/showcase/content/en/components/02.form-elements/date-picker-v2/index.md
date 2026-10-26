---
title: Date picker (v2)
componentName: OnyxDatePickerV2
status: experimental
---

The date picker allows users to select individual dates, multiple selections, or continuous date ranges.

<!-- TODO: check why export name from vue-component-meta is not "OnyxUnstableDatePickerV2" -->

## Examples

### Selection modes

The date picker supports `single`, `multi`, and `range` selection modes.

<<< ./examples/SelectionModes.example.vue preview=true  layout="grow" orientation="vertical"

### Min, max and disabled dates

Constrain selectable dates with `min` and `max` bounds, or provide an array of disabled dates (such as holidays or weekends).

In this example, only the past and upcoming 7 days are selectable, with Wednesdays disabled:

<<< ./examples/MinMax.example.vue preview=true  layout="grow"

### Calendar weeks

Calendar week numbers can be displayed alongside days. In `range` selection mode, clicking a week number selects the full week.

<<< ./examples/CalendarWeeks.example.vue preview=true  layout="grow"

### Readonly & disabled

Use readonly or disabled states when user input is restricted.

<<< ./examples/Readonly.example.vue preview=true  layout="grow"

### Loading & skeleton

The `loading` state indicates asynchronous operations following interaction, while `skeleton` renders a loading placeholder on initial page load.

<<< ./examples/Loading.example.vue preview=true  layout="grow"

### Message

Supports hint, error, and success messages with optional tooltip context. When multiple states apply, errors take precedence.

<<< ./examples/Message.example.vue preview=true  layout="grow" orientation="vertical"

### Slots

Custom slots are provided for prefix and suffix content.

<<< ./examples/Slots.example.vue preview=true  layout="grow"

### Label positions

Labels can be aligned top, left, or floating to accommodate various form layouts.

<<< ./examples/LabelPositions.example.vue preview=true  layout="grow" orientation="vertical"

### Date and time picker

To select both date and time, pair the date picker with an [OnyxTimePicker](/components/form-elements/time-picker). Separating the two inputs ensures clearer usability across desktop and mobile screens.

<<< ./examples/DateTime.example.vue preview=true  layout="grow"
