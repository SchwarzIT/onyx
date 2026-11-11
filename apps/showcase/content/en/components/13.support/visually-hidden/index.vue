<script lang="ts" setup>
import { iconVolumeUp } from "@sit-onyx/icons";
import { OnyxIcon } from "sit-onyx";
</script>

<template>
  <div class="container onyx-text--small">
    <OnyxIcon :icon="iconVolumeUp" />
    <i>Hidden text announced by a screen reader</i>
  </div>
</template>

<style lang="scss" scoped>
.container {
  border: 0.125rem dotted var(--onyx-color-text-icons-info-intense);
  padding: var(--onyx-density-xs);
  border-radius: var(--onyx-radius-sm);
  color: var(--onyx-color-text-icons-info-intense);
  display: flex;
  align-items: center;
  gap: var(--onyx-density-2xs);
}
</style>
