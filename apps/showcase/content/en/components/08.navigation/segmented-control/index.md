---
title: Segmented control
componentName: OnyxSegmentedControl
---

The segmented control is an interactive element that allow users to make a single selection from a set of mutually exclusive options. Users can choose only one option at the time. It is commonly used for building filters, queries or toggles (e.g. to switch a layout between a card and table view).

## Examples

### Basic

The segmented control consists out of at least two options that display a label and an option icon. We recommend to either show an icon for all options or to use only labels but not to mix those two options.

<<< ./examples/Basic.example.vue preview=true  layout="grow"

### Icons only

The option label can optionally be hidden so only an icon is shown. In this mode, the component only takes up the width that the options need and does not stretch to the available width.

<<< ./examples/Icons.example.vue preview=true 

### Disabled

Individual options can be disabled to prevent user selection.

<<< ./examples/Disabled.example.vue preview=true  layout="grow"

### Skeleton

Use the skeleton on initial page load while the data for the segmented control options are being loaded.

<<< ./examples/Skeleton.example.vue preview=true  layout="grow"
