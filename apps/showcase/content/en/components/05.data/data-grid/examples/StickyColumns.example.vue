<script setup lang="ts">
import { DataGridFeatures, OnyxDataGrid, type ColumnConfig } from "sit-onyx";
import { computed } from "vue";

type Entry = {
  id: number;
  column1: string;
  column2: string;
};

const data = computed<Entry[]>(() => {
  return [
    {
      id: 1,
      column1: "Content",
      column2:
        "Scroll me to see the sticky columns in action. This is a very large example column.",
    },
    {
      id: 4,
      column1: "Content",
      column2:
        "Scroll me to see the sticky columns in action. This is a very large example column.",
    },
    {
      id: 5,
      column1: "Content",
      column2:
        "Scroll me to see the sticky columns in action. This is a very large example column.",
    },
  ];
});

const columns = computed<ColumnConfig<Entry>[]>(() => {
  return [
    { key: "column1", label: "Column 1", width: "max-content" },
    // for this example, we make the second column very large so the data grid gets scrollable
    // don't do this in your project
    { key: "column2", label: "Column 2", width: "64rem" },
  ];
});

const withStickyColumns = DataGridFeatures.useStickyColumns<Entry>({
  columns: ["column1"],
  position: "left",
});

const features = [withStickyColumns];
</script>

<template>
  <OnyxDataGrid :headline="{ text: 'Example headline', rowCount: true }" :columns :data :features />
</template>
