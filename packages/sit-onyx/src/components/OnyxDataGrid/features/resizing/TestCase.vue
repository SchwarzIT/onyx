<script setup lang="ts">
import { computed } from "vue";
import type { DataGridEntry, OnyxDataGridProps } from "../../../..";
import { DataGridFeatures, OnyxDataGrid } from "../../../..";
import type { ResizingOptions } from "./types";

const { columns, data, resizingOptions } = defineProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- for simplicity we use any here
  Pick<OnyxDataGridProps<any, any, any, any, any, any>, "columns" | "data"> & {
    /**
     * config
     */
    resizingOptions?: ResizingOptions<DataGridEntry>;
  }
>();
const withResizing = computed(() => DataGridFeatures.useResizing(resizingOptions));
const features = computed(() => [withResizing.value]);
</script>

<template>
  <OnyxDataGrid :columns :data :features />
</template>
