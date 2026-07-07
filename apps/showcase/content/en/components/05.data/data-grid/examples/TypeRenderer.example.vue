<script setup lang="ts">
import { iconCopy } from "@sit-onyx/icons";
import {
  ColumnGroupConfig,
  ColumnTypesFromFeatures,
  createFeature,
  DataGridFeatures,
  OnyxDataGrid,
  OnyxSystemButton,
  type ColumnConfig,
} from "sit-onyx";
import { computed, h } from "vue";

type Entry = {
  id: number;
  name: string;
};

type CustomColumnTypes = ColumnTypesFromFeatures<[typeof withCustomTypes]>;

const data = computed<Entry[]>(() => {
  return [
    { id: 1, name: "Alice" },
    { id: 2, name: "Charlie" },
    { id: 3, name: "Bob" },
    { id: 4, name: "Robin" },
    { id: 5, name: "John" },
  ];
});

const columns = computed<ColumnConfig<Entry, ColumnGroupConfig, CustomColumnTypes>[]>(() => {
  return [{ key: "name", label: "Name", type: "copy" }];
});

const withCustomTypes = createFeature(() => ({
  name: Symbol("customTypes"),
  typeRenderer: {
    copy: DataGridFeatures.createTypeRenderer({
      cell: {
        // optionally set attributes on the <td> element if needed
        // tdAttributes: {},
        component: ({ modelValue }) => {
          return h("div", { class: "copy-cell" }, [
            h("span", modelValue),
            h(OnyxSystemButton, { label: "Copy", icon: iconCopy }),
          ]);
        },
      },
      // you can also customize the header rendering for the column
      // header: {},
    }),
  },
}));

const features = [withCustomTypes];
</script>

<template>
  <OnyxDataGrid :headline="{ text: 'Example headline', rowCount: true }" :columns :data :features />
</template>

<style lang="scss" scoped>
:deep(.copy-cell) {
  display: flex;
  align-items: center;
  gap: var(--onyx-density-2xs);
}
</style>
