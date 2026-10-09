<script setup lang="ts">
import { iconTrash } from "@sit-onyx/icons";
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
} from "sit-onyx";
import { h, ref } from "vue";

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

const deleteRow = (id: number) => {
  //TODO: Implement your own delete logic here
  data.value = data.value.filter((entry) => entry.id !== id);
};

const resetDataGrid = () => {
  data.value = [...INITIAL_DATA];
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
            label: "Delete row",
            icon: iconTrash,
            onClick: () => deleteRow(props.row.id),
          });
        },
      },
    }),
  } satisfies TypeRenderMap<Entry>,
}));

type CustomColumnTypes = ColumnTypesFromFeatures<typeof withRowActions>;

const columns: ColumnConfig<Entry, ColumnGroupConfig, CustomColumnTypes>[] = [
  { key: "name", label: "Name", type: "string" },
  { key: "age", label: "Age" },
  { key: "birthday", label: "Birthday", type: "date" },
  { key: "id", label: "", type: "deleteButton", width: "min-content" },
];

const features = [withRowActions];
</script>

<template>
  <div class="wrapper">
    <OnyxButton label="Reset DataGrid" @click="resetDataGrid" />
    <OnyxDataGrid headline="Single Row Actions Column" :columns :data :features />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-density-xl);
}
</style>
