<script setup lang="ts">
import { DataGridFeatures, OnyxDataGrid, useToast, type ColumnConfig } from "sit-onyx";
import { computed } from "vue";

type Entry = {
  id: number;
  name: string;
  email: string;
};

const toast = useToast();

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

const withRowClick = DataGridFeatures.useRowClick<Entry>({
  label: "Show details",
  onClick: (row) => {
    toast.show({
      headline: "Clicked row!",
      description: `Row "${row.name}" was clicked. Implement your custom logic here.`,
    });
  },
  // if needed, you can disable specific rows, columns or cells here:
  // enabled: (row, column) => {},
});

const features = [withRowClick];
</script>

<template>
  <OnyxDataGrid :headline="{ text: 'Example headline', rowCount: true }" :columns :data :features />
</template>
