<script setup lang="ts">
import {
  ColumnGroupConfig,
  ColumnTypesFromFeatures,
  createFeature,
  DataGridFeatures,
  OnyxDataGrid,
  OnyxLink,
  type ColumnConfig,
} from "sit-onyx";
import { computed, h } from "vue";

type Entry = {
  id: number;
  name: string;
  email: string;
};

type CustomColumnTypes = ColumnTypesFromFeatures<[typeof withCustomTypes]>;

const data = computed<Entry[]>(() => {
  return [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Charlie", email: "charlie@example.com" },
    { id: 3, name: "Bob", email: "bob@example.com" },
    { id: 4, name: "Robin", email: "robin@example.com" },
    { id: 5, name: "John", email: "john@example.com" },
  ];
});

const columns = computed<ColumnConfig<Entry, ColumnGroupConfig, CustomColumnTypes>[]>(() => {
  return [{ key: "name", label: "Name", type: "customName" }];
});

const withCustomTypes = createFeature(() => ({
  name: Symbol("customTypes"),
  typeRenderer: {
    customName: DataGridFeatures.createTypeRenderer<object, Entry>({
      cell: {
        component: ({ row }) => {
          return h(OnyxLink, { href: `mailto:${row.email}` }, () => row.name);
        },
      },
    }),
  },
}));

const features = [withCustomTypes];
</script>

<template>
  <OnyxDataGrid :headline="{ text: 'Example headline', rowCount: true }" :columns :data :features />
</template>
