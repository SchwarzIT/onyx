<script setup lang="ts">
import { DataGridFeatures, OnyxDataGrid, type ColumnConfig } from "sit-onyx";
import { computed } from "vue";

type Entry = {
  id: number;
  name: string;
};

const data = computed<Entry[]>(() => {
  // generating some dummy data
  return Array.from({ length: 20 }, (_, index) => {
    const id = index + 1;
    return { id, name: `Name ${id}` };
  });
});

const columns = computed<ColumnConfig<Entry>[]>(() => {
  return [{ key: "name", label: "Name" }];
});

const withPagination = DataGridFeatures.usePagination({
  // options here...
  type: "button",
  pageSize: 5,
});

const features = [withPagination];
</script>

<template>
  <OnyxDataGrid :headline="{ text: 'Example headline', rowCount: true }" :columns :data :features />
</template>
