<script setup lang="ts">
import { DataGridFeatures, OnyxDataGrid, type ColumnConfig } from "sit-onyx";
import { computed } from "vue";

type Entry = {
  id: number;
  name: string;
  age: number;
  birthday: Date;
  active?: boolean;
};

const data = computed<Entry[]>(() => {
  return [
    { id: 1, name: "Alice", age: 30, birthday: new Date("1990-01-01"), active: true },
    { id: 2, name: "Charlie", age: 35, birthday: new Date("1998-02-11"), active: false },
    { id: 3, name: "Bob", age: 25, birthday: new Date("1995-06-15"), active: false },
    { id: 4, name: "Robin", age: 28, birthday: new Date("2001-02-22"), active: true },
    { id: 5, name: "John", age: 42, birthday: new Date("1997-04-18"), active: false },
  ];
});

const columns = computed<ColumnConfig<Entry>[]>(() => {
  return [
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
    { key: "birthday", label: "Birthday", type: "date" },
    { key: "active", label: "Active?", type: "boolean" },
  ];
});

const withSorting = DataGridFeatures.useSorting<Entry>({
  // options here...
});

const features = [withSorting];
</script>

<template>
  <OnyxDataGrid :headline="{ text: 'Example headline', rowCount: true }" :columns :data :features />
</template>
