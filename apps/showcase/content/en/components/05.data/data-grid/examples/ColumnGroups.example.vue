<script setup lang="ts">
import { ColumnGroupConfig, OnyxDataGrid, type ColumnConfig } from "sit-onyx";
import { computed } from "vue";

type Entry = {
  id: number;
  name: string;
  age: number;
  birthday: Date;
  role: string;
  active?: boolean;
};

const data = computed<Entry[]>(() => {
  return [
    {
      id: 1,
      name: "Alice",
      age: 30,
      birthday: new Date("1990-01-01"),
      role: "User",
      active: true,
    },
    {
      id: 2,
      name: "Charlie",
      age: 35,
      birthday: new Date("1998-02-11"),
      role: "Editor",
      active: false,
    },
    {
      id: 3,
      name: "Bob",
      age: 25,
      birthday: new Date("1995-06-15"),
      role: "Administrator",
      active: true,
    },
  ];
});

const columns = computed<ColumnConfig<Entry, typeof columnGroups>[]>(() => {
  return [
    { key: "name", label: "Name" },
    { key: "age", label: "Age", type: "number", columnGroupKey: "group1" },
    { key: "birthday", label: "Birthday", type: "date", columnGroupKey: "group1" },
    { key: "role", label: "Role", columnGroupKey: "group2" },
    { key: "active", label: "Active?", type: "boolean", columnGroupKey: "group2" },
  ];
});

const columnGroups = {
  group1: { label: "Group 1" },
  group2: { label: "Group 2" },
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
