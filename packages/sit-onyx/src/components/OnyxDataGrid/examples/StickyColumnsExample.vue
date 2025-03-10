<script setup lang="ts">
import {
  DataGridFeatures,
  OnyxDataGrid,
  type ColumnConfig,
  type ColumnGroupConfig,
} from "../../..";

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

const columns: ColumnConfig<TEntry, ColumnGroupConfig, never>[] = Array.from(
  { length: DUMMY_COLUMN_COUNT },
  (_, index) => {
    const id = index + 1;
    return {
      key: `column-${id}`,
      label: `Column ${id}`,
    };
  },
);

const withStickyColumns = DataGridFeatures.useStickyColumns<TEntry>({
  columns: ["column-1", "column-2"],
});

const features = [withStickyColumns];
</script>

<template>
  <OnyxDataGrid class="data-grid" :columns :data :features />
</template>

<style lang="scss" scoped>
.data-grid {
  :deep(td),
  :deep(th) {
    min-width: 8rem;
  }
}
</style>
