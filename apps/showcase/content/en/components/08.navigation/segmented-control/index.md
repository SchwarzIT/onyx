---
title: Segmented control
componentName: OnyxSegmentedControl
---

The segmented control is an interactive component that allows users to select a single option from a set of mutually exclusive choices. It is commonly used for view toggles (such as switching between card and table layouts) or compact filter bars.

## Examples

### Basic

The segmented control consists of two or more options displaying a label and optional icon. We recommend displaying icons across all options or omitting them entirely, rather than mixing icon and text-only buttons.

<<< ./examples/Basic.example.vue preview=true  layout="grow"

### Icons only

Option labels can be visually hidden to render an icon-only segment. In this configuration, the control fits its content rather than stretching to fill the container width. Accessible labels are still required for screen readers.

<<< ./examples/Icons.example.vue preview=true

### Disabled

Individual segments can be disabled to prevent interaction.

<<< ./examples/Disabled.example.vue preview=true  layout="grow"

### Skeleton

Use the skeleton during data fetching or initial page load.

<<< ./examples/Skeleton.example.vue preview=true  layout="grow"
