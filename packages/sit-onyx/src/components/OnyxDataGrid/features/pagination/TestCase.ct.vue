<script setup lang="ts" generic="TEntry extends DataGridEntry">
import { computed } from "vue";
import type { ColumnConfig, DataGridEntry, OnyxDataGridProps } from "../../../../index.js";
import { DataGridFeatures, OnyxDataGrid } from "../../../../index.js";
import { useFiltering, useSelection } from "../all.js";
import type { PaginationOptions } from "./types.js";

const props = defineProps<
  Pick<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- for simplicity we use any here
    OnyxDataGridProps<TEntry, any, any, any, any, any>,
    "data" | "skeleton" | "columnGroups"
  > & {
    paginationOptions?: PaginationOptions;
    enabledFeatures?: ("filtering" | "selection")[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- for simplicity we use any here
    columns?: ColumnConfig<any, any, any>[];
  }
>();

const withPagination = computed(() => DataGridFeatures.usePagination(props.paginationOptions));
const features = computed(() => [
  withPagination.value,
  useFiltering<TEntry>({
    enabled: computed(() => props.enabledFeatures?.includes("filtering") ?? false),
  }),
  useSelection<TEntry>({
    enabled: computed(() => props.enabledFeatures?.includes("selection") ?? false),
  }),
]);
</script>

<template>
  <OnyxDataGrid v-bind="props" :columns="props.columns || ['a']" :features />
</template>
