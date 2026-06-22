<script setup lang="ts">
import { ColumnGroupConfig, OnyxDataGrid, type ColumnConfig } from "sit-onyx";
import { computed } from "vue";

type Entry = {
  id: number;
  name: string;
  age: number;
  birthday: Date;
};

const data = computed<Entry[]>(() => {
  return [
    { id: 1, name: "Alice", age: 30, birthday: new Date("1990-01-01") },
    { id: 2, name: "Charlie", age: 35, birthday: new Date("1998-02-11") },
    { id: 3, name: "Bob", age: 25, birthday: new Date("1995-06-15") },
    { id: 4, name: "Robin", age: 28, birthday: new Date("2001-02-22") },
    { id: 5, name: "John", age: 42, birthday: new Date("1997-04-18") },
  ];
});

const columns = computed<ColumnConfig<Entry, typeof columnGroups>[]>(() => {
  return [
    { key: "name", label: "Name" },
    { key: "age", label: "Age", type: "number", columnGroupKey: "group1" },
    { key: "birthday", label: "Birthday", type: "date", columnGroupKey: "group1" },
  ];
});

const columnGroups = {
  group1: { label: "Group 1" },
} satisfies ColumnGroupConfig;
</script>

<template>
  <OnyxDataGrid
    :headline="{ text: 'Example headline', rowCount: true }"
    :columns
    :data
    :column-groups
  />
</template>
