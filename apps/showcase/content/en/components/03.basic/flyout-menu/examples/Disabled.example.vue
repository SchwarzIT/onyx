<script lang="ts" setup>
import { OnyxFlyoutMenu, OnyxMenuItem } from "sit-onyx";
</script>

<template>
  <OnyxFlyoutMenu label="Actions" disabled>
    <template #options>
      <OnyxMenuItem label="Item 1" />
      <OnyxMenuItem label="Item 2" />
      <OnyxMenuItem label="Item 3" />
    </template>
  </OnyxFlyoutMenu>
</template>
