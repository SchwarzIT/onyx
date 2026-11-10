<script lang="ts" setup>
import { iconExpandWindow, iconPlaceholder } from "@sit-onyx/icons";
import { OnyxFlyoutMenu, OnyxMenuItem, OnyxTag } from "sit-onyx";
import { ref } from "vue";

const open = ref(true);
</script>

<template>
  <OnyxFlyoutMenu v-model:open="open" label="Actions">
    <template #options>
      <OnyxMenuItem label="Label only" />
      <OnyxMenuItem label="Label and icon" :icon="iconPlaceholder" />
      <OnyxMenuItem
        label="With link"
        :icon="iconExpandWindow"
        link="/components/basic/flyout-menu"
      />
      <OnyxMenuItem label="Active" :icon="iconPlaceholder" active />
      <OnyxMenuItem label="Disabled" :icon="iconPlaceholder" disabled />
      <OnyxMenuItem label="Danger" :icon="iconPlaceholder" color="danger" />

      <OnyxMenuItem>
        Custom content
        <OnyxTag label="Tag" />
      </OnyxMenuItem>
    </template>
  </OnyxFlyoutMenu>
</template>
