---
title: Floating action button
componentName: OnyxFAB
---

A floating action button (FAB) is a fixed/sticky action button that appears at the bottom corner of a screen.

## Examples

### Basic

The FAB supports text and icons. It is positioned in the bottom right corner of the screen by default. For demonstration purposes, the examples on this page are displayed in place.

:component-example{name="Basic" style="height: 5rem"}

### Icon only

While the label is technically required for accessibility reasons, it can visually be hidden to achieve a icon-only FAB.

:component-example{name="Icon" style="height: 5rem"}

### Left aligned

While the FAB is right aligned by default, it can optionally be left aligned.

:component-example{name="Right" style="height: 5rem"}

### Multiple actions

Multiple actions can be added. The main button will then automatically switch to a flyout trigger so clicking it will toggle the actions.

:component-example{name="Options" style="height: 5rem"}

### Custom offset

Depending on the use case, it might be necessary to position the FAB with an horizontal/vertical offset to e.g. align with custom sidebars or components.
Use the `--onyx-fab-offset-x` and `--onyx-fab-offset-y` CSS variables for this, they will automatically be applied correctly depending on whether the FAB is left or right aligned.

:component-example{name="Offset" style="height: 6rem"}

### Global FAB

In your application, you might need to show multiple FABs from within different pages / components. We support a universal `useGlobalFAB()` composable for this so you can easily add/remove FABs from anywhere in your application and have them displayed automatically.

The FABs for this example are shown at the bottom right of your screen.

:component-example{name="GlobalFAB" style="height: 6rem"}

<prose-details>
<prose-summary>Show prerequisites / manual setup</prose-summary>

::info-card{headline="App layout"}
If you are using the [app layout](/components/layouts/app-layout) component you can skip these manual steps since everything will already be set up automatically.
::

Otherwise, add the `OnyxGlobalFAB` component once to the root of your application. It will take care of displaying the global FABs correctly.

```vue [Register global FAB]
<script lang="ts" setup>
import { OnyxGlobalFAB } from "sit-onyx";
</script>

<template>
  <OnyxGlobalFAB />
</template>
```

</prose-details>
