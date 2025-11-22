<script setup lang="ts">
import { ref } from "vue";
import { DataGridFeatures, OnyxDataGrid, type ColumnConfig } from "../../../index.js";
import type { PaginationState } from "../features/all.js";

type TEntry = {
  id: number;
  name: string;
  age: number;
};

const data: TEntry[] = Array.from({ length: 128 }, (_, index) => {
  const id = index + 1;
  return { id, name: `Name ${id}`, age: id };
});

const columns: ColumnConfig<TEntry>[] = [
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
];

const paginationState = ref<PaginationState>({
  current: 1,
  pages: 6,
  pageSize: 25,
});

const withPagination = DataGridFeatures.usePagination({
  itemsPerPage: [5, 10, 25, 50, 100],
  paginationState,
});
const features = [withPagination];
</script>

<template>
  <OnyxDataGrid :headline="{ text: 'Example headline', rowCount: true }" :columns :data :features />
</template>
