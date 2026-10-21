<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxFlyoutMenu, OnyxMenuItem } from "sit-onyx";
</script>

<template>
  <OnyxFlyoutMenu label="Flyout menu" position="right" alignment="center" open>
    <template #options>
      <OnyxMenuItem label="Menu item" :icon="iconPlaceholder" />
    </template>
  </OnyxFlyoutMenu>
</template>
