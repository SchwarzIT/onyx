<script setup lang="ts">
import { iconTrash } from "@sit-onyx/icons";
import { computed, h, ref } from "vue";
import {
  createFeature,
  DataGridFeatures,
  OnyxButton,
  OnyxDataGrid,
  OnyxSystemButton,
  type ColumnConfig,
  type ColumnGroupConfig,
  type ColumnTypesFromFeatures,
  type TypeRenderMap,
} from "../../../index.js";
import OnyxSeparator from "../../OnyxSeparator/OnyxSeparator.vue";

type TEntry = {
  id: number;
  name: string;
  age: number;
  birthday: Date;
};

const INITIAL_DATA: TEntry[] = [
  { id: 1, name: "Alice", age: 30, birthday: new Date("1990-01-01") },
  { id: 2, name: "Charlie", age: 35, birthday: new Date("1998-02-11") },
  { id: 3, name: "Bob", age: 25, birthday: new Date("1995-06-15") },
  { id: 4, name: "Robin", age: 28, birthday: new Date("2001-02-22") },
  { id: 5, name: "John", age: 42, birthday: new Date("1997-04-18") },
];

// Delete Example with Selection and Action Button
const data1 = ref<TEntry[]>([...INITIAL_DATA]);

const columns1: ColumnConfig<TEntry>[] = [
  { key: "name", label: "Name" },
  { key: "age", label: "Rank" },
  { key: "birthday", label: "Birthday", type: "date" },
];

const selectionState = ref<DataGridFeatures.SelectionState>({
  selectMode: "include",
  contingent: new Set(),
});

// All selected rows, considering the selection mode.
const selectedRows = computed(() => {
  if (selectionState.value.selectMode === "include") {
    return selectionState.value.contingent as Set<number>;
  } else {
    const allIds = data1.value.map((entry) => entry.id);
    return new Set(allIds.filter((id) => !selectionState.value.contingent.has(id)));
  }
});

const withSelection = DataGridFeatures.useSelection<TEntry>({ selectionState });
const canDeleteRows = computed(() => selectedRows.value.size > 0);

const deleteSelectedRows = () => {
  data1.value = data1.value.filter((entry) => !selectedRows.value.has(entry.id));
  selectionState.value = { selectMode: "include", contingent: new Set() };
};

const resetDataGrid1 = () => {
  data1.value = [...INITIAL_DATA];
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

const features1 = [withCustomActions, withSelection];

// Delete Example with Action Column
const data2 = ref<TEntry[]>([...INITIAL_DATA]);

const deleteSingleRow = (id: number) => {
  data2.value = data2.value.filter((entry) => entry.id !== id);
};

const resetDataGrid2 = () => {
  data2.value = [...INITIAL_DATA];
};

const withRowActions = createFeature(() => ({
  name: Symbol("row actions feature"),
  typeRenderer: {
    deleteButton: DataGridFeatures.createTypeRenderer({
      cell: {
        tdAttributes: {
          style: { width: "calc(1.5rem + 2 * var(--onyx-density-md))" },
        },
        component: (props) => {
          return h(OnyxSystemButton, {
            label: "Delete Row",
            icon: iconTrash,
            onClick: () => deleteSingleRow(props.row.id),
          });
        },
      },
    }),
  } satisfies TypeRenderMap<TEntry>,
}));

type CustomColumnTypes = ColumnTypesFromFeatures<typeof withRowActions>;

const columns2: ColumnConfig<TEntry, ColumnGroupConfig, CustomColumnTypes>[] = [
  { key: "name", label: "Name", type: "string" },
  { key: "age", label: "Rank" },
  { key: "birthday", label: "Birthday", type: "date" },
  { key: "id", label: "", type: "deleteButton", width: "min-content" },
];

const features2 = [withRowActions];
</script>

<template>
  <div class="wrapper">
    <OnyxButton label="Reset Multi-Grid" @click="resetDataGrid1" />
    <OnyxDataGrid
      headline="Selection + Action Button"
      :columns="columns1"
      :data="data1"
      :features="features1"
    />

    <OnyxSeparator />
    <OnyxButton label="Reset Single-Grid" @click="resetDataGrid2" />
    <OnyxDataGrid
      headline="Single Row Action"
      :columns="columns2"
      :data="data2"
      :features="features2"
    />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-density-xl);
}
</style>
