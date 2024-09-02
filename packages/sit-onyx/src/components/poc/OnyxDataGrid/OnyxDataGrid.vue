<script lang="ts" setup generic="TEntry extends TableEntry">
import { computed } from "vue";
import type { OnyxDataGridProps } from "./OnyxDataGrid";
import type { RenderRow, RenderColumn, TableEntry } from "./OnyxDataGridRenderer";
import OnyxDataGridRenderer from "./OnyxDataGridRenderer.vue";
import { useTableFeatures } from "./OnyxDataGrid.feature";

const props = defineProps<OnyxDataGridProps<TEntry>>();

const { enrichTableData } = useTableFeatures([]);

const rows = computed<RenderRow<TableEntry>[]>(() => enrichTableData(props.data));

const columns = computed<RenderColumn<TableEntry>[]>(() => {
  const firstEntry = props.data.at(0);
  if (!firstEntry) {
    return [];
  }
  return Object.entries(firstEntry).map(([key]) => ({
    key,
    cellAttrs: {},
    header: () => `${key}`,
  }));
});
</script>

<template>
  <OnyxDataGridRenderer :rows="rows" :columns="columns" />
</template>
