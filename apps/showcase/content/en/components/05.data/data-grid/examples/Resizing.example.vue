<script setup lang="ts">
import { DataGridFeatures, OnyxDataGrid, type ColumnConfig } from "sit-onyx";
import { computed } from "vue";

type Entry = {
  id: number;
  name: string;
  email: string;
};

const data = computed<Entry[]>(() => {
  return [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Charlie", email: "charlie@example.com" },
    { id: 3, name: "Bob", email: "bob@example.com" },
    { id: 4, name: "Robin", email: "robin@example.com" },
    { id: 5, name: "John", email: "john@example.com" },
  ];
});

const columns = computed<ColumnConfig<Entry>[]>(() => {
  return [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
  ];
});

const withResizing = DataGridFeatures.useResizing<Entry>({
  // options here..
});

const features = [withResizing];
</script>

<template>
  <OnyxDataGrid :headline="{ text: 'Example headline', rowCount: true }" :columns :data :features />
</template>
