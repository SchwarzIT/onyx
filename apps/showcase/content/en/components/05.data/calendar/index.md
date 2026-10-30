---
title: Calendar
componentName: OnyxCalendar
---

The calendar displays or selects dates across several selection modes (`single`, `multiple`, `range`). For form input workflows, consider our specialized components:

<div class="onyx-grid">
<link-card class="onyx-grid-span-4" headline="Date picker" link="/components/form-elements/date-picker-v2"></link-card>
<link-card class="onyx-grid-span-4" headline="Time picker" link="/components/form-elements/time-picker"></link-card>
</div>

## Examples

### Default

The calendar defaults to a display-only view. Custom slot content can be injected into individual date cells. The calendar size adapts automatically based on available container width, or can be pinned using the `size` prop.

Weekdays, month headers, and locale conventions synchronize automatically with the application's active language.

<<< ./examples/Basic.example.vue preview=true  layout="grow" style="--preview-max-width: 44rem"

### Single select

Allows selecting an individual date.

<<< ./examples/Single.example.vue preview=true  layout="grow"

### Multiselect

Allows selecting multiple distinct dates.

<<< ./examples/Multiple.example.vue preview=true  layout="grow"

### Range select

Allows selecting a continuous date range with start and end dates. When calendar weeks are enabled, clicking a week number selects the entire week.

<<< ./examples/Range.example.vue preview=true  layout="grow"

### Min, max and disabled dates

Disable date ranges using `min` and `max` bounds, or supply individual dates to disable specific days (e.g. holidays).

In this example, only the past and upcoming 7 days are selectable, with Wednesdays disabled:

<<< ./examples/MinMax.example.vue preview=true  layout="grow"

### Skeleton

Use the skeleton during initial calendar data loading.

<<< ./examples/Skeleton.example.vue preview=true  layout="grow"
