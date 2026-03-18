<script setup lang="ts">
import { h } from "vue";
import { OnyxDataGrid, OnyxHeadline, type ColumnConfig } from "../../../index.js";
import { useExpandableRows } from "../features/all.js";

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

const features = [
  useExpandableRows<TEntry>({
    detailsComponent: (row) => h(OnyxHeadline, { is: "h3" }, () => `Details for ${row.name}`),
  }),
];
</script>

<template>
  <OnyxDataGrid headline="Example headline" :columns :data :features />
</template>
