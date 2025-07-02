<script lang="ts" setup>
import { ref } from "vue";
import { OnyxSelect, type SelectOption } from "../../../index.js";

const generateDummyOptions = (count: number, existingItems: number) => {
  return Array.from({ length: count }, (_, index) => {
    const id = existingItems + index + 1;
    return { value: id, label: `Option ${id}` } satisfies SelectOption;
  });
};

const options = ref<SelectOption<number>[]>(generateDummyOptions(25, 0));
const value = ref<number>();
const isLazyLoading = ref(false);

const handleLoadMore = async () => {
  isLazyLoading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 750));
  options.value = options.value.concat(generateDummyOptions(25, options.value.length));
  isLazyLoading.value = false;
};
</script>

<template>
  <OnyxSelect
    v-model="value"
    label="Example select"
    list-label="List label"
    :options="options"
    :lazy-loading="{ enabled: true, loading: isLazyLoading }"
    @lazy-load="handleLoadMore"
  />
</template>
