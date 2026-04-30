<script setup lang="ts">
import { h } from "vue";
import { DataGridFeatures, OnyxDataGrid, OnyxInfoCard, type ColumnConfig } from "../../../index.js";

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

const withExpandableRows = DataGridFeatures.useExpandableRows<TEntry>({
  component: (row) => [
    h(
      OnyxInfoCard,
      { headline: `Slot content for "${row.name}"` },
      () =>
        "Place any components here that fit your needs.\nTip: We recommend creating a single custom Vue component for the content and simply render it here and pass the required props.",
    ),
  ],
});

const features = [withExpandableRows];
</script>

<template>
  <OnyxDataGrid headline="Example headline" :columns :data :features />
</template>
