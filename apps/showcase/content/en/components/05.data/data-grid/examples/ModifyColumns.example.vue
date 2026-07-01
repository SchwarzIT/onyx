<script setup lang="ts">
import { iconPlaceholder } from "@sit-onyx/icons";
import {
  createFeature,
  DataGridFeatures,
  InternalColumnConfig,
  OnyxDataGrid,
  OnyxIconButton,
  type ColumnConfig,
} from "sit-onyx";
import { computed, h } from "vue";

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

const CUSTOM_COLUMN_KEY = Symbol();
const CUSTOM_COLUMN_TYPE = Symbol();

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
    [CUSTOM_COLUMN_TYPE]: DataGridFeatures.createTypeRenderer({
      cell: {
        component: () => {
          return h(OnyxIconButton, {
            icon: iconPlaceholder,
            label: "Example action",
          });
        },
      },
    }),
  },
}));

const features = [withMyFeature];
</script>

<template>
  <OnyxDataGrid :headline="{ text: 'Example headline', rowCount: true }" :columns :data :features />
</template>
