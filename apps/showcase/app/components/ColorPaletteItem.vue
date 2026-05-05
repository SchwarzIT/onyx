<script lang="ts" setup>
import type { OnyxColor } from "sit-onyx";
import type { StyleValue } from "vue";

const props = defineProps<{
  cssVariable: string;
  textColor: OnyxColor | "white";
}>();

defineSlots<{
  /**
   * (Text) content.
   */
  default?(): unknown;
}>();

const style = computed<StyleValue>(() => {
  return {
    backgroundColor: props.cssVariable,
    color:
      props.textColor === "white"
        ? "#fff"
        : props.textColor === "neutral"
          ? "var(--onyx-color-text-icons-neutral-intense)"
          : `var(--onyx-color-text-icons-${props.textColor}-bold)`,
  };
});
</script>

<template>
  <div class="color" :style>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.color {
  flex-grow: 1;
  padding: var(--onyx-density-xs);
  padding-bottom: var(--onyx-density-2xl);
}
</style>
