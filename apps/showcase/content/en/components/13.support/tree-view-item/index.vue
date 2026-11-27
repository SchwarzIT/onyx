<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxTreeViewItem, OnyxTag } from "sit-onyx";
</script>

<template>
  <OnyxTreeViewItem :icon="iconPlaceholder" label="Item">
    Content

    <template #item>
      Item
      <OnyxTag label="Tag" />
    </template>
  </OnyxTreeViewItem>
</template>

<style scoped>
:deep(.onyx-tree-view-item__content) {
  justify-content: space-between;
}
</style>
