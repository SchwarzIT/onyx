<script setup lang="ts">
import { iconTrash } from "@sit-onyx/icons";
import {
  createFeature,
  DataGridFeatures,
  OnyxButton,
  OnyxDataGrid,
  type ColumnConfig,
} from "sit-onyx";
import { computed, ref } from "vue";

type Entry = {
  id: number;
  name: string;
  age: number;
  birthday: Date;
};

const INITIAL_DATA: Entry[] = [
  { id: 1, name: "Alice", age: 30, birthday: new Date("1990-01-01") },
  { id: 2, name: "Charlie", age: 35, birthday: new Date("1998-02-11") },
  { id: 3, name: "Bob", age: 25, birthday: new Date("1995-06-15") },
  { id: 4, name: "Robin", age: 28, birthday: new Date("2001-02-22") },
  { id: 5, name: "John", age: 42, birthday: new Date("1997-04-18") },
];

const data = ref<Entry[]>([...INITIAL_DATA]);

const columns: ColumnConfig<Entry>[] = [
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
  { key: "birthday", label: "Birthday", type: "date" },
];

const selectionState = ref<DataGridFeatures.SelectionState>({
  selectMode: "include",
  contingent: new Set(),
});

const selectedRows = computed(() => {
  if (selectionState.value.selectMode === "include") {
    return selectionState.value.contingent as Set<number>;
  } else {
    const allIds = data.value.map((entry) => entry.id);
    return new Set(allIds.filter((id) => !selectionState.value.contingent.has(id)));
  }
});

const withSelection = DataGridFeatures.useSelection<Entry>({ selectionState });
const canDeleteRows = computed(() => selectedRows.value.size > 0);

const deleteSelectedRows = () => {
  data.value = data.value.filter((entry) => !selectedRows.value.has(entry.id));
  selectionState.value = { selectMode: "include", contingent: new Set() };
};

const resetDataGrid = () => {
  // TODO: Implement your own reset logic here
  data.value = [...INITIAL_DATA];
  selectionState.value = { selectMode: "include", contingent: new Set() };
};

const withCustomActions = createFeature(() => ({
  name: Symbol("custom actions feature"),
  actions: () => [
    {
      label: "Delete selected rows",
      icon: iconTrash,
      displayAs: "button",
      color: "neutral",
      disabled: !canDeleteRows.value,
      onClick: () => deleteSelectedRows(),
    },
  ],
}));

const features = [withCustomActions, withSelection];
</script>

<template>
  <div class="wrapper">
    <OnyxButton label="Reset DataGrid" @click="resetDataGrid" />
    <OnyxDataGrid headline="Multi Selection with Delete Action" :columns :data :features />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-density-xl);
}
</style>
