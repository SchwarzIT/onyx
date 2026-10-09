---
title: Progress item
componentName: OnyxProgressItem
---

The progress item represents a single step inside of a multi-step progress. It is mainly used inside the [progress steps](/components/progress/progress-steps) component.

## Examples

### Status

The step can be in several status, depending on the interaction within the multi-step progress. The step number is displayed by default but optionally an icon can be displayed instead using the `icon` property.

<steps>

::step
#headline
Default

#default
The step is upcoming in the progress.

<<< ./examples/Default.example.vue preview=true

::

::step
#headline
Active

#default
The step is currently active so the user works with the data associated with this step.

<<< ./examples/Active.example.vue preview=true

::

::step
#headline
Completed

#default
The step is already completed by the user and a later step is currently active. The user is allowed to go back to this step.

<<< ./examples/Completed.example.vue preview=true

::

::step
#headline
Visited

#default
The step was already active in the past, is not completed yet but the user is currently working in another step.

<<< ./examples/Visited.example.vue preview=true

::

::step
#headline
Invalid

#default
The step is invalid, e.g. to errors regarding the associated data.

<<< ./examples/Invalid.example.vue preview=true

::

</steps>

<br />

### Custom content

Custom content can be used for the step label, e.g. to show an additional short description.

<<< ./examples/CustomContent.example.vue preview=true

### Skeleton

Use the skeleton on initial page load while the data for the step is currently loading.

<<< ./examples/Skeleton.example.vue preview=true
