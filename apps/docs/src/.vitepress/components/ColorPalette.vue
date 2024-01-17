<script lang="ts" setup>
import ColorValue, { type ColorValueProps } from "./ColorValue.vue";

const COLOR_STEPS = [100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
export type ColorStep = (typeof COLOR_STEPS)[number];

const props = defineProps<Pick<ColorValueProps, "base" | "textBase">>();
</script>

<template>
  <section class="palette">
    <ColorValue
      class="palette__color"
      v-for="step in COLOR_STEPS"
      :key="step"
      :step="step"
      :base="props.base"
      :text-base="props.textBase"
    />
  </section>
</template>

<style lang="scss" scoped>
.palette {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: var(--onyx-spacing-xs);

  &__color {
    &:nth-child(5) {
      // make default color (500) span the whole row
      grid-column: 1 / span 4;
      border-radius: var(--onyx-radius-sm);
    }

    &:first-child,
    &:nth-child(6) {
      border-radius: var(--onyx-radius-sm) 0 0 var(--onyx-radius-sm);
    }

    &:nth-child(4),
    &:last-child {
      border-radius: 0 var(--onyx-radius-sm) var(--onyx-radius-sm) 0;
    }
  }
}
</style>
