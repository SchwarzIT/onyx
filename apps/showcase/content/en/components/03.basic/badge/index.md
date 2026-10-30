---
title: Badge
componentName: OnyxBadge
---

Badges render compact, prominent status indicators associated with a parent object, such as version tags or system states. For data categorization, use the [tag](/components/basic/tag) instead.

## Examples

### Basic

Badges display text, count numbers, or icons. The optional `dot` mode renders an indicator badge suitable for notifications.

<<< ./examples/Basic.example.vue preview=true

### Colors

Semantic color variants communicate status intent. See the [color documentation](/docs/foundation/colors#colors) for details.

<<< ./examples/Colors.example.vue preview=true  layout="fullWidth"

### Clickable

Badges are static by default. Set `clickable` to attach click handlers (e.g. badge dismissal). An action icon and tooltip description can be configured.

**Tip:** For interactive filter chips, use [OnyxFilterBadge](/components/search-and-filter/filter-badge).

<<< ./examples/Clickable.example.vue preview=true
