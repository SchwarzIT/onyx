<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxEditorToolbarAction, OnyxEditorToolbarGroup } from "../../../index.js";
</script>

<template>
  <div class="actions">
    <OnyxEditorToolbarGroup>
      <OnyxEditorToolbarAction label="Action 1" :icon="iconPlaceholder" />
      <OnyxEditorToolbarAction label="Action 2" :icon="iconPlaceholder" />
    </OnyxEditorToolbarGroup>

    <OnyxEditorToolbarGroup>
      <OnyxEditorToolbarAction label="Action 3" :icon="iconPlaceholder" />
      <OnyxEditorToolbarAction label="Action 4" :icon="iconPlaceholder" />
    </OnyxEditorToolbarGroup>
  </div>
</template>

<style lang="scss" scoped>
.actions {
  display: flex;
  align-items: center;
  gap: var(--onyx-density-xs);
}
</style>
