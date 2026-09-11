<script lang="ts" setup>
import { refDebounced, useAsyncState } from "@vueuse/core";
import { OnyxEmpty, OnyxLoadingIndicator, OnyxSelect, SelectOption } from "sit-onyx";
import { computed, ref, watch } from "vue";

const value = ref<string>();
const searchTerm = ref("");

// using a debounce so we do not trigger the load for every keystroke
const debouncedSearchTerm = refDebounced(searchTerm, 500);

const {
  state: filteredOptions,
  isLoading,
  executeImmediate: loadOptions,
} = useAsyncState<SelectOption<string>[]>(
  async () => {
    const search = debouncedSearchTerm.value.trim();
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

watch(debouncedSearchTerm, () => loadOptions());

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
  >
    <template #empty="{ defaultMessage }">
      <OnyxEmpty v-if="isLoading">
        <template #icon>
          <OnyxLoadingIndicator class="loading-indicator" type="circle" />
        </template>
        Loading...
      </OnyxEmpty>

      <OnyxEmpty v-else>
        {{ !debouncedSearchTerm ? "Type to search..." : defaultMessage }}
      </OnyxEmpty>
    </template>
  </OnyxSelect>
</template>

<style lang="scss" scoped>
.loading-indicator {
  color: var(--onyx-color-text-icons-primary-intense);
}
</style>
