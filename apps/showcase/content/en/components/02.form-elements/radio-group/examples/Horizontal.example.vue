<script lang="ts" setup>
import { OnyxRadioGroup, RadioButtonOption } from "sit-onyx";
import { ref } from "vue";

const selectedOption = ref<number>();

const options = [
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 },
  { label: "Option 3", value: 3 },
] satisfies RadioButtonOption[];
</script>

<template>
  <OnyxRadioGroup
    v-model="selectedOption"
    label="Example label"
    orientation="horizontal"
    :options
  />
</template>
