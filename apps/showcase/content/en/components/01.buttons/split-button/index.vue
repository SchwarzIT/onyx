<script lang="ts" setup>
import { OnyxSplitButton, OnyxMenuItem } from "sit-onyx";
</script>

<template>
  <OnyxSplitButton label="Split button" position="right" alignment="center" open>
    <template #options>
      <OnyxMenuItem label="Action 1" />
      <OnyxMenuItem label="Action 2" />
      <OnyxMenuItem label="Action 3" />
    </template>
  </OnyxSplitButton>
</template>

<style lang="scss" scoped>
.onyx-split-button {
  zoom: 0.7;
}
</style>
