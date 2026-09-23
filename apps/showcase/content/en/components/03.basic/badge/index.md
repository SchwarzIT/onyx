---
title: Badge
componentName: OnyxBadge
---

Badges provide concise, prominent additional information associated with a parent object. They are commonly used for system / application related information such as status, versions etc. To visualize data-driven information, we recommend to use the [tag](/components/basic/tag) instead.

## Examples

### Basic

The badge can be display with any text, number or icon. The optional `dot` mode can be used to e.g. attach the badge to other components to highlight that there are new notifications etc.

<<< ./examples/Basic.example.vue preview=true 

### Colors

Several colors are supported to highlight the semantic meaning of the related data. See our [color documentation](/introduction/foundation/colors#colors) for more information.

<<< ./examples/Colors.example.vue preview=true  layout="fullWidth"

### Clickable

Badges are non-interactive by default. Use the `clickable` property to support triggering an action on click. An optional action icon can be defined if needed. The tooltip text must describe the on-click action, e.g. "Click to remove the badge".

**Tip:** For search and filter related badges, we recommend using our [filter badge](/components/search-and-filter/filter-badge).

<<< ./examples/Clickable.example.vue preview=true 
