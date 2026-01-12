<script lang="ts" setup>
import { computed } from "vue";
import OnyxSlider from "./OnyxSlider.vue";
import type { SliderTooltipOptions } from "./types.js";

const props = defineProps<{
  tooltip?: "hidden" | "custom";
}>();

const tooltipOptions = computed<SliderTooltipOptions>(() => {
  return {
    hidden: props.tooltip === "hidden",
    formatter: props.tooltip === "custom" ? (value) => `Custom value ${value}` : undefined,
  };
});
</script>

<template>
  <OnyxSlider label="Custom tooltip slider" :model-value="50" :tooltip="tooltipOptions" />
</template>
