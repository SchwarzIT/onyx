<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { computed, useTemplateRef } from "vue";
import {
  OnyxEditorToolbarAction,
  OnyxEditorToolbarFlyout,
  OnyxEditorToolbarGroup,
  OnyxTextEditor,
  type EditorToolbarFlyoutOption,
} from "../../../index.js";

const textEditor = useTemplateRef("editor");

// you can optionally use the "useEditorUtils" to e.g. check if specific extensions are
// registered for the Tiptap editor to show/hide actions dynamically
// const { hasExtension } = useEditorUtils(computed(() => textEditor.value?.editor));

const listOptions = computed<EditorToolbarFlyoutOption[]>(() => {
  return [
    {
      label: "Option 1",
      icon: iconPlaceholder,
      active: textEditor.value?.editor?.isActive("extensionName"),
      onClick: () => {
        // do something
      },
    },
    {
      label: "Option 2",
      icon: iconPlaceholder,
      active: textEditor.value?.editor?.isActive("extensionName"),
      onClick: () => {
        // do something
      },
    },
  ];
});
</script>

<template>
  <OnyxTextEditor ref="editor" label="Example label">
    <template #actions>
      <!-- use the OnyxEditorToolbarGroup to separate multiple actions with a vertical line -->
      <OnyxEditorToolbarGroup>
        <OnyxEditorToolbarAction label="Action 1" :icon="iconPlaceholder" />
        <OnyxEditorToolbarAction label="Action 2" :icon="iconPlaceholder" />
      </OnyxEditorToolbarGroup>

      <OnyxEditorToolbarGroup>
        <OnyxEditorToolbarFlyout label="Action 3" :icon="iconPlaceholder" :options="listOptions" />
      </OnyxEditorToolbarGroup>
    </template>
  </OnyxTextEditor>
</template>
