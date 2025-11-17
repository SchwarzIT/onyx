<script setup lang="ts">
import { computed, ref, toRefs, unref, watchEffect } from "vue";
import type { DataGridEntry, OnyxDataGridProps } from "../../../../index.js";
import { DataGridFeatures, OnyxDataGrid } from "../../../../index.js";
import type { ResizingOptions } from "./types.js";

const props = defineProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- for simplicity we use any here
  Pick<OnyxDataGridProps<any, any, any, any, any, any>, "columns" | "data"> & {
    resizingOptions?: ResizingOptions<DataGridEntry>;
    controlledColumnWidths?: boolean;
  }
>();

const {
  columns,
  data,
  resizingOptions: resizingOptionsProp,
  controlledColumnWidths,
} = toRefs(props);

const columnWidths = ref<Partial<Record<keyof DataGridEntry, string>>>({});

watchEffect(() => {
  if (resizingOptionsProp.value?.columnWidths) {
    const widths = unref(resizingOptionsProp.value.columnWidths);
    columnWidths.value = { ...widths };
  }
});

const finalResizingOptions = computed<ResizingOptions<DataGridEntry>>(() => ({
  ...resizingOptionsProp.value,
  columnWidths: controlledColumnWidths.value ? columnWidths.value : undefined,
}));

const withResizing = computed(() => DataGridFeatures.useResizing(finalResizingOptions.value));
const features = computed(() => [withResizing.value]);
</script>

<template>
  <OnyxDataGrid :columns :data :features />
</template>

<style>
.onyx-data-grid {
  max-width: 1000px;
}
</style>
