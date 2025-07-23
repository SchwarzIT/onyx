<script lang="ts" setup>
import { OnyxFileTypeIcon, SUPPORTED_FILE_TYPE_ICON_MEDIA_TYPES } from "../../../index.js";
</script>

<template>
  <div class="layout">
    <div v-for="type in SUPPORTED_FILE_TYPE_ICON_MEDIA_TYPES" :key="type">
      <OnyxFileTypeIcon :type />
      ({{ type }})
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-density-sm);
  font-family: var(--onyx-font-family);
  color: var(--onyx-color-text-icons-neutral-intense);
}
</style>
