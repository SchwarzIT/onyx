<script lang="ts" setup>
import { CheckboxGroupOption, OnyxCheckboxGroup } from "sit-onyx";

const options = [
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 },
  { label: "Option 3", value: 3 },
] satisfies CheckboxGroupOption[];
</script>

<template>
  <OnyxCheckboxGroup label="Example label" :options disabled />
</template>
