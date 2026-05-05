<script lang="ts" setup>
import { capitalize } from "@sit-onyx/icons/utils";
import type { OnyxColor } from "sit-onyx";

const props = defineProps<{
  color: OnyxColor | "quantitatives";
}>();

const colors = computed(() => {
  const steps = props.color === "quantitatives" ? 12 : 9;

  return Array.from({ length: steps }, (_, index) => {
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
      borderColor:
        props.color !== 'quantitatives' ? `var(--onyx-color-base-${props.color}-300)` : undefined,
    }"
  >
    <ColorPaletteItem
      v-for="color in colors"
      :key="color.step"
      class="palette__color"
      :css-variable="color.backgroundColor"
      :text-color="color.step > 300 || props.color === 'quantitatives' ? 'white' : props.color"
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
