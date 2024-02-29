<script lang="ts" setup>
import { OnyxHeadline } from "sit-onyx";

defineProps<{ transparent?: boolean }>();
</script>

<template>
  <div class="backdrop temp-overlay" :class="{ 'backdrop--transparent': transparent }">
    <div class="demo temp-overlay__sidebar">
      <OnyxHeadline is="h2">Temp overlay</OnyxHeadline>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.temp-overlay {
  &__sidebar {
    width: 250px;
    height: 100%;
    overflow-y: auto;
  }
}
.backdrop--transparent {
  background-color: transparent;
}
</style>
