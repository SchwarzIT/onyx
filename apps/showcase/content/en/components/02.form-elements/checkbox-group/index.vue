<script lang="ts" setup>
import { CheckboxGroupOption, OnyxCheckboxGroup } from "sit-onyx";

const options = [
  { label: "Checkbox", value: 1 },
  { label: "Checkbox", value: 2 },
  { label: "Checkbox", value: 3 },
] satisfies CheckboxGroupOption[];
</script>

<template>
  <OnyxCheckboxGroup label="Checkbox group" :options hide-label />
</template>
