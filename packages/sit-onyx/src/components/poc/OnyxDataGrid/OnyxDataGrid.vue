<script lang="ts" setup generic="TEntry extends TableEntry">
import { computed } from "vue";
import type { OnyxDataGridProps } from "./OnyxDataGrid";
import type { RenderRow, RenderColumn, TableEntry } from "./OnyxDataGridRenderer";
import OnyxDataGridRenderer from "./OnyxDataGridRenderer.vue";
import { useTableFeatures } from "./OnyxDataGrid.feature";
import { withSortingFeature } from "./features/sorting";

const props = defineProps<OnyxDataGridProps<TEntry>>();

const withSorting = withSortingFeature<TEntry>();

const { enrichTableData, enrichHeaders } = useTableFeatures<TEntry>([withSorting]);

const rows = computed<RenderRow<TEntry>[]>(() => enrichTableData([...props.data]));

const columns = computed<RenderColumn<TEntry>[]>(() => {
  const firstEntry = props.data.at(0);
  if (!firstEntry) {
    return [];
  }
  const _columns = Object.entries(firstEntry).map(([key]) => ({
    key,
    headerProps: {},
    header: () => `${key}`,
  }));
  return enrichHeaders(_columns);
});
</script>

<template>
  <OnyxDataGridRenderer :rows="rows" :columns="columns" />
</template>
