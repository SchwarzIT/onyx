<script setup lang="ts">
import { iconPlaceholder } from "@sit-onyx/icons";
import { createFeature, OnyxDataGrid, type ColumnConfig } from "../../../index.js";

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
  { key: "birthday", label: "Birthday", type: "date" },
];

// create a custom reusable data grid feature that you can also e.g. share / re-use in your project
const withCustomActions = createFeature(() => ({
  name: Symbol("custom actions feature"),
  actions: [
    {
      label: "Action 1",
      icon: iconPlaceholder,
      color: "neutral",
      onClick: () => alert("Action clicked!"),
    },
    {
      label: "Action 2",
      icon: iconPlaceholder,
      color: "neutral",
      onClick: () => alert("Action clicked!"),
    },
    {
      label: "Action 3",
      icon: iconPlaceholder,
      displayAs: "button",
      mode: "plain",
      group: "group-1",
      onClick: () => alert("Action clicked!"),
    },
  ],
}));

const features = [withCustomActions];
</script>

<template>
  <OnyxDataGrid headline="Example headline" :columns :data :features />
</template>
