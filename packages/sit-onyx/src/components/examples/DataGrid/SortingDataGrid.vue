<script setup lang="ts">
import { computed, toRef } from "vue";
import type { DataGridEntry } from "../../..";
import { DataGridFeatures, OnyxDataGrid } from "../../..";

const props = defineProps<{
  sortState?: DataGridFeatures.SortState<DataGridEntry>;
  columns?: DataGridFeatures.SortColumnOptions<DataGridEntry>;
}>();

const emit = defineEmits<{
  "update:sortState": [data: DataGridFeatures.SortState<DataGridEntry>];
}>();

const data = [
  { id: 1, name: "Alice", age: 30, birthday: new Date("1990-01-01") },
  { id: 2, name: "Charlie", age: 35, birthday: new Date("1998-02-11") },
  { id: 3, name: "Bob", age: 25, birthday: new Date("1995-06-15") },
];

const columns = toRef(props, "columns");

const sortState = computed({
  set: (data: DataGridFeatures.SortState<DataGridEntry>) => emit("update:sortState", data),
  get: () => props.sortState ?? { column: undefined, direction: "none" },
});

const withSorting = DataGridFeatures.useSorting({ sortState, columns });
const features = [withSorting];
</script>

<template>
  <OnyxDataGrid :columns="['name', 'age', 'birthday']" :data="data" :features />
</template>
