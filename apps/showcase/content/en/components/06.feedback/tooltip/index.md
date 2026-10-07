---
title: Tooltip
componentName: OnyxTooltip
---

Tooltips offer additional, contextual information for a parent element, appearing subtly to aid understanding without diverting the user’s focus. The component supports text and icons only.

## Examples

### Basic

A tooltip can be placed on any element and shows on hover by default. Alternatively, it can be shown on click. For accessibility, the parent element must be an interactive element such as a button when using the `click` trigger.

<<< ./examples/Basic.example.vue preview=true

### Colors

Multiple tooltip colors are supported depending on the semantical meaning of the information. Refer to our [color documentation](/docs/foundation/colors) about further information.

<<< ./examples/Colors.example.vue preview=true

### Position and alignment

The position (placement of the tooltip around the trigger) and alignment (relative to the trigger, based on the position) are calculated automatically depending on the placement on the screen. This ensures optimized visibility across multiple layouts and screen sizes. The position and alignment can be changed if needed but be aware that the tooltip might not be ideally placed or not fully visible on all devices and layouts then.

<<< ./examples/PositionAlignment.example.vue preview=true

### Fit parent

Use the `fitParent` property to set the tooltip width to the same width as the parent element.

<<< ./examples/FitParent.example.vue preview=true

### Custom content

Custom content can be placed inside the tooltip using the `tooltip` slot. For accessibility, do not place interactive elements here. Use the [dialog](/components/feedback/dialog) component instead.

<<< ./examples/CustomContent.example.vue preview=true
