---
title: Radio group
componentName: OnyxRadioGroup
---

Radio buttons in UI design are interactive elements that allow users to make a single selection from a set of mutually exclusive options. Users can choose only one option at the time, making radio buttons ideal for scenarios where a single, distinct choice is required.

## Examples

### Basic

Each individual radio button supports different properties to e.g. make it required, disabled, loading etc.

<<< ./examples/Basic.example.vue preview=true 

### Horizontal

The radio group can optionally be used in horizontal orientation.

<<< ./examples/Horizontal.example.vue preview=true  layout="fullWidth"

### Disabled

The whole group or only individual options can be disabled to indicate that they can currently not be checked.

<<< ./examples/Disabled.example.vue preview=true 

### Skeleton

The skeleton can be used on initial load to indicate that the data for the radio group is currently loading.
The number of skeleton options is customizable.

<<< ./examples/Skeleton.example.vue preview=true 

### Truncation

By default, the radio buttons are truncated with ellipsis (...) if the label is too long to fit into the available width. Alternatively, multiline truncation can be used to wrap the label into multi lines instead. The truncation can be configured for the whole group or individual radio buttons.

<<< ./examples/Truncation.example.vue preview=true 

### Label tooltip

An additional info tooltip can be displayed next to the label to e.g. show additional information or details about the radio buttons.

<<< ./examples/LabelTooltip.example.vue preview=true 
