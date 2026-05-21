<script lang="ts" setup>
import { OnyxSelect, SelectOption } from "sit-onyx";
import { ref } from "vue";

const options = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Mango", value: "mango" },
] satisfies SelectOption[];

// for this example, we pre-select the first two options
const values = ref<string[]>(options.slice(0, 2).map((option) => option.value));
</script>

<template>
  <OnyxSelect
    v-model="values"
    label="Summary mode"
    list-label="Available options"
    :options
    multiple
    with-check-all
  />

  <OnyxSelect
    v-model="values"
    label="Preview mode"
    list-label="Available options"
    text-mode="preview"
    :options
    multiple
    with-check-all
  />
</template>
