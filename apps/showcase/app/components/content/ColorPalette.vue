<script lang="ts" setup>
import type { OnyxColor } from "sit-onyx";

const props = defineProps<{
  border?: OnyxColor;
  grid?: boolean;
}>();

defineSlots<{
  /**
   * Color palette items.
   */
  default(): unknown;
}>();

const borderColor = computed(() =>
  props.border ? `var(--onyx-color-base-${props.border}-300)` : undefined,
);
</script>

<template>
  <div :class="['palette', { 'palette--grid': props.grid }]" :style="{ borderColor }">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.palette {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  box-shadow: var(--onyx-shadow-soft-bottom);
  border-radius: var(--onyx-radius-md);
  overflow: hidden;
  border: var(--onyx-1px-in-rem) solid transparent;

  &--grid {
    > *:not(:last-child) {
      border-right: var(--onyx-1px-in-rem) solid v-bind("borderColor");
    }
  }
}
</style>
