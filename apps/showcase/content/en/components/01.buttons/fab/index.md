---
title: Floating action button
componentName: OnyxFAB
---

A floating action button (FAB) is a fixed button anchored to a lower viewport corner for primary, persistent actions.

## Examples

### Basic

The FAB supports icons and text labels, positioning itself in the bottom-right corner by default. Examples below are shown inline for demonstration.

<<< ./examples/Basic.example.vue preview=true  style="height: 5rem"

### Icon only

The label can be visually hidden to render an icon-only FAB. The label remains accessible to screen readers.

<<< ./examples/Icon.example.vue preview=true  style="height: 5rem"

### Left aligned

By default, the FAB anchors to the right, but it can optionally anchor to the bottom-left corner.

<<< ./examples/Right.example.vue preview=true  style="height: 5rem"

### Multiple actions

When multiple actions are provided, the FAB becomes a trigger that opens a speed-dial speed menu of child actions.

<<< ./examples/Options.example.vue preview=true  style="height: 5rem"

### Custom offset

To avoid overlapping sidebars or bottom navigation bars, customize the offset using CSS variables `--onyx-fab-offset-x` and `--onyx-fab-offset-y`.

<<< ./examples/Offset.example.vue preview=true  style="height: 6rem"

### Global FAB

The `useGlobalFAB()` composable allows pages or components to register FABs dynamically without prop drilling.

The FABs in this example appear in the bottom-right corner of the browser window:

<<< ./examples/GlobalFAB.example.vue preview=true  style="height: 6rem"

<prose-details>
<prose-summary>Prerequisites / manual setup</prose-summary>

::info-card{headline="App layout"}
Applications using [OnyxAppLayout](/components/layouts/app-layout) have global FAB support preconfigured automatically.
::

If not using `OnyxAppLayout`, mount the `<OnyxGlobalFAB />` component at the root of your application:

```vue [Register global FAB]
<script lang="ts" setup>
import { OnyxGlobalFAB } from "sit-onyx";
</script>

<template>
  <OnyxGlobalFAB />
</template>
```

</prose-details>
