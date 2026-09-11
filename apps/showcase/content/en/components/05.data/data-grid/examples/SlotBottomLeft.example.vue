<script setup lang="ts">
import { createFeature, OnyxDataGrid, type ColumnConfig } from "sit-onyx";
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

const withCustomSlots = createFeature(() => ({
  name: Symbol("customSlots"),
  slots: {
    bottomLeft: (slotContent) => {
      return [
        // make sure to keep existing slot content from other features
        ...slotContent(),
        h("p", { class: "onyx-text--small" }, "Example data grid description."),
      ];
    },
  },
}));

const features = [withCustomSlots];
</script>

<template>
  <OnyxDataGrid :headline="{ text: 'Example headline', rowCount: true }" :columns :data :features />
</template>
