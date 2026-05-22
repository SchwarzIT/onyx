---
title: Time picker
componentName: OnyxTimePicker
status: experimental
---

The time picker component allows users to select a specific time or a range of start and end time.

## Examples

### Basic

A single time can be selected by either typing in or by clicking the clock icon and selecting a time in the opened flyout.

:component-example{name="Basic" layout="grow" orientation="vertical"}

### Range

The time picker also supports selecting a time range with a start and end time.

:component-example{name="Range" layout="grow"}

### Select options

If the user should not be able to select any arbitrary time, the `select` mode can be used to show pre-defined time options that the user can choose from. The options can either be auto-generated based on a defined step size (e.g. every 30 minutes) or be passed as custom options.

:component-example{name="Select" layout="grow" orientation="vertical"}

### AM / PM

An AM / PM selection can be displayed to allow the user to select the time or time range additionally in a 12 hour cycle. The AM/PM mode can also be set to `auto` to show the switch depending on the current application locale / language.

:component-example{name="AmPm" layout="grow" orientation="vertical"}

### Slots

Multiple slots are supported to pass in custom content if needed.

:component-example{name="Slots" layout="grow"}

### Label positions

The time picker label can be positioned in several ways to support a wide variety of layouts.

:component-example{name="LabelPositions" layout="grow" orientation="vertical"}
