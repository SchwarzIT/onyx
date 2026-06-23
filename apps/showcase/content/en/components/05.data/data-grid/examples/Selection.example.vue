<script setup lang="ts">
import { DataGridFeatures, OnyxDataGrid, type ColumnConfig } from "sit-onyx";
import { computed, ref } from "vue";

type Entry = {
  id: number;
  name: string;
};

const data = computed<Entry[]>(() => {
  return [
    { id: 1, name: "Alice" },
    { id: 2, name: "Charlie" },
    { id: 3, name: "Bob" },
    { id: 4, name: "Robin" },
    { id: 5, name: "John" },
  ];
});

const columns = computed<ColumnConfig<Entry>[]>(() => {
  return [{ key: "name", label: "Name" }];
});

const selectionState = ref<DataGridFeatures.SelectionState>({
  selectMode: "include",
  // optionally add initially checked rows here
  contingent: new Set([2]),
});

const withSelection = DataGridFeatures.useSelection<Entry>({
  selectionState,
});

const features = [withSelection];

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

// TODO: only used for this example, remove in your project
/** All rows in the selection contingent. */
const contingentRows = computed(() => {
  return data.value.filter((row) => selectionState.value.contingent.has(row.id));
});
</script>

<template>
  <div>
    <OnyxDataGrid
      :headline="{ text: 'Example headline', rowCount: true }"
      :columns
      :data
      :features
    />

    <div class="data onyx-text--small">
      <p>Mode: {{ selectionState.selectMode }}</p>
      <p>Contingent: {{ contingentRows.map((row) => row.name).join(", ") || "-" }}</p>
      <p>=> Selected rows: {{ selectedRows.map((row) => row.name).join(", ") || "-" }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.data {
  margin-top: var(--onyx-density-sm);
  color: var(--onyx-color-text-icons-neutral-medium);
}
</style>
