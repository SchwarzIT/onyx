<script setup lang="ts">
import { computed } from "vue";
import { DataGridFeatures, OnyxDataGrid } from "../../../../index";
import type { DataGridEntry, OnyxDataGridProps } from "../../../../index.js";
import type { StickyColumnsOptions } from "./types.js";

const { columns, data, stickyColumnsOptions } = defineProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- for simplicity we use any here
  Pick<OnyxDataGridProps<any, any, any, any, any, any>, "columns" | "data"> & {
    /**
     * config
     */
    stickyColumnsOptions?: StickyColumnsOptions<DataGridEntry>;
  }
>();
const withStickyColumns = computed(() => DataGridFeatures.useStickyColumns(stickyColumnsOptions));
const features = computed(() => [withStickyColumns.value]);
</script>

<template>
  <OnyxDataGrid :columns :data :features />
</template>
