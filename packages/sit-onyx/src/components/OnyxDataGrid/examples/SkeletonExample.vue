<script setup lang="ts">
import { ref } from "vue";
import { OnyxDataGrid, OnyxSwitch, type ColumnConfig } from "../../..";

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
  { key: "age", label: "Age", type: "number" },
  {
    key: "birthday",
    label: "Birthday",
    type: { name: "date", options: { format: { dateStyle: "full" } } },
  },
];

const skeleton = ref(true);
</script>

<template>
  <OnyxSwitch v-model="skeleton" label="Toggle Skeleton Mode" />
  <OnyxDataGrid headline="Example headline" :columns :data :skeleton />
</template>
