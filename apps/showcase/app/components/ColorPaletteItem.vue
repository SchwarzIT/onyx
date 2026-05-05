<script lang="ts" setup>
import type { OnyxColor } from "sit-onyx";

const props = defineProps<{
  cssVariable: string;
  baseColor: OnyxColor;
  step?: number;
}>();

defineSlots<{
  /**
   * (Text) content.
   */
  default?(): unknown;
}>();
</script>

<template>
  <div
    class="color"
    :style="{
      backgroundColor: props.cssVariable,
      color: `var(--onyx-color-text-icons-${props.baseColor}-${props.step && props.step > 300 ? 'inverted' : 'bold'})`,
    }"
  >
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.color {
  flex-grow: 1;
  padding: var(--onyx-density-xs);
  padding-bottom: var(--onyx-density-2xl);

  &:nth-child(n + 4) {
    color: var(--onyx-color-text-icons-neutral-inverted);
  }
}
</style>
