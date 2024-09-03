<script lang="ts" setup generic="TEntry extends TableEntry">
import type { OnyxDataGridProps } from "./OnyxDataGrid";
import type { RenderRow, RenderColumn, TableEntry } from "./OnyxDataGridRenderer";
import OnyxDataGridRenderer from "./OnyxDataGridRenderer.vue";
import { useTableFeatures } from "./OnyxDataGrid.feature";
import { withSortingFeature } from "./features/sorting";
import { watch } from "vue";
import { shallowRef } from "vue";

const props = defineProps<OnyxDataGridProps<TEntry>>();

const withSorting = withSortingFeature<TEntry>();

const { enrichTableData, enrichHeaders, states } = useTableFeatures<TEntry>([withSorting]);

const rows = shallowRef<RenderRow<TEntry>[]>([]);
const columns = shallowRef<RenderColumn<TEntry>[]>([]);

const update = () => {
  rows.value = enrichTableData([...props.data]);
  columns.value = updateColumns();
};

const updateColumns = () => {
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
};

// eslint-disable-next-line no-console
watch([() => props.data, ...states], () => update(), { immediate: true, onTrigger: console.log });
</script>

<template>
  <OnyxDataGridRenderer :rows="rows" :columns="columns" />
</template>
