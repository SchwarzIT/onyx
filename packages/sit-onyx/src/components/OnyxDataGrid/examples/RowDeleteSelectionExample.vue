<script setup lang="ts">
import { iconTrash } from "@sit-onyx/icons";
import { computed, ref } from "vue";
import {
  createFeature,
  DataGridFeatures,
  OnyxDataGrid,
  OnyxToast,
  useToast,
  type ColumnConfig,
} from "../../../index.js";

type Entry = {
  id: number;
  name: string;
};
const toast = useToast();

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
  const rowsToDelete = selectedRows.value;
  if (!rowsToDelete.length) return;

  const count = rowsToDelete.length;
  const names = rowsToDelete.map((row) => `"${row.name}"`).join(", ");
  const idsToDelete = new Set(rowsToDelete.map((row) => row.id));

  data.value = data.value.filter((row) => !idsToDelete.has(row.id));
  selectionState.value = { selectMode: "include", contingent: new Set() };
  toast.show({
    headline: count === 1 ? "Delete Row" : "Delete Rows",
    description:
      count === 1
        ? `Row ${names} deleted successfully.`
        : `${count} rows (${names}) deleted successfully.`,
    color: "danger",
  });
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
  <OnyxToast />
</template>
