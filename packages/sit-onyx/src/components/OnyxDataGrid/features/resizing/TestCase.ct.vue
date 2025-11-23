<script setup lang="ts">
import { ref, watch, watchEffect } from "vue";
import type { DataGridEntry, OnyxDataGridProps } from "../../../../index.js";
import { DataGridFeatures, OnyxDataGrid } from "../../../../index.js";
import type { ResizeState } from "./types.js";

const props = defineProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- for simplicity we use any here
  Pick<OnyxDataGridProps<any, any, any, any, any, any>, "columns" | "data"> & {
    resizeState?: Record<keyof DataGridEntry, string>;
  }
>();

const emit = defineEmits<{
  "update:resizeState": [state: Record<keyof DataGridEntry, string>];
}>();

const state = ref<ResizeState<DataGridEntry>>(new Map());
watchEffect(() => {
  if (props.resizeState) state.value = new Map(Object.entries(props.resizeState));
});

watch(
  state,
  (newState) => {
    emit("update:resizeState", Object.fromEntries(newState.entries()));
  },
  { deep: true },
);

const withResizing = DataGridFeatures.useResizing({ resizeState: state });
const features = [withResizing];
</script>

<template>
  <OnyxDataGrid :columns :data :features />
</template>

<style>
.onyx-data-grid {
  max-width: 1000px;
}
</style>
