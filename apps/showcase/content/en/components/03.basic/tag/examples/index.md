---
title: Tag
componentName: OnyxTag
---

Tags provide additional information or hints related to their parent element. They are commonly used to visualize data-driven information such as categories or filters. For system-related information, we recommend to use the [badge](/components/basic/badge) instead.

## Examples

### Basic

Tags are displayed using a required label and an optional icon if needed.

:component-example{name="Basic"}

### Colors

Several colors are supported to highlight the semantic meaning of the related data. See our [color documentation](/introduction/foundation/colors#colors) for more information.

:component-example{name="Colors" layout="fullWidth"}

### Clickable

Tags are non-interactive by default. Use the `clickable` property to support triggering an action on click. An optional action icon can be defined if needed. The tooltip text must describe the on-click action, e.g. "Click to remove the tag".

**Tip:** For search and filter related tags, we recommend using our [filter tag](/components/search-and-filter/filter-tag).

:component-example{name="Clickable"}
