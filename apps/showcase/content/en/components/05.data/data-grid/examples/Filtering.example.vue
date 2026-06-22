<script setup lang="ts">
import { DataGridFeatures, OnyxDataGrid, type ColumnConfig } from "sit-onyx";
import { computed } from "vue";

type Entry = {
  id: number;
  name: string;
};

const data = computed<Entry[]>(() => {
  return [
    { id: 1, name: "Alice" },
    { id: 2, name: "Charlie" },
    { id: 3, name: "Bob" },
    { id: 4, name: "Robin" },
    { id: 5, name: "John" },
  ];
});

const columns = computed<ColumnConfig<Entry>[]>(() => {
  return [{ key: "name", label: "Name" }];
});

const withFiltering = DataGridFeatures.useFiltering<Entry>({
  // options here...
});

const features = [withFiltering];
</script>

<template>
  <OnyxDataGrid :headline="{ text: 'Example headline', rowCount: true }" :columns :data :features />
</template>
