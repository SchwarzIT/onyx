<script setup lang="ts">
import { ref, watch } from "vue";
import { DataGridFeatures, OnyxDataGrid, type ColumnConfig } from "../../..";

type TEntry = {
  id: number;
  name: string;
  age: number;
};

const EXAMPLE_DATA: TEntry[] = Array.from({ length: 128 }, (_, index) => {
  const id = index + 1;
  return { id, name: `Name ${id}`, age: id };
});

const PAGE_SIZE = 25;

const data = ref<TEntry[]>(EXAMPLE_DATA.slice(0, PAGE_SIZE));
const isLoading = ref(false);

const paginationState = ref<DataGridFeatures.PaginationState>({
  current: 1,
  pages: Math.ceil(EXAMPLE_DATA.length / PAGE_SIZE),
  pageSize: PAGE_SIZE,
});

watch(
  () => paginationState.value.current,
  async (currentPage) => {
    isLoading.value = true;

    // simulate backend delay here
    await new Promise((resolve) => setTimeout(resolve, 1000));
    data.value = EXAMPLE_DATA.slice(0, currentPage * PAGE_SIZE);

    isLoading.value = false;
  },
);

const columns: ColumnConfig<TEntry>[] = [
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
];

const withPagination = DataGridFeatures.usePagination({
  type: "lazy",
  paginationState,
  // passing in the loading state when async pagination is used is important so scroll events are handled correctly
  loading: isLoading,
});

const features = [withPagination];
</script>

<template>
  <!-- we are using an async example here for the lazy loading. You can also use lazy loading without async which will equal virtual scrolling then. -->
  <OnyxDataGrid class="data-grid" :columns :data :features async />
</template>

<style lang="scss" scoped>
.data-grid {
  max-height: 24rem;
}
</style>
