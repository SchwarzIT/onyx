<script lang="ts" setup>
import type { OnyxColor } from "sit-onyx";

const props = defineProps<{
  /**
   * Which base color to use for the palette border.
   */
  border?: OnyxColor;
  /**
   * If `true`, the border color will also be applied after each individual color.
   * Requires `border` property to be set.
   */
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
  <div
    :class="['palette', { 'palette--grid': props.grid }]"
    :style="{ '--palette-border-color': borderColor }"
  >
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.palette {
  --palette-border-color: var(--onyx-color-component-border-neutral);
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  box-shadow: var(--onyx-shadow-soft-bottom);
  border-radius: var(--onyx-radius-md);
  overflow: hidden;
  border: var(--onyx-1px-in-rem) solid var(--palette-border-color);

  &--grid {
    > *:not(:last-child) {
      border-right: var(--onyx-1px-in-rem) solid var(--palette-border-color);
    }
  }
}
</style>
