<script setup lang="ts">
import { DataGridFeatures, OnyxDataGrid } from "../../..";
import type { StickyColumnsOptions } from "../../OnyxDataGrid/features/stickyColumns/types";

// STORY SETUP START
type TEntry = (typeof data)[number];
const props = defineProps<StickyColumnsOptions<TEntry>>();

// STORY SETUP END
// Dynamically generate the column names, ensuring 'moreContent' is numbered
const columns = [
  "name",
  "rank",
  ...Array.from({ length: 10 }, (_, i) => `moreContent${i + 1}`),
] as (keyof (typeof data)[number])[];

type TableData = { id: number; name: string; rank: number; [key: string]: string | number };

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
] satisfies TableData[];

const withStickyColumns = DataGridFeatures.useStickyColumns<TableData>(props);
</script>

<template>
  <OnyxDataGrid :columns="columns" :data="data" :features="[withStickyColumns]" />
</template>
