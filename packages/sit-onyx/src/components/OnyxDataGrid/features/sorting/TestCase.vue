<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { DataGridEntry, DataGridFeature, OnyxDataGridProps } from "../../../../index.js";
import { DataGridFeatures, OnyxDataGrid } from "../../../../index.js";

const { columns, data, enableFiltering } = defineProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- for simplicity we use any here
  Pick<OnyxDataGridProps<any, any, any, any, any, any>, "columns" | "data"> & {
    /** Whether to enable the filtering feature. */
    enableFiltering?: boolean;
  }
>();

const emit = defineEmits<{
  sortChange: [sortState: DataGridFeatures.SortState<DataGridEntry>];
}>();

const sortState = ref<DataGridFeatures.SortState<DataGridEntry>>({
  column: undefined,
  direction: "none",
});
watch(sortState, () => emit("sortChange", sortState.value), { deep: true });

const withSorting = DataGridFeatures.useSorting({ sortState });
const features = computed(() => {
  const _features: DataGridFeature<DataGridEntry>[] = [withSorting];
  if (enableFiltering) _features.unshift(DataGridFeatures.useFiltering());
  return _features;
});
</script>

<template>
  <OnyxDataGrid :columns :data :features />
</template>
