<script setup lang="ts" generic="TEntry extends DataGridEntry">
import { ref, toRefs, watch, type Ref } from "vue";
import {
  OnyxDataGridRenderer,
  type DataGridEntry,
  type DataGridMetadata,
  type DataGridRendererColumn,
  type DataGridRendererRow,
} from "../..";
import { useTableFeatures } from "./features";
import { useTableSorting } from "./features/sorting/sorting";

const props = defineProps<{
  /**
   * The order of and which columns should be rendered.
   */
  columns: (keyof TEntry)[];
  /**
   * The data that should be used to fill the table.
   */
  data: TEntry[];
}>();

const withSorting = useTableSorting<TEntry>();

const { watchSources, createRendererRows, createRendererColumns } = useTableFeatures([withSorting]);

const renderCols: Ref<DataGridRendererColumn<TEntry, object>[]> = ref([]);
const renderRows: Ref<DataGridRendererRow<TEntry, DataGridMetadata>[]> = ref([]);

const { columns, data } = toRefs(props);

watch(
  [columns, data, ...watchSources],
  ([newColumns, newData]) => {
    renderCols.value = createRendererColumns(newColumns);
    renderRows.value = createRendererRows(newData, newColumns);
  },
  { immediate: true },
);
</script>

<template>
  <OnyxDataGridRenderer :columns="renderCols" :rows="renderRows" />
</template>
