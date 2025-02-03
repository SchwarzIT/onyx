<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable vue/no-setup-props-reactivity-loss */
import { ref, watch } from "vue";
import type { OnyxDataGridProps } from "../../../..";
import { DataGridFeatures, OnyxDataGrid } from "../../../..";

// Playwright is only able to transfer JSON compatible data types, so we emit an array here
export type TransferableEmit = Omit<DataGridFeatures.SelectionState, "contingent"> & {
  contingent: PropertyKey[];
};

const { dataGrid, selectionOption } = defineProps<{
  /**
   * props passed through to DataGrid
   */
  dataGrid: Pick<OnyxDataGridProps<any, any, any, any>, "columns" | "data">;
  /**
   * props passed through to the feature
   */
  selectionOption: DataGridFeatures.SelectionOptions;
}>();

const emit = defineEmits<{
  selectionChange: [selectionState: TransferableEmit];
}>();

const selectionState = ref<DataGridFeatures.SelectionState>({
  selectMode: "include",
  contingent: new Set(),
});

watch(
  selectionState,
  () =>
    emit("selectionChange", {
      ...selectionState.value,
      contingent: [...selectionState.value.contingent],
    }),
  { deep: true },
);

const withSelection = DataGridFeatures.useSelection({
  selectionState,
  hover: selectionOption.hover,
  enabled: selectionOption.enabled,
});
const features = [withSelection];
</script>

<template>
  <OnyxDataGrid :columns="dataGrid.columns" :data="dataGrid.data" :features />
</template>
