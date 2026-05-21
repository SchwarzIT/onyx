<script lang="ts" setup>
import { OnyxSlider, SliderMark } from "sit-onyx";
import { ref } from "vue";

const value = ref(50);

const marks: SliderMark[] = [
  { label: "0°C", value: 0 },
  { label: "25°C", value: 25 },
  { label: "50°C", value: 50 },
  { label: "75°C", value: 75 },
  { label: "100°C", value: 100 },
];
</script>

<template>
  <OnyxSlider v-model="value" label="Discrete marks" :step="25" marks />
  <OnyxSlider
    v-model="value"
    label="Labelled marks"
    :tooltip="{ formatter: (value) => `${value}%` }"
    :marks
  />
</template>
