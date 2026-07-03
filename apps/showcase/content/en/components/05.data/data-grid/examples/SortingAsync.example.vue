<script setup lang="ts">
import { DataGridFeatures, OnyxDataGrid, type ColumnConfig } from "sit-onyx";
import { computed, ref, watch } from "vue";

type Entry = {
  id: number;
  name: string;
};

const data = ref<Entry[]>([
  { id: 1, name: "Alice" },
  { id: 4, name: "Robin" },
  { id: 5, name: "John" },
]);

const columns = computed<ColumnConfig<Entry>[]>(() => {
  return [{ key: "name", label: "Name" }];
});

const sortState = ref<DataGridFeatures.SortState<Entry>>({
  column: undefined,
  direction: "none",
});

const withSorting = DataGridFeatures.useSorting<Entry>({
  // options here...
  sortState,
});

const features = [withSorting];

const isLoading = ref(false);

watch(sortState, async () => {
  // TODO: send a request with the sort state to your backend here to get the new sorted data
  // for this example, we fake a request here
  isLoading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  data.value.sort((a, b) => a.name.localeCompare(b.name));
  if (sortState.value.direction === "desc") data.value.reverse();
  isLoading.value = false;
});
</script>

<template>
  <OnyxDataGrid
    :headline="{ text: 'Example headline', rowCount: true }"
    :columns
    :data
    :features
    async
    :skeleton="isLoading"
  />
</template>
