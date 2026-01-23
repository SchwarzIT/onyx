<script setup lang="ts" generic="TEntry extends DataGridEntry">
import { computed, ref, watchEffect } from "vue";
import type { ColumnConfig, DataGridEntry } from "../../../../index.js";
import { DataGridFeatures, OnyxDataGrid } from "../../../../index.js";
import type { HideColumnsState } from "./types.js";

export type Entry = {
  id: number;
  a: string;
  b: string;
  c: string;
  d: string;
};

const props = defineProps<{
  allHidable?: boolean;
}>();

const emit = defineEmits<{
  "update:state": [newState: (keyof Entry)[]];
}>();

const data: Entry[] = [
  { id: 1, a: "1", b: "a", c: "aa", d: "dd" },
  { id: 2, a: "2", b: "B", c: "bb", d: "dd" },
  { id: 3, a: "3", b: "C", c: "cc", d: "dd" },
];

const columns: ColumnConfig<Entry>[] = ["a", "b", "c", { key: "d", label: "Labelled Column" }];

const state = ref<HideColumnsState<Entry>>(new Set(["b"]));
watchEffect(() => emit("update:state", Array.from(state.value.values())));

const withHideColumns = computed(() =>
  DataGridFeatures.useHideColumns({ state, columns: { c: { enabled: props.allHidable } } }),
);
const features = computed(() => [withHideColumns.value]);
</script>

<template>
  <OnyxDataGrid :columns :data :features />
</template>
