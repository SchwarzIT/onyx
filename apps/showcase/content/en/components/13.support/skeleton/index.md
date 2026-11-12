---
title: Skeleton
componentName: OnyxSkeleton
---

A placeholder layout that mimics the shape and structure of upcoming content, indicating an active loading state while reducing perceived wait time. Use the skeleton on initial page load while the [loading indicator](/components/support/loading-indicator) is used after an active user interaction. Most of our interactive components also support a built-in `skeleton` property so creating manual skeletons should only be needed for your custom components or layouts.

## Examples

### Basic

You must define a specific width and height manually, otherwise the skeleton will not be visible.

<<< ./examples/Basic.example.vue preview=true

### Text

Skeletons can also be used to mimic text paragraphs. In this example, an arbitrary number of lines can be defined to display the skeleton.

<<< ./examples/Text.example.vue preview=true
