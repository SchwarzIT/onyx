<script setup lang="ts">
import { OnyxDataGrid, type ColumnConfig } from "sit-onyx";
import { computed } from "vue";

type Entry = {
  id: number;
  name?: string;
  email?: string;
};

const data = computed<Entry[]>(() => {
  return [{ id: 1 }, { id: 2 }, { id: 3 }];
});

const columns = computed<ColumnConfig<Entry>[]>(() => {
  return [
    { key: "name", label: "Name" },
    {
      key: "email",
      label: "Email",
      type: {
        name: "string",
        options: {
          fallback: "not defined",
        },
      },
    },
  ];
});
</script>

<template>
  <OnyxDataGrid :headline="{ text: 'Example headline', rowCount: true }" :columns :data />
</template>
