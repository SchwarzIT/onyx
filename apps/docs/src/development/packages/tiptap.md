---
outline: [2, 3]
---

<script lang="ts" setup>
import packageJson from "../../../../../packages/tiptap/package.json";
import { OnyxTextEditor } from "@sit-onyx/tiptap";
import "@sit-onyx/tiptap/style.css";
</script>

# @sit-onyx/tiptap

<div class="hide-external-link">

[![npm version](https://badge.fury.io/js/@sit-onyx%2Ftiptap.svg)](https://www.npmjs.com/package/@sit-onyx/tiptap)

</div>

{{ packageJson.description }}.

::: raw
<OnyxTextEditor label="Example editor" />
:::

## Changelog

A full changelog can be found [here](/development/packages/changelogs/tiptap).

## Installation

### Step 1: Install dependencies

Install the npm package with your corresponding package manager:

::: code-group

```sh [pnpm]
pnpm add @sit-onyx/tiptap
```

```sh [npm]
npm install @sit-onyx/tiptap
```

```sh [yarn]
yarn install @sit-onyx/tiptap
```

:::

### Step 2: Imports

After that, import the CSS file, either globally or in a single component:

::: code-group

```ts [main.ts]
import "@sit-onyx/tiptap/style.css";
```

:::

### Step 3: Use the editor

The editor is now ready to be used, e.g.:

```vue
<script lang="ts" setup>
import { OnyxTextEditor } from "@sit-onyx/tiptap";
</script>

<template>
  <OnyxTextEditor label="Example label" />
</template>
```

## Customizations

The `OnyxTextEditor` is based on the [Tiptap editor](https://tiptap.dev/docs/editor/getting-started/overview) so please refer to their documentation for further information.

The editor will automatically adapt depending on your configuration. E.g. if you disable specific extensions or options (e.g. heading levels), the displayed editor toolbar will adapt accordingly. Please refer to the instructions below for further customizations.

### Extensions

By default, the `OnyxTextEditor` uses the `OnyxStarterKit` as extensions which is based on the [Tiptap starter kit](https://tiptap.dev/docs/editor/extensions/functionality/starterkit) but includes additional commonly used extensions and is configured with onyx-specific options.

To override / customize the extensions used by the editor, use the `extensions` property which will fully replace the default config.
You can either re-use and configure the default `OnyxStarterKit` here or use your own starter kits / extensions.

```vue
<script lang="ts" setup>
import { OnyxTextEditor, OnyxStarterKit } from "@sit-onyx/tiptap";

const extensions = [
  OnyxStarterKit.configure({
    blockquote: false, // e.g. disable specific extensions
    heading: {
      levels: [1, 2], // or customize existing ones
    },
  });
];
</script>

<template>
  <OnyxTextEditor label="Example label" :extensions />
</template>
```

#### Add custom actions to the toolbar

When adding new extensions to the editor that are not supported by default, use the `actions` slot to add custom buttons to the toolbar.

```vue
<script lang="ts" setup>
import { iconBulletList, iconList, iconNumberedList, iconToolBold } from "@sit-onyx/icons";
import { computed, useTemplateRef } from "vue";
import {
  OnyxEditorToolbarAction,
  OnyxEditorToolbarFlyout,
  OnyxEditorToolbarGroup,
  OnyxTextEditor,
  type EditorToolbarFlyoutOption,
} from "@sit-onyx/tiptap";

const textEditor = useTemplateRef("editor");

const listOptions = computed<EditorToolbarFlyoutOption[]>(() => {
  return [
    {
      label: "Bullet list",
      icon: iconBulletList,
      active: textEditor.value?.editor?.isActive("bulletList"),
      onClick: () => textEditor.value?.editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Numbered list",
      icon: iconNumberedList,
      active: textEditor.value?.editor?.isActive("orderedList"),
      onClick: () => textEditor.value?.editor?.chain().focus().toggleOrderedList().run(),
    },
  ];
});
</script>

<template>
  <OnyxTextEditor ref="editor" label="Example label">
    <template #actions>
      <!-- single action -->
      <OnyxEditorToolbarAction
        label="Bold"
        :icon="iconToolBold"
        :active="textEditor?.editor?.isActive('bold')"
        :disabled="!textEditor?.editor?.can().chain().toggleBold().run()"
        @click="textEditor?.editor?.chain().focus().toggleBold().run()"
      />

      <!-- multiple grouped actions inside a flyout -->
      <OnyxEditorToolbarFlyout label="Lists" :icon="iconList" :options="listOptions" />

      <OnyxEditorToolbarGroup>
        <!--
          you can also use groups that are separated with a vertical line
          just place any actions here that should be grouped together
        -->
      </OnyxEditorToolbarGroup>
    </template>
  </OnyxTextEditor>
</template>
```

### Access editor instance

The underlying Tiptap editor instance is exposed for full control.

```vue
<script lang="ts" setup>
import { OnyxTextEditor } from "@sit-onyx/tiptap";
import { useTemplateRef, onMounted } from "vue";

const textEditor = useTemplateRef("editor");

onMounted(() => {
  // access the editor instance as needed...
  textEditor.value?.editor?.isActive("bold");
});
</script>

<template>
  <OnyxTextEditor ref="editor" label="Example label" />
</template>
```
