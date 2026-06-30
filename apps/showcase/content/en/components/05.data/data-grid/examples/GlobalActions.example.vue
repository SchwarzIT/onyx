<script setup lang="ts">
import { iconEdit, iconShareIos } from "@sit-onyx/icons";
import { createFeature, OnyxDataGrid, type ColumnConfig } from "sit-onyx";
import { computed } from "vue";

type Entry = {
  id: number;
  name: string;
  email: string;
};

const data = computed<Entry[]>(() => {
  return [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Charlie", email: "charlie@example.com" },
    { id: 3, name: "Bob", email: "bob@example.com" },
    { id: 4, name: "Robin", email: "robin@example.com" },
    { id: 5, name: "John", email: "john@example.com" },
  ];
});

const columns = computed<ColumnConfig<Entry>[]>(() => {
  return [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
  ];
});

const withCustomActions = createFeature(() => ({
  name: Symbol("customACtions"),
  // if your actions are conditionally displayed based on external conditions,
  // make sure to add them to the "watch" here so the data grid re-renders when the conditions changes
  // watch: [],
  actions: () => {
    return [
      {
        label: "Share",
        icon: iconShareIos,
        color: "neutral",
        onClick: () => {
          // your logic here...
        },
      },
      {
        label: "Edit",
        icon: iconEdit,
        displayAs: "button",
        onClick: () => {
          // your logic here...
        },
      },
    ];
  },
}));

const features = [withCustomActions];
</script>

<template>
  <OnyxDataGrid :headline="{ text: 'Example headline', rowCount: true }" :columns :data :features />
</template>
