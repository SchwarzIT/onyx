<script lang="ts" setup>
import { OnyxRadioGroup, RadioButtonOption } from "sit-onyx";
import { ref } from "vue";

const selectedOption = ref<number>();

const options = [
  { label: "Default", value: 1 },
  { label: "Initially checked", value: 2 },
  { label: "Required", value: 3, required: true },
  { label: "Disabled", value: 4, disabled: true },
  { label: "Loading", value: 5, loading: true },
] satisfies RadioButtonOption[];
</script>

<template>
  <OnyxRadioGroup v-model="selectedOption" label="Example label" :options />
</template>
