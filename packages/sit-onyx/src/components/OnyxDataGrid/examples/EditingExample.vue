<script setup lang="ts">
import { computed, ref } from "vue";
import { DataGridFeatures, OnyxDataGrid, type ColumnConfig } from "../../../index.js";
import OnyxButton from "../../OnyxButton/OnyxButton.vue";
import OnyxCodeTab from "../../OnyxCodeTab/OnyxCodeTab.vue";
import OnyxCodeTabs from "../../OnyxCodeTabs/OnyxCodeTabs.vue";
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
  DataGridFeatures.useEditing<TEntry>({
    enabled: isEditable,
    mode: "manual",
    editState,
    columns: {
      id: { enabled: false },
    },
  }),
];

const log = computed(() => JSON.stringify(editState.value, null, 2));

const reset = () => {
  editState.value = {};
};
</script>

<template>
  <div class="example">
    <div class="options">
      <OnyxButton label="Reset Changes" @click="reset" />
      <OnyxSwitch v-model="isEditable" label="Is Editable" />
    </div>
    <OnyxDataGrid :columns :data :features />

    <OnyxCodeTabs model-value="log">
      <OnyxCodeTab value="log" label="Edit State" language="json" :code="log"></OnyxCodeTab>
    </OnyxCodeTabs>
  </div>
</template>

<style scoped>
.example {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-density-sm);
  max-width: 64rem;

  .options {
    display: flex;
  }
}
</style>
