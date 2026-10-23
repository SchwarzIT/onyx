<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import {
  OnyxIcon,
  OnyxSystemButton,
  OnyxTag,
  OnyxUnstableTreeView,
  OnyxUnstableTreeViewItem,
} from "sit-onyx";
</script>

<template>
  <OnyxUnstableTreeView label="Tree view">
    <OnyxUnstableTreeViewItem open>
      <template #item>
        <OnyxIcon :icon="iconPlaceholder" />
        Item

        <div class="custom">
          <OnyxTag label="Tag" />
          <OnyxSystemButton label="System button" :icon="iconPlaceholder" />
        </div>
      </template>

      <OnyxUnstableTreeViewItem label="Item" open>
        <OnyxUnstableTreeViewItem label="Item" open>
          <OnyxUnstableTreeViewItem label="Item" />
          <OnyxUnstableTreeViewItem label="Item" active />
          <OnyxUnstableTreeViewItem label="Item" />
        </OnyxUnstableTreeViewItem>
      </OnyxUnstableTreeViewItem>
    </OnyxUnstableTreeViewItem>
  </OnyxUnstableTreeView>
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
