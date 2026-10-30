<script lang="ts" setup>
import { OnyxSlider, SliderMark } from "sit-onyx";
import { ref } from "vue";

const value = ref(50);

const marks: SliderMark[] = [
  { label: "0", value: 0 },
  { label: "25", value: 25 },
  { label: "50", value: 50 },
  { label: "75", value: 75 },
  { label: "100", value: 100 },
];
</script>

<template>
  <OnyxSlider v-model="value" class="slider" label="Slider" :marks />
</template>

<style lang="scss" scoped>
.slider {
  width: 100%;
  padding-inline: var(--onyx-density-xs); // fit marks
}
</style>
