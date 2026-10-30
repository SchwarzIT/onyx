---
title: Code tabs
componentName: OnyxCodeTabs
---

Displays one or multiple code snippets in tabbed views. This component does not perform syntax highlighting. To add syntax highlighting, use a tool like [Shiki](https://shiki.style/) or [Nuxt Content](https://content.nuxt.com/docs/files/markdown#code-highlighting) and pass the formatted HTML into the tab slot.

## Examples

### Basic

Display code tabs with a label and optional icon. Users can copy the active snippet using the top-right copy action.

<<< ./examples/Basic.example.vue preview=true layout=grow

### Skeleton

Use the skeleton placeholder while code snippets are loading.

<<< ./examples/Skeleton.example.vue preview=true layout=grow
