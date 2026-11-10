<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { EditorToolbarFlyoutOption, OnyxEditorToolbarFlyout } from "@sit-onyx/tiptap";
import { computed } from "vue";

const options = computed<EditorToolbarFlyoutOption[]>(() => {
  return [
    {
      label: "Option 1",
      icon: iconPlaceholder,
      active: true,
      onClick: () => {
        // do something
      },
    },
    {
      label: "Option 2",
      icon: iconPlaceholder,
      active: false,
      onClick: () => {
        // do something
      },
    },
  ];
});
</script>

<template>
  <OnyxEditorToolbarFlyout label="Flyout label" :icon="iconPlaceholder" :options />
</template>
