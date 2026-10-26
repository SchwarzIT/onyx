---
title: Tag
componentName: OnyxTag
---

Tags provide contextual metadata for related parent elements, such as categories or classification labels. For application-level or system status indicators, use the [badge](/components/basic/badge) instead.

## Examples

### Basic

Tags require a text label and can include an optional icon.

<<< ./examples/Basic.example.vue preview=true

### Colors

Semantic color variants highlight data status or categories. See the [color documentation](/docs/foundation/colors#colors) for token details.

<<< ./examples/Colors.example.vue preview=true  layout="fullWidth"

### Clickable

Tags are non-interactive by default. Enable `clickable` to execute actions on click (e.g. tag dismissal). An action icon and tooltip description can be configured.

**Tip:** For interactive filter controls, use [OnyxFilterTag](/components/search-and-filter/filter-tag).

<<< ./examples/Clickable.example.vue preview=true

### Skeleton

Use the skeleton during data fetching.

<<< ./examples/Skeleton.example.vue preview=true
