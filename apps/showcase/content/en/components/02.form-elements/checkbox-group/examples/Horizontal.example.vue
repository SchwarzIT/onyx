<script lang="ts" setup>
import { CheckboxGroupOption, OnyxCheckboxGroup } from "sit-onyx";
import { ref } from "vue";

const selectedOptions = ref<number[]>([2]);

const options = [
  { label: "Default", value: 1 },
  { label: "Initially checked", value: 2 },
  { label: "Required", value: 3, required: true },
  { label: "Disabled", value: 4, disabled: true },
  { label: "Loading", value: 5, loading: true },
] satisfies CheckboxGroupOption[];
</script>

<template>
  <OnyxCheckboxGroup
    v-model="selectedOptions"
    label="Example label"
    orientation="horizontal"
    :options
  />
</template>
