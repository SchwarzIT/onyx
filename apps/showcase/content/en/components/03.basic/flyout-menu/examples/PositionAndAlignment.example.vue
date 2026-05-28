<script lang="ts" setup>
import { OnyxFlyoutMenu, OnyxMenuItem } from "sit-onyx";

const handleClick = () => {
  // your logic here...
};
</script>

<template>
  <!-- "open" is only used for this example so the flyout is always opened -->
  <OnyxFlyoutMenu label="Actions" position="right" alignment="center">
    <template #options>
      <OnyxMenuItem label="Item 1" @click="handleClick" />
      <OnyxMenuItem label="Item 2" @click="handleClick" />
      <OnyxMenuItem label="Item 3" @click="handleClick" />
    </template>
  </OnyxFlyoutMenu>
</template>
