---
title: Text editor
componentName: OnyxTextEditor
package: @sit-onyx/tiptap
status: new
---

The text editor supports entering text with additional formatting such as inserting links, headlines and more and is therefore ideal for comments, descriptions and more. For simple text-only data, please use the [textarea](/components/form-elements/textarea) instead.

## Installation

Our text editor is based on the [Tiptap editor](https://tiptap.dev/docs/editor/getting-started/overview). Follow the steps below to get started:

<steps>

::step
#headline
Install dependencies

#default
Install the npm package into your project:

:npm-install-code-tabs{packages="@sit-onyx/tiptap"}
::

::step
#headline
Import styles

#default
Next, import the editor styles. We recommend to import them locally in the component where the editor is used for optimized loading performance. Alternatively, you can also import it globally in the root of your application.

```vue [ExampleComponent.vue]
<script lang="ts" setup>
import "@sit-onyx/tiptap/style.css";
import { OnyxTextEditor } from "@sit-onyx/tiptap";
</script>

<template>
<OnyxTextEditor label="Example label" />
</template>
```
::

</steps>
