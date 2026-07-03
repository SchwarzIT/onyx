<script setup lang="ts">
import { DataGridFeatures, OnyxDataGrid, OnyxInfoCard, type ColumnConfig } from "sit-onyx";
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

const withExpandableRows = DataGridFeatures.useExpandableRows<Entry>({
  component: (row) =>
    h(
      // Tip: We recommend creating a single custom Vue component for the content
      // and simply render it here and pass the required props.
      OnyxInfoCard,
      { headline: `Slot content for "${row.name}"` },
      () => "Place any components here that fit your needs.",
    ),
});

const features = [withExpandableRows];
</script>

<template>
  <OnyxDataGrid :headline="{ text: 'Example headline', rowCount: true }" :columns :data :features />
</template>
