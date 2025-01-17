<!-- <script setup lang="ts">
import { ref, watch } from "vue";
import type { DataGridEntry, OnyxDataGridProps } from "../../../..";
import { DataGridFeatures, OnyxDataGrid } from "../../../..";

const { columns, data } = defineProps<Pick<OnyxDataGridProps, "columns" | "data">>();

const emit = defineEmits<{
  filterChange: [filterState: DataGridFeatures.FilterState<DataGridEntry>];
}>();

const filterState = ref<DataGridFeatures.SortState<DataGridEntry>>({
  column: undefined,
  direction: "none",
});
watch(sortState, () => emit("sortChange", sortState.value), { deep: true });

const withSorting = DataGridFeatures.useSorting({ sortState });
const features = [withSorting];
</script>

<template>
  <OnyxDataGrid :columns :data :features />
</template> -->
