<script setup lang="ts">
import { ref, watch } from "vue";
import type { DataGridEntry, OnyxDataGridProps } from "../../../..";
import { DataGridFeatures, OnyxDataGrid } from "../../../..";

const { columns, data } =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defineProps<Pick<OnyxDataGridProps<any, any, any, any>, "columns" | "data">>();

const emit = defineEmits<{
  sortChange: [sortState: DataGridFeatures.SortState<DataGridEntry>];
}>();

const sortState = ref<DataGridFeatures.SortState<DataGridEntry>>({
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
