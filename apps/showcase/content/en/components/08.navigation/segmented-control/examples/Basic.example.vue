<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxSegmentedControl, OnyxSegmentedControlOption } from "sit-onyx";
import { ref } from "vue";

const options: OnyxSegmentedControlOption[] = [
  { label: "Option 1", value: "option-1", icon: iconPlaceholder },
  { label: "Option 2", value: "option-2", icon: iconPlaceholder },
  { label: "Option 3", value: "option-3", icon: iconPlaceholder },
];

const selectedOption = ref(options[0].value);
</script>

<template>
  <OnyxSegmentedControl v-model="selectedOption" :options />
</template>
