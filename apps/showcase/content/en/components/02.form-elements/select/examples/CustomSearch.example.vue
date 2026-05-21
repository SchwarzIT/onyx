<script lang="ts" setup>
import { normalizedIncludes, OnyxSelect, SelectOption } from "sit-onyx";
import { computed, ref } from "vue";

const value = ref<string>();

const allOptions = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Mango", value: "mango" },
] satisfies SelectOption[];

const searchTerm = ref("");

// we need to manually manage the value label since the filtered options passed to the select
// might not include the current value (depending on the search term) so it would be hidden otherwise
const valueLabel = computed(() => allOptions.find((option) => option.value === value.value)?.label);

const filteredOptions = computed(() => {
  if (!searchTerm.value) return allOptions;
  return allOptions.filter((option) => {
    // your custom filter logic here...
    return normalizedIncludes(option.label, searchTerm.value);
  });
});
</script>

<template>
  <OnyxSelect
    v-model="value"
    v-model:search-term="searchTerm"
    label="Example label"
    list-label="Available options"
    placeholder="Placeholder..."
    :options="filteredOptions"
    :value-label
    with-search
    no-filter
  />
</template>
