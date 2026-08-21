<script setup lang="ts">
import { OnyxDataGrid, type ColumnConfig } from "sit-onyx";
import { computed } from "vue";

type Entry = {
  id: number;
  name: string;
  email: string;
};

const data = computed<Entry[]>(() => {
  return [
    // your date here once loaded
  ];
});

const columns = computed<ColumnConfig<Entry>[]>(() => {
  return [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
  ];
});
</script>

<template>
  <OnyxDataGrid :headline="{ text: 'Example headline', rowCount: true }" :columns :data skeleton />
</template>
