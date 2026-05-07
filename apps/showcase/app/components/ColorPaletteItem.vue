<script lang="ts" setup>
import type { OnyxColor } from "sit-onyx";

const props = withDefaults(
  defineProps<{
    /**
     * The CSS variable to use for this color.
     */
    cssVariable: string;
    /**
     * The text color to use.
     */
    textColor?: OnyxColor | "white" | "inverted";
  }>(),
  {
    textColor: "white",
  },
);

defineSlots<{
  /**
   * (Text) content.
   */
  default?(): unknown;
}>();

const color = computed(() => {
  if (props.textColor === "white") return "#fff";
  if (props.textColor === "neutral") return "var(--onyx-color-text-icons-neutral-intense)";
  if (props.textColor === "inverted") return "var(--onyx-color-text-icons-neutral-inverted)";
  return `var(--onyx-color-text-icons-${props.textColor}-bold)`;
});
</script>

<template>
  <div class="color" :style="{ backgroundColor: props.cssVariable, color }">
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
