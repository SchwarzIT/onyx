<script setup lang="ts">
import { DataGridFeatures, OnyxDataGrid, type ColumnConfig } from "sit-onyx";
import { computed, ref } from "vue";

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

// you can e.g. watch this state to save the re-arranged order in the backend
const rearrangeState = ref<DataGridFeatures.RowRearrangeState<Entry>>({
  active: false,
  order: new Map(),
});

const withRowRearrange = DataGridFeatures.useRowRearrange<Entry>({
  state: rearrangeState,
});

const features = [withRowRearrange];
</script>

<template>
  <OnyxDataGrid :headline="{ text: 'Example headline', rowCount: true }" :columns :data :features />
</template>
