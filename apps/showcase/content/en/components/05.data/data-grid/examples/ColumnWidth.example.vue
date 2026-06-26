<script setup lang="ts">
import { OnyxDataGrid, type ColumnConfig } from "sit-onyx";
import { computed } from "vue";

type Entry = {
  id: number;
  name: string;
  age: number;
  description: string;
};

const data = computed<Entry[]>(() => {
  return [
    {
      id: 1,
      name: "Alice",
      age: 30,
      description: "This is a example description that could be very long",
    },
    {
      id: 2,
      name: "Charlie",
      age: 35,
      description: "This is a example description that could be very long",
    },
    {
      id: 3,
      name: "Bob",
      age: 25,
      description: "This is a example description that could be very long",
    },
  ];
});

const columns = computed<ColumnConfig<Entry>[]>(() => {
  return [
    { key: "name", label: "Name" },
    { key: "description", label: "Description", width: "minmax(10rem, 20rem)" },
    { key: "age", label: "Age", type: "number", width: "max-content" },
  ];
});
</script>

<template>
  <OnyxDataGrid :headline="{ text: 'Example headline', rowCount: true }" :columns :data />
</template>
