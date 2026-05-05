<script lang="ts" setup>
import type { OnyxColor } from "sit-onyx";
import type { StyleValue } from "vue";

const props = withDefaults(
  defineProps<{
    cssVariable: string;
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

const style = computed<StyleValue>(() => {
  return {
    backgroundColor: props.cssVariable,
    color: color.value,
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
