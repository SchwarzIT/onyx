---
title: Date picker (v2)
componentName: OnyxDatePickerV2
status: beta
---

The date picker component can be used to select a date, multiple dates or a range of dates.

<!-- TODO: check why export name from vue-component-meta is not "OnyxUnstableDatePickerV2" -->

## Examples

### Selection modes

The date picker supports different selection modes like single, multi and range select.

:component-example{name="SelectionModes" layout="grow" orientation="vertical"}

### Min, max and disabled dates

To limit which dates the user can select, you can optionally set a min and max date so all dates before `min` and after `max` will be disabled and can not be selected.
Additionally, you can define custom / specific dates that are disabled, e.g. due to public holidays.

In the example below, only the past and upcoming 7 days are selectable except Wednesdays.

:component-example{name="MinMax" layout="grow"}

### Calendar weeks

Calendar weeks can be displayed inside the calendar. When using the `range` selection mode, the calendar week can be clicked to automatically select the whole week.

:component-example{name="CalendarWeeks" layout="grow"}

### Readonly & Disabled

Readonly and disabled are used to indicate that the date picker is currently not editable.

:component-example{name="Readonly" layout="grow"}

### Loading & Skeleton

The loading state is used after a user interaction to indicate that the triggered action is currently loading / in progress. On the other hand, the skeleton should be used on initial page load when the data for the page is initially loaded.

:component-example{name="Loading" layout="grow"}

### Message

An optional message, error or success message can be displayed. Each message supports showing an info tooltip with further information.
When multiple message types are defined at once, only the most relevant will be displayed (e.g. error is preferred over the regular message).

:component-example{name="Message" layout="grow" orientation="vertical"}

### Slots

Multiple slots are supported to pass in custom content if needed.

:component-example{name="Slots" layout="grow"}

### Label positions

The label can be positioned in several ways to support a wide variety of layouts.

:component-example{name="LabelPositions" layout="grow" orientation="vertical"}
