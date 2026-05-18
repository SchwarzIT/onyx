---
title: Checkbox group
componentName: OnyxCheckboxGroup
---

Checkboxes are a fundamental UI element, that allows users to make a binary selection. They are commonly used for tasks such as selecting multiple items, opting into services or confirming and agreeing. The checkbox group is a convenience component to simplify the management of multiple related options. For individual use, you can also use the [checkbox](/components/support/checkbox) component.

## Examples

### Basic

Each individual checkbox option supports different properties to e.g. make it required, disabled, loading etc. The checkbox group itself will manage the checked state of all checkboxes.

:component-example{name="Basic"}

### Horizontal

The checkbox group can optionally be used in horizontal orientation.

:component-example{name="Horizontal" layout="fullWidth"}

### Check all

A "Select all" option is supported that allows for easily checking / unchecking all options.

:component-example{name="CheckAll"}

### Disabled

The whole group or only individual options can be disabled to indicate that they can currently not be checked.

:component-example{name="Disabled"}

### Skeleton

The skeleton can be used on initial load to indicate that the data for the checkbox group is currently loading.
The number of skeleton options is customizable.

:component-example{name="Skeleton"}

### Truncation

By default, the checkboxes are truncated with ellipsis (...) if the label is too long to fit into the available width. Alternatively, multiline truncation can be used to wrap the label into multi lines instead. The truncation can be configured for the whole group or individual checkboxes.

:component-example{name="Truncation"}
