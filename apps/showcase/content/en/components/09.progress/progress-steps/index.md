---
title: Progress steps
componentName: OnyxProgressSteps
---

The progress steps are used to indicate a linear multi-step workflow that the user has to go through step by step. Upcoming steps can not be skipped, going back to already visited steps is always possible. Continuing to the next step is up the projects's logic so custom components or logic needs to be implemented for this.

## Examples

### Horizontal

The default progress steps are display horizontally. If not all steps fit into the available width, they will become scrollable. Each step can optionally also display an icon instead of the numeric step value.

<<< ./examples/Horizontal.example.vue preview=true layout=fullWidth

### Vertical

The steps can also be displayed vertically, e.g. if used inside a sidebar.

<<< ./examples/Vertical.example.vue preview=true

### Custom content

Custom content can be used for the steps, e.g. to show an additional short description.

<<< ./examples/CustomContent.example.vue preview=true layout=fullWidth

### Skeleton

Use the skeleton on initial page load while the data for the steps are currently loading.

<<< ./examples/Skeleton.example.vue preview=true layout=fullWidth
