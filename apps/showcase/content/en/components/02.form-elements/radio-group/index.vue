<script lang="ts" setup>
import { OnyxRadioGroup, RadioButtonOption } from "sit-onyx";

const options = [
  { label: "Radio button", value: 1 },
  { label: "Radio button", value: 2 },
  { label: "Radio button", value: 3 },
] satisfies RadioButtonOption[];
</script>

<template>
  <OnyxRadioGroup label="Radio group" :options hide-label />
</template>

<style lang="scss" scoped>
.onyx-radio-group {
  zoom: 0.8;
}
</style>
