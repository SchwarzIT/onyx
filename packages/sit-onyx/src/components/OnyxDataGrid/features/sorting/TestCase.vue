<script setup lang="ts">
import { ref, watch } from "vue";
import type { DataGridEntry, OnyxDataGridProps, SortState } from "../../../..";
import { DataGridFeatures, OnyxDataGrid } from "../../../..";

const { columns, data } = defineProps<Pick<OnyxDataGridProps, "columns" | "data">>();

const emit = defineEmits<{
  sortChange: [sortState: SortState<DataGridEntry>];
}>();

const sortState = ref<SortState<DataGridEntry>>({
  column: undefined,
  direction: "none",
});
watch(sortState, () => emit("sortChange", sortState.value), { deep: true });

const withSorting = DataGridFeatures.useSorting({ sortState });
const features = [withSorting];
</script>

<template>
  <OnyxDataGrid :columns :data :features />
</template>
