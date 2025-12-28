<script setup lang="ts">
import { DataGridFeatures, OnyxDataGrid, type ColumnConfig } from "../../../index.js";

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

const withPagination = DataGridFeatures.usePagination({
  // optionally you can allow the user to change how many items per page are displayed
  itemsPerPage: [5, 10, 25, 50, 100],
});

const features = [withPagination];
</script>

<template>
  <OnyxDataGrid :headline="{ text: 'Example headline', rowCount: true }" :columns :data :features />
</template>
