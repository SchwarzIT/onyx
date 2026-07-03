<script setup lang="ts">
import { DataGridFeatures, OnyxDataGrid, type ColumnConfig } from "sit-onyx";
import { computed, ref, watch } from "vue";

type Entry = {
  id: number;
  name: string;
};

/** Our "dummy" API response for this example */
type PaginatedEntries = {
  items: Entry[];
  total: number;
};

const data = ref<PaginatedEntries>({ items: [], total: 0 });
const isLoading = ref(false);

const columns = computed<ColumnConfig<Entry>[]>(() => {
  return [{ key: "name", label: "Name" }];
});

const paginationState = ref<DataGridFeatures.PaginationState>({
  current: 1,
  pages: 1,
  pageSize: 10,
});

// update the number of pages when the data is loaded from the API
// so the data grid is aware of them
watch(
  () => data.value.total,
  (newTotal) => {
    paginationState.value.pages = Math.ceil(newTotal / paginationState.value.pageSize);
  },
  { immediate: true },
);

const withPagination = DataGridFeatures.usePagination({
  // options here...
  paginationState,
  loading: isLoading,
  disabled: isLoading,
});

const features = [withPagination];

// fetch new data when the user switches to another page
watch(
  () => paginationState.value.current,
  async () => {
    // TODO: send a request with the pagination state to your backend here to get the new data
    // for this example, we fake a request here
    isLoading.value = true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    data.value = loadData(paginationState.value);
    isLoading.value = false;
  },
  { immediate: true, deep: true },
);

function loadData(pagination: DataGridFeatures.PaginationState): PaginatedEntries {
  const total = 128;
  const offset = (pagination.current - 1) * pagination.pageSize + 1;
  const itemCount = Math.min(pagination.pageSize, total - offset);

  // generating some dummy data
  const items = Array.from({ length: itemCount }, (_, index) => {
    const id = offset + index;
    return { id, name: `Name ${id}` } satisfies Entry;
  });

  return { items, total };
}
</script>

<template>
  <OnyxDataGrid
    :headline="{ text: 'Example headline', rowCount: data.total }"
    :columns
    :data="data.items"
    :features
    :skeleton="isLoading"
    async
  />
</template>
