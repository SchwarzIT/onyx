<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxTreeView, OnyxTreeViewItem } from "../../../index.js";
</script>

<template>
  <OnyxTreeView label="Example tree view">
    <OnyxTreeViewItem label="Item 1" :icon="iconPlaceholder">
      <OnyxTreeViewItem label="Item 1.1" :icon="iconPlaceholder">
        <OnyxTreeViewItem label="Item 1.1.1" :icon="iconPlaceholder" />
        <OnyxTreeViewItem label="Item 1.1.2" :icon="iconPlaceholder" />
      </OnyxTreeViewItem>

      <OnyxTreeViewItem label="Item 1.2" :icon="iconPlaceholder" />
    </OnyxTreeViewItem>

    <OnyxTreeViewItem label="Item 2" :icon="iconPlaceholder">
      <OnyxTreeViewItem label="Item 2.1" :icon="iconPlaceholder" />
      <OnyxTreeViewItem label="Item 2.2" :icon="iconPlaceholder" />
    </OnyxTreeViewItem>

    <OnyxTreeViewItem label="Item 3" :icon="iconPlaceholder" disabled>
      <OnyxTreeViewItem label="Item 3.1" :icon="iconPlaceholder" />
    </OnyxTreeViewItem>
  </OnyxTreeView>
</template>
