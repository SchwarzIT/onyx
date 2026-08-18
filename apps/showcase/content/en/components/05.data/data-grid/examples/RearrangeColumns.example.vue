<script setup lang="ts">
import { DataGridFeatures, OnyxDataGrid, type ColumnConfig } from "sit-onyx";
import { ref } from "vue";

type Entry = {
  id: number;
  name: string;
  age: number;
  birthday: Date;
  isActive?: boolean;
};

const data: Entry[] = [
  { id: 1, name: "Alice", age: 30, birthday: new Date("1990-01-01"), isActive: true },
  { id: 2, name: "Charlie", age: 35, birthday: new Date("1998-02-11"), isActive: false },
  { id: 3, name: "Bob", age: 25, birthday: new Date("1995-06-15"), isActive: false },
  { id: 4, name: "Robin", age: 28, birthday: new Date("2001-02-22"), isActive: true },
  { id: 5, name: "John", age: 42, birthday: new Date("1997-04-18"), isActive: false },
];

const columns: ColumnConfig<Entry>[] = [
  { key: "name", label: "Name" },
  { key: "age", label: "Rank" },
  { key: "birthday", label: "Birthday", type: "date" },
  { key: "isActive", label: "Is active?", width: "max-content", type: "boolean" },
];

// you can e.g. watch this state to save the re-arranged order in the backend
const rearrangeState = ref<DataGridFeatures.ColumnRearrangeState>({
  active: false,
  order: new Map(),
});

const withRColumnRearrange = DataGridFeatures.useColumnRearrange<Entry>({
  state: rearrangeState,
});

const features = [withRColumnRearrange];
</script>

<template>
  <OnyxDataGrid :headline="{ text: 'Example headline', rowCount: true }" :columns :data :features />
</template>
