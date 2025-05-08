<script setup lang="ts">
import { computed, ref, toValue, watch } from "vue";
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
  dataGrid: Pick<OnyxDataGridProps<any, any, any, any, any, any>, "columns" | "data">; // eslint-disable-line @typescript-eslint/no-explicit-any -- for simplicity we use any here
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
  hover: computed(() => toValue(selectionOption.hover ?? false)),
  disabled: computed(() => toValue(selectionOption.disabled ?? false)),
});
const features = [withSelection];
</script>

<template>
  <OnyxDataGrid :columns="dataGrid.columns" :data="dataGrid.data" :features />
</template>
