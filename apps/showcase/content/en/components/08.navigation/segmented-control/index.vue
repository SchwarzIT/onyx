<script lang="ts" setup>
import { OnyxSegmentedControl, OnyxSegmentedControlOption } from "sit-onyx";
import { ref } from "vue";

const options: OnyxSegmentedControlOption[] = [
  { label: "Control", value: "option-1" },
  { label: "Control", value: "option-2" },
];

const selectedOption = ref(options[0].value);
</script>

<template>
  <OnyxSegmentedControl v-model="selectedOption" :options />
</template>

<style lang="scss" scoped>
.onyx-segmented-control {
  width: 100%;
}
</style>
