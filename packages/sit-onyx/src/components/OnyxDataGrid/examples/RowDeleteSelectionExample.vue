<script setup lang="ts">
import { iconTrash } from "@sit-onyx/icons";
import { createFeature, DataGridFeatures, OnyxDataGrid, type ColumnConfig } from "sit-onyx";
import { computed, ref } from "vue";

type Entry = {
  id: number;
  name: string;
};

const data = ref<Entry[]>([
  { id: 1, name: "Alice" },
  { id: 2, name: "Charlie" },
  { id: 3, name: "Bob" },
  { id: 4, name: "Robin" },
  { id: 5, name: "John" },
]);

const columns = computed<ColumnConfig<Entry>[]>(() => {
  return [{ key: "name", label: "Name" }];
});

const selectionState = ref<DataGridFeatures.SelectionState>({
  selectMode: "include",
  contingent: new Set([2]), // pre-select row 2 for this example
});

const withSelection = DataGridFeatures.useSelection<Entry>({ selectionState });

/**
 * All selected rows, considering the selection mode.
 */
const selectedRows = computed(() => {
  const { selectMode, contingent } = selectionState.value;

  return data.value.filter((row) => {
    if (selectMode === "exclude") return !contingent.has(row.id);
    return contingent.has(row.id);
  });
});

const deleteSelectedRows = () => {
  data.value = data.value.filter((row) => !selectedRows.value.find((r) => r.id === row.id));
  selectionState.value = { selectMode: "include", contingent: new Set() };
};

const withCustomActions = createFeature(() => ({
  name: Symbol("customActions"),
  watch: [selectedRows],
  actions: () => {
    if (!selectedRows.value.length) return [];

    return [
      {
        label: `Delete (${selectedRows.value.length})`,
        icon: iconTrash,
        displayAs: "button",
        color: "danger",
        onClick: () => deleteSelectedRows(),
      },
    ];
  },
}));

const features = [withSelection, withCustomActions];
</script>

<template>
  <OnyxDataGrid headline="Example headline" :columns :data :features />
</template>
