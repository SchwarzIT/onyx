<script setup lang="ts">
import {
  DataGridFeatures,
  OnyxDataGrid,
  type ColumnConfig,
  type ColumnGroupConfig,
} from "../../..";

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

const columns: ColumnConfig<TEntry, ColumnGroupConfig, never>[] = [
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
  { key: "birthday", label: "Birthday", type: "date" },
];

const withFiltering = DataGridFeatures.useFiltering<TEntry>({
  columns: {
    name: {
      enabled: true,
      config: {
        // customize config for "name" column
        caseSensitive: true,
      },
    },
    age: { enabled: false },
  },
  // default config for all columns
  filterConfig: {
    searchFromStart: true,
  },
});

const features = [withFiltering];
</script>

<template>
  <OnyxDataGrid :columns :data :features />
</template>
