<script setup lang="ts">
import { computed } from "vue";
import type { DataGridEntry, OnyxDataGridProps } from "../../../../index.js";
import { DataGridFeatures, OnyxDataGrid } from "../../../../index.js";
import type { ResizingOptions } from "./types.js";

const { columns, data, resizingOptions } = defineProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- for simplicity we use any here
  Pick<OnyxDataGridProps<any, any, any, any, any, any>, "columns" | "data"> & {
    resizingOptions?: ResizingOptions<DataGridEntry>;
  }
>();

const withResizing = computed(() => DataGridFeatures.useResizing(resizingOptions));
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
