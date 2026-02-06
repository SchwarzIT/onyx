<script setup lang="ts">
import {
  DataGridFeatures,
  OnyxDataGrid,
  type ColumnConfig,
  type ColumnGroupConfig,
} from "../../../index.js";

type TEntry = {
  [key in `column-${number}`]?: string;
} & { id: number };

const DUMMY_COLUMN_COUNT = 24;

// generate some dummy data/columns
const data: TEntry[] = Array.from({ length: 8 }, (_, index) => {
  const id = index + 1;
  return {
    id,
    ...Object.fromEntries(
      Array.from({ length: DUMMY_COLUMN_COUNT }, (_, columnIndex) => {
        const columnId = columnIndex + 1;
        return [`column-${columnId}`, `Content ${columnId}`];
      }),
    ),
  } as TEntry;
});

const columnGroups = {
  group1: { label: "Group 1" },
  group2: { label: "Group 2" },
} satisfies ColumnGroupConfig;

type TColumnGroups = typeof columnGroups;

const columns: ColumnConfig<TEntry, TColumnGroups>[] = Array.from(
  { length: DUMMY_COLUMN_COUNT },
  (_, index) => {
    const id = index + 1;
    const columnGroupKey = (index < 4 ? "group1" : "group2") as keyof TColumnGroups;

    return {
      key: `column-${id}`,
      label: `Column ${id}`,
      width: "8rem",
      columnGroupKey,
    };
  },
);

const withStickyColumns = DataGridFeatures.useStickyColumns<TEntry>({
  columns: ["column-1", "column-2"],
});

const features = [withStickyColumns];
</script>

<template>
  <OnyxDataGrid headline="Example headline" :columns :data :features :column-groups />
</template>
