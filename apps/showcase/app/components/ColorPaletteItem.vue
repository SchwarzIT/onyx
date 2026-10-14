<script lang="ts" setup>
import { iconCode, iconColors, iconFileSketch } from "@sit-onyx/icons";
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
  <OnyxFlyoutMenu class="flyout" label="Color details" trigger="click">
    <template #button="{ trigger }">
      <button
        v-bind="trigger"
        class="color"
        :style="{ backgroundColor: props.cssVariable, color }"
        type="button"
      >
        <slot></slot>
      </button>
    </template>

    <template #options>
      <OnyxMenuItem label="Copy CSS variable" :icon="iconCode" />
      <OnyxMenuItem label="Copy Figma variable" :icon="iconFileSketch" />
      <OnyxMenuItem label="Copy HEX code" :icon="iconColors" />
    </template>

    <template #footer>
      <div class="flyout__footer onyx-text--small">{{ props.cssVariable }}</div>
    </template>
  </OnyxFlyoutMenu>
</template>

<style lang="scss" scoped>
.flyout {
  flex-grow: 1;

  &__footer {
    color: var(--onyx-color-text-icons-neutral-medium);
    padding: var(--onyx-density-xs) var(--onyx-density-sm);
    border-top: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
  }
}

.color {
  flex-grow: 1;
  padding: var(--onyx-density-xs);
  padding-bottom: var(--onyx-density-2xl);
  cursor: pointer;
  border: none;
  font: inherit;
  text-align: left;
}
</style>
