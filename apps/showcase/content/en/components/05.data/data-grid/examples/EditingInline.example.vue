<script setup lang="ts">
import { iconDisc, iconEdit, iconX } from "@sit-onyx/icons";
import {
  createFeature,
  DataGridFeatures,
  OnyxDataGrid,
  SelectOption,
  type ColumnConfig,
} from "sit-onyx";
import { computed, ref } from "vue";

type Entry = {
  id: number;
  name: string;
  age: number;
  birthday: Date;
  time: string;
  role: UserRole;
  active?: boolean;
};

type UserRole = "user" | "editor" | "admin";

const data = ref<Entry[]>([
  {
    id: 1,
    name: "Alice",
    age: 30,
    birthday: new Date("1990-01-01"),
    time: "10:00",
    active: true,
    role: "user",
  },
  {
    id: 4,
    name: "Robin",
    age: 28,
    birthday: new Date("2001-02-22"),
    time: "12:30",
    active: true,
    role: "editor",
  },
  {
    id: 5,
    name: "John",
    age: 42,
    birthday: new Date("1997-04-18"),
    time: "09:00",
    active: false,
    role: "admin",
  },
]);

const columns = computed<ColumnConfig<Entry>[]>(() => {
  return [
    { key: "name", label: "Name" },
    { key: "age", label: "Age", type: "number" },
    { key: "birthday", label: "Birthday", type: "date" },
    { key: "time", label: "Time", type: "time" },
    { key: "active", label: "Active?", type: "boolean" },
    {
      key: "role",
      label: "User role",
      type: {
        name: "select",
        options: {
          options: [
            { label: "User", value: "user" },
            { label: "Administrator", value: "admin" },
            { label: "Editor", value: "editor" },
          ] satisfies SelectOption<UserRole>[],
        },
      },
    },
  ];
});

const isEditable = ref(false);
const editState = ref<DataGridFeatures.EditState<Entry>>({});

const withEditing = DataGridFeatures.useEditing<Entry>({
  // options here...
  mode: "manual",
  enabled: isEditable,
  editState,
});

// The logic when and how the editing is enabled, saved and cancelled is completely up to the developer.
// In this example we use a custom feature to add buttons to interact with the feature
const withEditingActions = createFeature(() => ({
  name: Symbol("editingActions"),
  watch: [isEditable],
  actions: () => {
    if (isEditable.value) {
      return [
        {
          label: "Cancel",
          displayAs: "button",
          color: "neutral",
          mode: "plain",
          icon: iconX,
          onClick: handleCancel,
        },
        {
          label: "Save",
          displayAs: "button",
          icon: iconDisc,
          onClick: handleSave,
        },
      ];
    }

    return [
      {
        label: "Edit",
        displayAs: "button",
        icon: iconEdit,
        onClick: () => (isEditable.value = true),
      },
    ];
  },
}));

const features = [withEditing, withEditingActions];

const handleSave = () => {
  for (const id in editState.value) {
    const changes = editState.value[id];

    const index = data.value.findIndex((row) => row.id === Number.parseInt(id));
    if (index === -1) continue;

    // the edit state only includes actually changed data so we need to make sure keep
    // all previous data
    data.value[index] = { ...data.value[index], ...changes };
  }

  isEditable.value = false;
};

const handleCancel = () => {
  editState.value = {};
  isEditable.value = false;
};
</script>

<template>
  <OnyxDataGrid :headline="{ text: 'Example headline', rowCount: true }" :columns :data :features />
</template>
