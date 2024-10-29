<script setup lang="ts" generic="TEntry extends DataGridEntry">
import { ref, toRefs, watch, type Ref } from "vue";
import {
  OnyxDataGridRenderer,
  type DataGridEntry,
  type DataGridMetadata,
  type DataGridRendererColumn,
  type DataGridRendererRow,
} from "../..";
import { useDataGridFeatures } from "./features";
import { useDataGridSorting } from "./features/sorting/sorting";

const props = defineProps<{
  /**
   * The order of and which columns should be rendered.
   */
  columns: (keyof TEntry)[];
  /**
   * The data that should be used to fill the datagrid.
   */
  data: TEntry[];
}>();

const withSorting = useDataGridSorting<TEntry>();

const { watchSources, createRendererRows, createRendererColumns } = useDataGridFeatures([
  withSorting,
]);

// Using Ref types to avoid `UnwrapRef` issues
const renderColumns: Ref<DataGridRendererColumn<TEntry, object>[]> = ref([]);
const renderRows: Ref<DataGridRendererRow<TEntry, DataGridMetadata>[]> = ref([]);

const { columns, data } = toRefs(props);

watch(
  [columns, data, ...watchSources],
  ([newColumns, newData]) => {
    renderColumns.value = createRendererColumns(newColumns);
    renderRows.value = createRendererRows(newData, newColumns);
  },
  { immediate: true },
);
</script>

<template>
  <OnyxDataGridRenderer :columns="renderColumns" :rows="renderRows" />
</template>
