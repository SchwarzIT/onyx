<script lang="ts" setup>
import { OnyxSegmentedControl, type OnyxSegmentedControlOption } from "sit-onyx";
import { ref } from "vue";

const options: OnyxSegmentedControlOption[] = [
  { label: "Option 1", value: "option-1" },
  { label: "Option 2", value: "option-2" },
  { label: "Option 3", value: "option-3" },
];

const selectedOption = ref("option-1");
</script>

<template>
  <OnyxSegmentedControl v-model="selectedOption" :options skeleton />
</template>
