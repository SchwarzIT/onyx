<script setup lang="ts" generic="TEntry extends DataGridEntry">
import { ref, type Ref } from "vue";
import {
  OnyxDataGridRenderer,
  type DataGridEntry,
  type DataGridRendererColumn,
  type DataGridRendererRow,
} from "../..";
import { useTableFeatures } from "./OnyxDataGrid";

const props = defineProps<{
  /**
   * The order of and which columns should be rendered.
   */
  columns: string[];
  /**
   * The data that should be used to fill the table.
   */
  data: TEntry[];
}>();

const { watchSources, enrichHeaders, enrichTableData } = useTableFeatures([]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderCols: Ref<DataGridRendererColumn<TEntry, any>[]> = ref([]);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderRows: Ref<DataGridRendererRow<TEntry, any>[]> = ref([]);

//watch(watchSources, () => {}, { immediate: true });
renderCols.value = enrichHeaders(props.columns);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
renderRows.value = enrichTableData(props.data, props.columns) as DataGridRendererRow<TEntry, any>[];
</script>
<template>
  <OnyxDataGridRenderer :columns="renderCols" :rows="renderRows" />
</template>
