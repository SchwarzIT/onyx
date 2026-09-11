<script setup lang="ts">
import { computed, ref, watch } from "vue";
import OnyxDataGrid from "../../OnyxDataGrid.vue";
import type { ColumnRearrangeState } from "../all.js";
import type { ColumnConfig } from "../index.js";
import { useColumnRearrange } from "./columnRearrange.js";

type TEntry = {
  id: number;
  name: string;
  age: number;
  birthday: Date;
  isActive?: boolean;
};

const props = defineProps<{
  headless?: boolean;
}>();

const emit = defineEmits<{
  "update:state": [order: Record<string, number>];
}>();

const data: TEntry[] = [
  { id: 1, name: "Alice", age: 30, birthday: new Date("1990-01-01"), isActive: true },
  { id: 2, name: "Charlie", age: 35, birthday: new Date("1998-02-11"), isActive: false },
  { id: 3, name: "Bob", age: 25, birthday: new Date("1995-06-15"), isActive: false },
  { id: 4, name: "Robin", age: 28, birthday: new Date("2001-02-22"), isActive: true },
  { id: 5, name: "John", age: 42, birthday: new Date("1997-04-18"), isActive: false },
];

const columns: ColumnConfig<TEntry>[] = [
  { key: "name", label: "Name" },
  { key: "age", label: "Rank" },
  { key: "birthday", label: "Birthday", type: "date" },
  { key: "isActive", label: "Is active?", width: "max-content", type: "boolean" },
];

const state = ref<ColumnRearrangeState>({ active: false, order: new Map() });

watch(
  state,
  (newState) => {
    emit("update:state", Object.fromEntries(newState.order.entries()));
  },
  { deep: true },
);

const withColumnRearrange = useColumnRearrange<TEntry>({
  state,
  headless: computed(() => props.headless),
});
const features = [withColumnRearrange];
</script>

<template>
  <OnyxDataGrid headline="Example headline" :columns :data :features />
</template>
