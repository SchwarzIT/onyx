<script lang="ts" setup generic="TEntry extends TableEntry">
import { computed } from "vue";
import type { OnyxDataGridProps } from "./OnyxDataGrid";
import type { RenderRow, RenderColumn, TableEntry, RenderCell } from "./OnyxDataGridRenderer";
import OnyxDataGridRenderer from "./OnyxDataGridRenderer.vue";

const props = defineProps<OnyxDataGridProps<TEntry>>();

const rows = computed<RenderRow<TableEntry>[]>(() =>
  props.data.map(({ id, ...rest }) => ({
    id,
    rowAttrs: {},
    entries: Object.fromEntries([
      ["id", { key: "id", data: id, cell: () => `${id}` }],
      ...Object.entries(rest).map(([key, data]) => [
        key,
        {
          key,
          data,
          cell: () => `${data}`,
        } satisfies RenderCell<TableEntry>,
      ]),
    ]),
  })),
);

const columns = computed<RenderColumn<TableEntry>[]>(() => {
  const firstEntry = props.data.at(0);
  if (!firstEntry) {
    return [];
  }
  return Object.entries(firstEntry).map(([key]) => ({
    key,
    cellAttrs: {},
    header: () => `${key}`,
  }));
});
</script>

<template>
  <OnyxDataGridRenderer :rows="rows" :columns="columns" />
</template>
