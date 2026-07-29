<script setup lang="ts">
import { ref, watch } from "vue";
import OnyxDataGrid from "../../OnyxDataGrid.vue";
import type { ColumnConfig } from "../index.js";
import { useRowRearrange } from "./rowRearrange.js";
import type { RowRearrangeState } from "./types.js";

type TEntry = {
  id: number;
  name: string;
  age: number;
};

const emit = defineEmits<{
  "update:state": [order: Record<number, number>];
}>();

const data: TEntry[] = [
  { id: 1, name: "Alice", age: 30 },
  { id: 2, name: "Charlie", age: 35 },
  { id: 3, name: "Bob", age: 25 },
  { id: 4, name: "Robin", age: 28 },
  { id: 5, name: "John", age: 42 },
];

const columns: ColumnConfig<TEntry>[] = [
  { key: "name", label: "Name" },
  { key: "age", label: "Age", type: "number" },
];

const state = ref<RowRearrangeState<TEntry>>({ active: false, order: new Map() });
watch(
  state,
  (newState) => {
    emit("update:state", Object.fromEntries(newState.order.entries()));
  },
  { deep: true },
);

const withRowRearrange = useRowRearrange<TEntry>({ state });
const features = [withRowRearrange];
</script>

<template>
  <OnyxDataGrid headline="Example headline" :columns :data :features />
</template>
