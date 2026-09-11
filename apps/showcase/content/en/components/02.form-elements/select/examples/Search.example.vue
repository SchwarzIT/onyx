<script lang="ts" setup>
import { OnyxSelect, SelectOption } from "sit-onyx";
import { ref } from "vue";

const values = ref<string[]>([]);

const options = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Mango", value: "mango" },
] satisfies SelectOption[];
</script>

<template>
  <OnyxSelect
    v-model="values"
    label="Example label"
    list-label="Available options"
    :options
    multiple
    with-search
    with-check-all
  />
</template>
