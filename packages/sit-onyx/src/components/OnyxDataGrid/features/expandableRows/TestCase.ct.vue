<script setup lang="ts">
import { h } from "vue";
import type { OnyxDataGridProps } from "../../../../index.js";
import { DataGridFeatures, OnyxDataGrid } from "../../../../index.js";

const { columns, data } = defineProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- for simplicity we use any here
  Pick<OnyxDataGridProps<any, any, any, any, any, any>, "columns" | "data">
>();

const withExpandableRows = DataGridFeatures.useExpandableRows({
  component: (row) => [
    h("div", "Details content for row:"),
    h("pre", {}, JSON.stringify(row, null, 2)),
  ],
});

const features = [withExpandableRows];
</script>

<template>
  <OnyxDataGrid :columns :data :features />
</template>
