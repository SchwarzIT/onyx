<script lang="ts" setup>
import placeholder from "@sit-onyx/icons/placeholder.svg?raw";
import { ONYX_COLORS, OnyxTag } from "sit-onyx";
</script>

<template>
  <div class="wrapper">
    <OnyxTag
      v-for="color in ONYX_COLORS"
      :key="color"
      label="Tag"
      :color="color"
      :icon="placeholder"
    />
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  gap: var(--onyx-spacing-xs);
}
</style>
