<script setup lang="ts">
import { DataGridFeatures, OnyxDataGrid, type ColumnConfig } from "../../../index.js";

type TEntry = {
  id: number;
  name: string;
  age: number;
};

const data: TEntry[] = [
  { id: 1, name: "Alice", age: 30 },
  { id: 2, name: "Charlie", age: 35 },
  { id: 3, name: "Bob", age: 25 },
  { id: 4, name: "Robin", age: 28 },
  { id: 5, name: "John", age: 42 },
];

const columns: ColumnConfig<TEntry>[] = [
  { key: "name", label: "Name" },
  { key: "age", label: "Age", type: "number" },
];

const withRowClick = DataGridFeatures.useRowClick<TEntry>({
  label: "Show details",
  onClick: (row) => {
    // your logic here...
    window.alert(`Clicked row "${row.name}"`);
  },
});

const features = [withRowClick];
</script>

<template>
  <OnyxDataGrid headline="Example headline" :columns :data :features />
</template>
