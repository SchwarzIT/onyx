<script lang="ts" setup>
import { capitalize } from "@sit-onyx/icons/utils";
import type { OnyxColor } from "sit-onyx";

const props = defineProps<{
  color: OnyxColor;
}>();

const colors = computed(() => {
  return Array.from({ length: 9 }, (_, index) => {
    const step = 100 * (index + 1);
    return {
      backgroundColor: `var(--onyx-color-base-${props.color}-${step})`,
      name: capitalize(props.color),
      step,
    };
  });
});
</script>

<template>
  <div
    :class="['palette']"
    :style="{
      borderColor: `var(--onyx-color-base-${props.color}-300)`,
      '--color': `var(--onyx-color-text-icons-${props.color}-bold)`,
    }"
  >
    <ColorPaletteItem
      v-for="color in colors"
      :key="color.step"
      class="palette__color"
      :css-variable="color.backgroundColor"
      :base-color="props.color"
      :step="color.step"
    >
      <div>{{ color.step }}</div>
    </ColorPaletteItem>
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
}
</style>
