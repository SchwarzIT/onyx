<script setup lang="ts">
import { ref } from "vue";
import { DataGridFeatures, OnyxDataGrid, type ColumnConfig } from "../../../index.js";

type TEntry = {
  id: number;
  name: string;
  age: number;
  birthday: Date;
};

const data: TEntry[] = [
  { id: 1, name: "Alice", age: 30, birthday: new Date("1990-01-01") },
  { id: 2, name: "Charlie", age: 35, birthday: new Date("1998-02-11") },
  { id: 3, name: "Bob", age: 25, birthday: new Date("1995-06-15") },
  { id: 4, name: "Robin", age: 28, birthday: new Date("2001-02-22") },
  { id: 5, name: "John", age: 42, birthday: new Date("1997-04-18") },
];

const columns: ColumnConfig<TEntry>[] = [
  { key: "name", label: "Name" },
  { key: "age", label: "Rank" },
  { key: "birthday", label: "Birthday", type: "date" },
];

const sortState = ref<DataGridFeatures.SortState<TEntry>>({
  // for this example, we set an initial sort state
  column: "name",
  direction: "desc",
});

const withSorting = DataGridFeatures.useSorting<TEntry>({
  sortState,
  columns: {
    name: { enabled: true },
    age: { enabled: false },
    birthday: { enabled: true, sortFunc: (a, b) => a.getTime() - b.getTime() },
  },
});

// for demonstration purposes, we are adding an additional feature
// so you can see that the sorting automatically moves to a "..." flyout for the "birthday" column
const withFiltering = DataGridFeatures.useFiltering<TEntry>({
  columns: {
    name: { enabled: false },
    age: { enabled: false },
    birthday: { enabled: true },
  },
});

const features = [withFiltering, withSorting];
</script>

<template>
  <OnyxDataGrid headline="Example headline" :columns :data :features />
</template>
