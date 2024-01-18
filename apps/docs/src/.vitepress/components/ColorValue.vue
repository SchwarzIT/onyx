<script lang="ts" setup>
import { useData } from "vitepress";
import { computed } from "vue";
import xIcon from "../../assets/x.svg";
import type { ColorStep } from "./ColorPalette.vue";

export type ColorValueProps = {
  variableName: `--onyx-color-${string}`;
  step: ColorStep;
  selected?: boolean;
};

const props = defineProps<ColorValueProps>();

const { isDark } = useData();

const cssVariableName = computed(() => `${props.variableName}-${props.step}`);

const colorValue = computed(() => {
  isDark.value; // just call isDark here so that this computed is re-calculated when light/dark mode changes
  return getComputedStyle(document.documentElement).getPropertyValue(cssVariableName.value);
});

const textColor = computed(() => {
  const threshold = isDark.value ? 500 : 400;
  const textStep = props.step <= threshold ? 900 : 100;
  return `var(${props.variableName}-${textStep})`;
});
</script>

<template>
  <div
    class="color"
    tabindex="0"
    :style="{
      backgroundColor: `var(${cssVariableName})`,
      color: textColor,
    }"
    :class="{ 'color--selected': props.selected }"
  >
    <h4 class="color__step">{{ props.step }}</h4>
    <img class="color__icon" :src="xIcon" alt="x icon" />
  </div>
</template>

<style lang="scss" scoped>
$height: 16rem;
$iconSize: 0.75rem;

.color {
  padding: var(--onyx-spacing-sm);
  height: $height;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  transition: all 0.25s;
  margin-bottom: var(--onyx-spacing-lg);
  cursor: pointer;

  &__step {
    font-weight: 600;
  }

  &__icon {
    margin-top: var(--onyx-spacing-xs);
    display: none;
    height: $iconSize;
    width: $iconSize;
  }

  &:hover,
  &:focus-within,
  &--selected {
    height: calc(#{$height} + var(--onyx-spacing-lg));
    border-radius: 0 0 var(--onyx-radius-sm) var(--onyx-radius-sm);
    margin-bottom: 0;

    .color {
      &__step {
        margin-bottom: $iconSize;
      }

      &__icon {
        display: block;
      }
    }
  }
}
</style>
