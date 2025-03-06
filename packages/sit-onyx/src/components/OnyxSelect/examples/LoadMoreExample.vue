<script lang="ts" setup>
import plusSmall from "@sit-onyx/icons/plus-small.svg?raw";
import { ref } from "vue";
import { OnyxButton, OnyxSelect, type SelectOption } from "../../..";

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
    class="select"
    label="Example select"
    list-label="List label"
    :options="options"
  >
    <template #optionsEnd>
      <OnyxButton
        class="select__load-more"
        label="Load more"
        mode="plain"
        :loading="isLazyLoading"
        :icon="plusSmall"
        @click="handleLoadMore"
      />
    </template>
  </OnyxSelect>
</template>

<style lang="scss" scoped>
.select {
  max-width: 24rem;

  &__load-more {
    width: 100%;
  }
}
</style>
