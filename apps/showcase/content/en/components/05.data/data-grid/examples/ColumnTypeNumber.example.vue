<script setup lang="ts">
import { OnyxDataGrid, type ColumnConfig } from "sit-onyx";
import { computed } from "vue";

type Entry = {
  id: number;
  quantity: number;
  price: number;
};

const data = computed<Entry[]>(() => {
  return [
    { id: 1, quantity: 42, price: 1.99 },
    { id: 2, quantity: 512, price: 259.99 },
    { id: 3, quantity: 1028, price: 6 },
  ];
});

const columns = computed<ColumnConfig<Entry>[]>(() => {
  return [
    { key: "quantity", label: "Quantity", type: "number" },
    {
      key: "price",
      label: "Price",
      type: {
        name: "number",
        options: {
          format: {
            style: "currency",
            currency: "EUR",
          },
        },
      },
    },
  ];
});
</script>

<template>
  <OnyxDataGrid :headline="{ text: 'Example headline', rowCount: true }" :columns :data />
</template>
