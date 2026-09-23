---
title: Time picker
componentName: OnyxTimePicker
status: experimental
---

The time picker component allows users to select a specific time or a range with start and end time.

## Examples

### Basic

A single time can be selected by either typing in or by clicking the clock icon and selecting a time in the opened flyout.

<<< ./examples/Basic.example.vue preview=true  layout="grow" orientation="vertical"

### Range

The time picker also supports selecting a time range with a start and end time.

<<< ./examples/Range.example.vue preview=true  layout="grow"

### Select options

If the user should not be able to select any arbitrary time, the `select` mode can be used to show pre-defined time options that the user can choose from. The options can either be auto-generated based on a defined step size (e.g. every 30 minutes) or be passed as custom options.

<<< ./examples/Select.example.vue preview=true  layout="grow" orientation="vertical"

### AM / PM

An AM / PM selection can be displayed to allow the user to select the time or time range additionally in a 12 hour cycle. The AM/PM mode can also be set to `auto` to show the switch depending on the current application locale / language.

<<< ./examples/AmPm.example.vue preview=true  layout="grow" orientation="vertical"

### Min and max time

When a minimum or maximum time is defined, the user must select a time after (or including) `min` and before (or including) `max` before the input is valid. Otherwise the time picker is invalid and a proper error message is displayed.

<<< ./examples/MinMax.example.vue preview=true  layout="grow"

### Readonly & Disabled

Readonly and disabled are used to indicate that the time picker is currently not editable.

<<< ./examples/Readonly.example.vue preview=true  layout="grow"

### Loading & Skeleton

The loading state is used after a user interaction to indicate that the triggered action is currently loading / in progress. On the other hand, the skeleton should be used on initial page load when the data for the page is initially loaded.

<<< ./examples/Loading.example.vue preview=true  layout="grow"

### Message

An optional message, error or success message can be displayed. Each message supports showing an info tooltip with further information.
When multiple message types are defined at once, only the most relevant will be displayed (e.g. error message takes precedent over the regular message).

<<< ./examples/Message.example.vue preview=true  layout="grow" orientation="vertical"

### Slots

Multiple slots are supported to pass in custom content if needed.

<<< ./examples/Slots.example.vue preview=true  layout="grow"

### Label positions

The time picker label can be positioned in several ways to support a wide variety of layouts.

<<< ./examples/LabelPositions.example.vue preview=true  layout="grow" orientation="vertical"

### Date and time picker

See the [date picker](/components/form-elements/date-picker-v2#date-and-time-picker) component for an example on how to use a combined date and time picker.
