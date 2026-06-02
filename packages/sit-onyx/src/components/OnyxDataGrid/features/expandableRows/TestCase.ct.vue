<script setup lang="ts">
import { computed, h } from "vue";
import type { OnyxDataGridProps } from "../../../../index.js";
import { DataGridFeatures, OnyxDataGrid } from "../../../../index.js";

const props = defineProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- for simplicity we use any here
  Pick<OnyxDataGridProps<any, any, any, any, any, any>, "columns" | "data"> & {
    enableSorting?: boolean;
  }
>();

const withExpandableRows = DataGridFeatures.useExpandableRows({
  component: (row) => [
    h("div", "Details content for row:"),
    h("pre", {}, JSON.stringify(row, null, 2)),
  ],
});

const withSorting = DataGridFeatures.useSorting({
  enabled: computed(() => props.enableSorting),
});

const features = [withExpandableRows, withSorting];
</script>

<template>
  <OnyxDataGrid :columns :data :features />
</template>
