---
title: Code tabs
componentName: OnyxCodeTabs
---

Component for displaying one or multiple code snippets. This component does NOT take care of proper syntax highlighting. If you want to use syntax highlighting, consider using a library like [Shiki](https://shiki.style/) or [Nuxt Content](https://content.nuxt.com/docs/files/markdown#code-highlighting) and add the highlighted HTML using the slot of the passed OnyxCodeTab component.

## Examples

### Basic

One or multiple code tabs can be displayed with a required label and optional icon. The raw code snippet for the current tab can be copied by clicking the copy button in the top right.

<<< ./examples/Basic.example.vue preview=true layout=grow

### Skeleton

Use the skeleton on initial page load while the data for the code tabs is loading.

<<< ./examples/Skeleton.example.vue preview=true layout=grow
