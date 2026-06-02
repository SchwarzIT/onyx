<script lang="ts" setup>
import { OnyxSelect, type SelectOption } from "sit-onyx";
import { ref } from "vue";

/** Generates the given number of dummy options for this example. */
const generateDummyOptions = (count: number, existingItems: number) => {
  return Array.from({ length: count }, (_, index) => {
    const id = existingItems + index + 1;
    return { value: id, label: `Option ${id}` } satisfies SelectOption;
  });
};

/** Number of items per load */
const count = 25;

const options = ref<SelectOption<number>[]>(generateDummyOptions(count, 0));
const value = ref<number>();
const isLoading = ref(false);

const handleLoadMore = async () => {
  isLoading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  options.value = options.value.concat(generateDummyOptions(count, options.value.length));
  isLoading.value = false;
};
</script>

<template>
  <OnyxSelect
    v-model="value"
    label="Example label"
    list-label="Available options"
    :options
    :lazy-loading="{ enabled: true, loading: isLoading }"
    @lazy-load="handleLoadMore"
  />
</template>
