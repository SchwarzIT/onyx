<script lang="ts" setup>
import { useAsyncState, watchDebounced } from "@vueuse/core";
import { OnyxSelect, SelectOption } from "sit-onyx";
import { computed, ref } from "vue";

const value = ref<string>();
const searchTerm = ref("");

const {
  state: filteredOptions,
  isLoading,
  executeImmediate: loadOptions,
} = useAsyncState<SelectOption<string>[]>(
  async () => {
    const search = searchTerm.value.trim();
    if (!search) return [];

    // your logic here to load the options...
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return [{ label: search, value: `value-${search}` }];
  },
  [],
  {
    immediate: false,
  },
);

// using a debounce so we do not trigger the load for every keystroke
watchDebounced(searchTerm, () => loadOptions(), {
  debounce: 500,
});

// in order to display the label of the selected option, we need to "store" the full option for the selected value
const selectedOption = computed<SelectOption | undefined>((previousValue) => {
  const option = filteredOptions.value.find((option) => option.value === value.value);
  if (option) return option;

  // if selected option is not found, use the previously cached value of this computed
  if (previousValue?.value === value.value) return previousValue;
  return undefined;
});

// we need to manually manage the value label since the filtered options passed to the select
// might not include the current value (depending on the search term) so it would be hidden otherwise
const valueLabel = computed(() => selectedOption.value?.label ?? value.value);
</script>

<template>
  <OnyxSelect
    v-model="value"
    v-model:search-term="searchTerm"
    label="Example label"
    list-label="Available options"
    :options="filteredOptions"
    :loading="isLoading"
    :value-label
    with-search
    no-filter
  />
</template>
