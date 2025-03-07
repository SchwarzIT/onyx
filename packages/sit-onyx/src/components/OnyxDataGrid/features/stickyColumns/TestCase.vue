<script setup lang="ts">
import { computed } from "vue";
import type { DataGridEntry, OnyxDataGridProps } from "../../../..";
import { DataGridFeatures, OnyxDataGrid } from "../../../..";
import type { StickyColumnsOptions } from "./types";

const { columns, data, stickyColumnsOptions } = defineProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Pick<OnyxDataGridProps<any, any, any, any, any>, "columns" | "data"> & {
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
