<script setup lang="ts">
import { DataGridFeatures, normalizedIncludes, OnyxDataGrid, type ColumnConfig } from "sit-onyx";
import { computed, ref, watch } from "vue";

type Entry = {
  id: number;
  name: string;
};

function getData(): Entry[] {
  return [
    { id: 1, name: "Alice" },
    { id: 2, name: "Charlie" },
    { id: 3, name: "Bob" },
    { id: 4, name: "Robin" },
    { id: 5, name: "John" },
  ];
}

const data = ref<Entry[]>(getData());

const columns = computed<ColumnConfig<Entry>[]>(() => {
  return [{ key: "name", label: "Name" }];
});

const filterState = ref<DataGridFeatures.FilterState<Entry>>({});

const withFiltering = DataGridFeatures.useFiltering<Entry>({
  // options here...
  filterState,
});

const features = [withFiltering];

const isLoading = ref(false);

watch(
  filterState,
  async () => {
    // TODO: send a request with the filter state to your backend here to get the new filtered data
    // for this example, we fake a request here
    isLoading.value = true;
    await new Promise((resolve) => setTimeout(resolve, 1000));

    data.value = getData().filter((entry) => {
      const search = filterState.value.name?.trim();
      if (!search) return true;
      return normalizedIncludes(entry.name, search);
    });

    isLoading.value = false;
  },
  { deep: true },
);
</script>

<template>
  <OnyxDataGrid
    :headline="{ text: 'Example headline', rowCount: true }"
    :columns
    :data
    :features
    :skeleton="isLoading"
    async
  />
</template>
