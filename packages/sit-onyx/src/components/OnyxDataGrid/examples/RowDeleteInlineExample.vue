<script setup lang="ts">
import { iconTrash } from "@sit-onyx/icons";
import { computed, h, ref } from "vue";
import {
  createFeature,
  DataGridFeatures,
  type InternalColumnConfig,
  OnyxDataGrid,
  OnyxIconButton,
  type ColumnConfig,
  useToast,
  OnyxToast,
} from "../../../index.js";

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

const toast = useToast();
const CUSTOM_COLUMN_KEY = Symbol();
const CUSTOM_COLUMN_TYPE = Symbol();

const handleDeleteRow = (rowId: Entry["id"]) => {
  const deletedRow = data.value.find((row) => row.id === rowId);

  data.value = data.value.filter((row) => row.id !== rowId);

  toast.show({
    headline: "Delete Row",
    description: `Row "${deletedRow?.name}" deleted successfully.`,
    color: "danger",
  });
};

const withMyFeature = createFeature(() => ({
  name: Symbol("myFeature"),
  modifyColumns: {
    // optionally set the order to define if the modification should be done before/after other features
    // order: -1,
    func: (columns) => {
      return [
        ...columns,
        {
          key: CUSTOM_COLUMN_KEY,
          label: "Actions",
          width: "max-content",
          type: {
            name: CUSTOM_COLUMN_TYPE,
          },
        },
        // type-cast is needed because we are adding a new column that does not exist in
        // our original entry / data type
      ] as InternalColumnConfig<Entry>[];
    },
  },
  typeRenderer: {
    [CUSTOM_COLUMN_TYPE]: DataGridFeatures.createTypeRenderer<object, Entry>({
      cell: {
        component: ({ row }) => {
          return h(OnyxIconButton, {
            label: "Delete",
            icon: iconTrash,
            color: "danger",
            density: "compact",
            onClick: () => handleDeleteRow(row.id),
          });
        },
      },
    }),
  },
}));

const features = [withMyFeature];
</script>

<template>
  <OnyxDataGrid headline="Example headline" :columns :data :features />
  <OnyxToast />
</template>
