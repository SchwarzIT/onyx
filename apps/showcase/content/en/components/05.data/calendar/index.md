---
title: Calendar
componentName: OnyxCalendar
---

The calendar is used to display or select date-related information. It supports multiple selection modes such as single, multiple, range and more. For selecting date and time, we recommend to use our dedicated components:

<div class="onyx-grid">
<link-card class="onyx-grid-span-4" headline="Date picker" link="/components/form-elements/date-picker-v2"></link-card>
<link-card class="onyx-grid-span-4" headline="Time picker" link="/components/form-elements/time-picker"></link-card>
</div>

## Examples

### Default

The calendar is display-only by default. Custom content can be added to specific dates if needed. The calendar sizes automatically adapts between small and big depending on the available width but can optionally be forced using the `size` property. When using custom content, make sure to consider the current calendar size so it is correctly visible on smaller devices.

The calendar uses the current language of the application to automatically adapt weekdays, months and more.

:component-example{name="Basic" layout="grow" style="--preview-max-width: 44rem"}

### Single select

Allows the user to select a single date.

:component-example{name="Single" layout="grow"}

### Multiselect

Allows the user to select multiple dates.

:component-example{name="Multiple" layout="grow"}

### Range select

Allows the user to select a range with a start and end date. If calendar weeks are enabled, the user can click a specific calendar week to automatically select the whole week.

:component-example{name="Range" layout="grow"}

### Min, max and disabled dates

Specific dates can be disabled by defining a minimum or maximum date where all dates before/after the given date will be disabled or by specifying individual dates (e.g. every Wednesday). Alternatively, the `disabled` property can be set to disabled all dates.

In the example below, only the past and upcoming 7 days are selectable except Wednesdays.

:component-example{name="MinMax" layout="grow"}

### Skeleton

The skeleton can be used on initial page load when the data for the page / calendar is initially loaded.

:component-example{name="Skeleton" layout="grow"}
