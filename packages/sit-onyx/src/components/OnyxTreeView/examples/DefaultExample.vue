<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxUnstableTreeView, OnyxUnstableTreeViewItem } from "../../../index.js";
</script>

<template>
  <OnyxUnstableTreeView label="Example tree view">
    <OnyxUnstableTreeViewItem label="Item 1" :icon="iconPlaceholder">
      <OnyxUnstableTreeViewItem label="Item 1.1" :icon="iconPlaceholder">
        <OnyxUnstableTreeViewItem label="Item 1.1.1" :icon="iconPlaceholder" />
        <OnyxUnstableTreeViewItem label="Item 1.1.2" :icon="iconPlaceholder" />
      </OnyxUnstableTreeViewItem>

      <OnyxUnstableTreeViewItem label="Item 1.2" :icon="iconPlaceholder" />
    </OnyxUnstableTreeViewItem>

    <OnyxUnstableTreeViewItem label="Item 2" :icon="iconPlaceholder">
      <OnyxUnstableTreeViewItem label="Item 2.1" :icon="iconPlaceholder" />
      <OnyxUnstableTreeViewItem label="Item 2.2" :icon="iconPlaceholder" />
    </OnyxUnstableTreeViewItem>

    <OnyxUnstableTreeViewItem label="Item 3" :icon="iconPlaceholder" disabled>
      <OnyxUnstableTreeViewItem label="Item 3.1" :icon="iconPlaceholder" />
    </OnyxUnstableTreeViewItem>
  </OnyxUnstableTreeView>
</template>
