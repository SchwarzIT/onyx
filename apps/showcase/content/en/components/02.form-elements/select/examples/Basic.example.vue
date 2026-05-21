<script lang="ts" setup>
import { OnyxSelect, SelectOption } from "sit-onyx";
import { ref } from "vue";

const value = ref<string>();

const options = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Mango", value: "mango" },
] satisfies SelectOption[];
</script>

<template>
  <OnyxSelect
    v-model="value"
    label="Example label"
    list-label="Available options"
    placeholder="Placeholder..."
    :options
    required
  />
</template>
