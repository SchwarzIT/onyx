<script setup lang="ts">
import { computed } from "vue";
import type { DataGridEntry, DataGridFeature, OnyxDataGridProps } from "../../../../index.js";
import { DataGridFeatures, OnyxDataGrid } from "../../../../index.js";
import type { StickyColumnsOptions } from "./types.js";

const { columns, data, stickyColumnsOptions, withSelection, withFiltering } = defineProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- for simplicity we use any here
  Pick<OnyxDataGridProps<any, any, any, any, any, any>, "columns" | "data"> & {
    stickyColumnsOptions?: StickyColumnsOptions<DataGridEntry>;
    withSelection?: boolean;
    withFiltering?: boolean;
  }
>();

const stickyColumnsFeature = computed(() =>
  DataGridFeatures.useStickyColumns(stickyColumnsOptions),
);
const selectionFeature = DataGridFeatures.useSelection();
const filteringFeature = DataGridFeatures.useFiltering();

const features = computed(() => {
  const _features: DataGridFeature<DataGridEntry>[] = [stickyColumnsFeature.value];
  if (withSelection) {
    _features.push(selectionFeature);
  }
  if (withFiltering) {
    _features.push(filteringFeature);
  }

  return _features;
});
</script>

<template>
  <OnyxDataGrid :columns :data :features />
</template>
