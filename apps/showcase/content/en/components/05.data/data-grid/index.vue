<script setup lang="ts">
import { iconPlaceholder } from "@sit-onyx/icons";
import { createFeature, DataGridFeatures, OnyxDataGrid, type ColumnConfig } from "sit-onyx";
import { computed } from "vue";

type Entry = {
  id: number;
  a: string;
  b: string;
  c: string;
  d: string;
};

const data = computed<Entry[]>(() => {
  return Array.from({ length: 6 }, (_, index) => {
    return {
      id: index + 1,
      a: "Item",
      b: "Item",
      c: "Item",
      d: "Item",
    } satisfies Entry;
  });
});

const columns = computed<ColumnConfig<Entry>[]>(() => {
  return [
    { key: "a", label: "Head" },
    { key: "b", label: "Head" },
    { key: "c", label: "Head" },
    { key: "d", label: "Head" },
  ];
});

const withFiltering = DataGridFeatures.useFiltering<Entry>();
const withPagination = DataGridFeatures.usePagination({ pageSize: 3 });

const withCustomActions = createFeature(() => ({
  name: Symbol("customActions"),
  actions: () => {
    return [
      { label: "Icon button", icon: iconPlaceholder, color: "neutral" },
      { label: "Button", icon: iconPlaceholder, displayAs: "button" },
    ];
  },
}));

const features = [withFiltering, withPagination, withCustomActions];
</script>

<template>
  <OnyxDataGrid :headline="{ text: 'Data grid', rowCount: true }" :columns :data :features />
</template>

<style lang="scss" scoped>
.onyx-data-grid {
  zoom: 0.35;
}
</style>
