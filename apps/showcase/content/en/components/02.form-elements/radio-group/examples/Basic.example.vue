<script lang="ts" setup>
import { OnyxRadioGroup, RadioButtonOption } from "sit-onyx";
import { ref } from "vue";

const selectedOption = ref<number>(2);

const options = [
  { label: "Default", value: 1 },
  { label: "Initially checked", value: 2 },
  { label: "Disabled", value: 3, disabled: true },
  { label: "Loading", value: 4, loading: true },
] satisfies RadioButtonOption[];
</script>

<template>
  <OnyxRadioGroup v-model="selectedOption" label="Example label" :options />
</template>
