<script setup lang="ts">
import { computed } from "vue";
import type { DataGridEntry, OnyxDataGridProps } from "../../../../index.js";
import { DataGridFeatures, OnyxDataGrid } from "../../../../index.js";
import type { StickyColumnsOptions } from "./types.js";

const { columns, data, stickyColumnsOptions, withSelection } = defineProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- for simplicity we use any here
  Pick<OnyxDataGridProps<any, any, any, any, any, any>, "columns" | "data"> & {
    stickyColumnsOptions?: StickyColumnsOptions<DataGridEntry>;
    withSelection?: boolean;
  }
>();

const stickyColumnsFeature = computed(() =>
  DataGridFeatures.useStickyColumns(stickyColumnsOptions),
);
const selectionFeature = computed(() => DataGridFeatures.useSelection());

const features = computed(() => {
  if (withSelection) {
    return [stickyColumnsFeature.value, selectionFeature.value];
  }

  return [stickyColumnsFeature.value];
});
</script>

<template>
  <OnyxDataGrid :columns :data :features />
</template>
