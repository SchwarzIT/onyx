<script setup lang="ts">
import { createFeature, OnyxDataGrid, OnyxPagination, type ColumnConfig } from "sit-onyx";
import { computed, h, ref } from "vue";

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

const page = ref(1);

const withCustomSlots = createFeature(() => ({
  name: Symbol("customSlots"),
  watch: [page],
  slots: {
    pagination: (slotContent) => {
      return [
        h(OnyxPagination, {
          modelValue: page.value,
          pages: 42,
          type: "compact",
          "onUpdate:modelValue": (newPage) => (page.value = newPage),
        }),
        // make sure to keep existing slot content from other features
        ...slotContent(),
      ];
    },
  },
}));

const features = [withCustomSlots];
</script>

<template>
  <OnyxDataGrid :headline="{ text: 'Example headline', rowCount: true }" :columns :data :features />
</template>
