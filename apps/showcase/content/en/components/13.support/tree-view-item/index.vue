<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxUnstableTreeViewItem, OnyxTag } from "sit-onyx";
</script>

<template>
  <OnyxUnstableTreeViewItem :icon="iconPlaceholder" label="Item">
    Content

    <template #item>
      Item
      <OnyxTag label="Tag" />
    </template>
  </OnyxUnstableTreeViewItem>
</template>

<style lang="scss" scoped>
:deep(.onyx-tree-view-item__content) {
  justify-content: space-between;
}
</style>
