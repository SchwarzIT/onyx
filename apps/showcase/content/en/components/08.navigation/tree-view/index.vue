<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxIcon, OnyxSystemButton, OnyxTag, OnyxTreeView, OnyxTreeViewItem } from "sit-onyx";
</script>

<template>
  <OnyxTreeView label="Tree view">
    <OnyxTreeViewItem open>
      <template #item>
        <OnyxIcon :icon="iconPlaceholder" />
        Item

        <div class="custom">
          <OnyxTag label="Tag" />
          <OnyxSystemButton label="System button" :icon="iconPlaceholder" />
        </div>
      </template>

      <OnyxTreeViewItem label="Item" open>
        <OnyxTreeViewItem label="Item" open>
          <OnyxTreeViewItem label="Item" />
          <OnyxTreeViewItem label="Item" active />
          <OnyxTreeViewItem label="Item" />
        </OnyxTreeViewItem>
      </OnyxTreeViewItem>
    </OnyxTreeViewItem>
  </OnyxTreeView>
</template>

<style scoped>
.onyx-tree-view {
  zoom: 0.5;
  width: 16rem;
}

.custom {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: var(--onyx-density-2xs);
}
</style>
