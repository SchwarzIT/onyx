<script lang="ts" setup>
import { OnyxSelect, SelectOption } from "sit-onyx";
import { ref } from "vue";

const options = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Mango", value: "mango" },
  { label: "Kiwi", value: "kiwi" },
  { label: "Orange", value: "orange" },
  { label: "Papaya", value: "papaya" },
  { label: "Apricot", value: "apricot" },
  { label: "Lemon", value: "lemon" },
  { label: "Cranberry", value: "cranberry" },
  { label: "Avocado", value: "avocado" },
  { label: "Cherry", value: "cherry" },
  { label: "Coconut", value: "coconut" },
  { label: "Lychee", value: "lychee" },
  { label: "Melon", value: "melon" },
  { label: "Raspberry", value: "raspberry" },
  { label: "Strawberry", value: "strawberry" },
] satisfies SelectOption[];

// for this example, we pre-select a few options initially
const values = ref<string[]>(options.slice(0, 6).map((option) => option.value));
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
