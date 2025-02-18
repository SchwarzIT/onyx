<script setup lang="ts">
import placeholder from "@sit-onyx/icons/placeholder.svg?raw";
import type { DataGridEntry } from "../../..";
import {
  createFeature,
  DataGridFeatures,
  OnyxDataGrid,
  OnyxIcon,
  OnyxMenuItem,
  OnyxSystemButton,
} from "../../..";
import type { StickyColumnsOptions } from "../../OnyxDataGrid/features/stickyColumns/types";

// STORY SETUP START
import { h } from "vue";

const props = defineProps<StickyColumnsOptions>();

// STORY SETUP END
// Dynamically generate the column names, ensuring 'moreContent' is numbered
const columns = ["name", "rank", ...Array.from({ length: 10 }, (_, i) => `moreContent${i + 1}`)];

// Generate data dynamically for the `moreContent` columns
const data = [
  {
    id: 1,
    name: "Alice",
    rank: 30,
    ...Object.fromEntries(
      Array.from({ length: 10 }, (_, i) => [`moreContent${i + 1}`, `Content ${i + 1}`]),
    ),
  },
  {
    id: 2,
    name: "Charlie",
    rank: 35,
    ...Object.fromEntries(
      Array.from({ length: 10 }, (_, i) => [`moreContent${i + 1}`, `Content ${i + 1}`]),
    ),
  },
  {
    id: 3,
    name: "Bob",
    rank: 25,
    ...Object.fromEntries(
      Array.from({ length: 10 }, (_, i) => [`moreContent${i + 1}`, `Content ${i + 1}`]),
    ),
  },
  {
    id: 4,
    name: "Robin",
    rank: 28,
    ...Object.fromEntries(
      Array.from({ length: 10 }, (_, i) => [`moreContent${i + 1}`, `Content ${i + 1}`]),
    ),
  },
  {
    id: 5,
    name: "John",
    rank: 42,
    ...Object.fromEntries(
      Array.from({ length: 10 }, (_, i) => [`moreContent${i + 1}`, `Content ${i + 1}`]),
    ),
  },
] satisfies DataGridEntry[];

const withStickyColumns = DataGridFeatures.useStickyColumns(props);

// Example feature to demonstrate menu items
const someOtherFeature = createFeature(() => ({
  name: Symbol("Example feature"),
  header: {
    actions: (column) => {
      if (column.key !== "name") return [];
      return [
        {
          iconComponent: h(OnyxSystemButton, {
            label: "Example feature",
            icon: placeholder,
            color: "medium",
          }),
          menuItems: [
            h(OnyxMenuItem, () => [h(OnyxIcon, { icon: placeholder }), "Example feature"]),
          ],
        },
      ];
    },
  },
}));
</script>

<template>
  <OnyxDataGrid
    :columns="columns"
    :data="data"
    :features="[withStickyColumns, someOtherFeature()]"
  />
</template>
