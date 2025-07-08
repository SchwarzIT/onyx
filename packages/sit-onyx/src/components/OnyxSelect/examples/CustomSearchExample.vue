<script lang="ts" setup>
import { computed, ref } from "vue";
import { normalizedIncludes, OnyxSelect, type SelectOption } from "../../../index.js";

const allOptions: SelectOption<number>[] = [
  { value: 0, label: "Option Zero" },
  { value: 1, label: "Option One" },
  { value: 2, label: "Option Two" },
  { value: 3, label: "Option Three" },
  { value: 4, label: "Option Four" },
  { value: 5, label: "Option Five" },
];

const value = ref(allOptions[0].value);
const searchTerm = ref("2");

// we need to manually manage the value label since the filtered options passed to the OynxSelect
// might not include the current value (depending on the search term) so it would be hidden otherwise
const valueLabel = computed(() => allOptions.find((option) => option.value === value.value)?.label);

// example custom filter implementation to support filter by label and value
const filteredOptions = computed(() => {
  return allOptions.filter((option) => {
    if (!searchTerm.value) return true;
    return (
      normalizedIncludes(option.label, searchTerm.value) ||
      option.value.toString() === searchTerm.value
    );
  });
});
</script>

<template>
  <OnyxSelect
    v-model="value"
    v-model:search-term="searchTerm"
    class="select"
    label="Example select"
    list-label="List label"
    :options="filteredOptions"
    :value-label="valueLabel"
    with-search
    no-filter
  />
</template>

<style lang="scss" scoped>
.select {
  max-width: 24rem;
}
</style>
