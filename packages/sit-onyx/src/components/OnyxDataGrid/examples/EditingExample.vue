<script setup lang="ts">
import { ref } from "vue";
import { DataGridFeatures, OnyxDataGrid, type ColumnConfig } from "../../../index.js";
import OnyxSwitch from "../../OnyxSwitch/OnyxSwitch.vue";
import type { EditState } from "../features/editing/types.js";

type TEntry = {
  id: number;
  name: string;
  age: number;
  birthday: Date;
  birthtime: string;
  likesPlants: boolean;
  type: "water" | "fire";
};

const data: TEntry[] = [
  {
    id: 1,
    name: "Alice",
    age: 30,
    birthday: new Date("1990-01-01"),
    birthtime: "10:00",
    likesPlants: true,
    type: "fire",
  },
  {
    id: 2,
    name: "Charlie",
    age: 35,
    birthday: new Date("1998-02-11"),
    birthtime: "11:00",
    likesPlants: false,
    type: "water",
  },
  {
    id: 3,
    name: "Bob",
    age: 25,
    birthday: new Date("1995-06-15"),
    birthtime: "11:13",
    likesPlants: false,
    type: "water",
  },
  {
    id: 4,
    name: "Robin",
    age: 28,
    birthday: new Date("2001-02-22"),
    birthtime: "01:00",
    likesPlants: true,
    type: "water",
  },
  {
    id: 5,
    name: "John",
    age: 42,
    birthday: new Date("1997-04-18"),
    birthtime: "12:34",
    likesPlants: true,
    type: "water",
  },
];

const columns: ColumnConfig<TEntry>[] = [
  { key: "id", label: "ID", width: "min-content" },
  { key: "name", label: "Name" },
  { key: "age", label: "Age", type: "number" },
  { key: "birthday", label: "Birthday", type: "date" },
  { key: "birthtime", label: "Birthtime", type: "time" },
  {
    key: "type",
    label: "Type",
    type: {
      name: "select",
      options: {
        options: [
          { label: "💧", value: "water" },
          { label: "🔥", value: "fire" },
        ],
      },
    },
  },
  { key: "likesPlants", label: "Plant lover", type: "boolean", width: "5.375rem" },
];

const isEditable = ref(false);
const editState = ref<EditState<TEntry>>({});
const features = [
  DataGridFeatures.useSorting<TEntry>(),
  DataGridFeatures.useEditing<TEntry>({
    enabled: isEditable,
    editState,
    columns: {
      id: { enabled: false },
    },
  }),
];
</script>

<template>
  <OnyxSwitch v-model="isEditable" label="Is Editable" />
  <OnyxDataGrid headline="Example headline" :columns :data :features />
</template>
