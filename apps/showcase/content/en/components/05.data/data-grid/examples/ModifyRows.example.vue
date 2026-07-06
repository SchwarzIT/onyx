<script setup lang="ts">
import {
  createFeature,
  DataGridEntry,
  DataGridFeature,
  DataGridRowOptionsSymbol,
  mergeVueProps,
  OnyxDataGrid,
  type ColumnConfig,
} from "sit-onyx";
import { computed } from "vue";

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

const withMyFeature: DataGridFeature<Entry> = createFeature(() => ({
  name: Symbol("myFeature"),
  mutation: {
    // optionally set the order to define if the modification should be done before/after other features
    // order: -1,
    func: (rows) => {
      return rows.map((row) => {
        const currentAttributes =
          (row as DataGridEntry)[DataGridRowOptionsSymbol]?.trAttributes ?? {};

        return {
          ...row,
          [DataGridRowOptionsSymbol]: {
            // make sure to merge with existing attributes, otherwise attributes added by other features will be overridden
            trAttributes: mergeVueProps(currentAttributes, {
              class: { "row--highlighted": row.name === "Charlie" },
            } satisfies typeof currentAttributes),
          },
        } satisfies typeof row & DataGridEntry;
      });
    },
  },
}));

const features = [withMyFeature];
</script>

<template>
  <OnyxDataGrid :headline="{ text: 'Example headline', rowCount: true }" :columns :data :features />
</template>

<style lang="scss" scoped>
:deep(.row--highlighted) {
  --onyx-table-row-background-color: var(--onyx-color-base-primary-100);
}
</style>
