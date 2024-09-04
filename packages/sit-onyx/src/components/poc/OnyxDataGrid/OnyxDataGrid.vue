<script lang="ts" setup generic="TEntry extends TableEntry">
import type { OnyxDataGridProps } from "./OnyxDataGrid";
import type { RenderRow, RenderHeader, TableEntry } from "./OnyxDataGridRenderer";
import OnyxDataGridRenderer from "./OnyxDataGridRenderer.vue";
import { useTableFeatures } from "./OnyxDataGrid.feature";
import { withSortingFeature } from "./features/sorting/sorting";
import { withDraggingFeature } from "./features/reordering/dragging";

import { watch } from "vue";
import { shallowRef } from "vue";
import { withFilteringFeature } from "./features/filtering/filtering";

const props = defineProps<OnyxDataGridProps<TEntry>>();

const withSorting = withSortingFeature<TEntry>();
const withFiltering = withFilteringFeature<TEntry>();
const withDragging = withDraggingFeature<TEntry>();

const { enrichTableData, enrichHeaders, states } = useTableFeatures<TEntry, keyof any>([
  withSorting,
  withFiltering,
  withDragging,
]);

const rows = shallowRef<RenderRow<TEntry>[]>([]);
const columns = shallowRef<RenderHeader<TEntry>[]>([]);

const update = () => {
  rows.value = enrichTableData([...props.data], [...props.columns]);
  columns.value = updateColumns();
};

const updateColumns = () => {
  const _columns = props.columns.map(({ key }) => ({
    key,
    headerProps: {},
    header: () => `${key.toString()}`,
  }));
  return enrichHeaders(_columns);
};

// eslint-disable-next-line no-console
watch([() => props.data, () => props.columns, ...states], () => update(), {
  immediate: true,
  onTrigger: console.log,
});
</script>

<template>
  <OnyxDataGridRenderer :rows="rows" :columns="columns" />
</template>
