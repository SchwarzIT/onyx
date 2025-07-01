<script setup lang="ts" generic="TEntry extends DataGridEntry">
import { computed } from "vue";
import type { DataGridEntry, OnyxDataGridProps } from "../../../..";
import { DataGridFeatures, OnyxDataGrid } from "../../../..";
import { useFiltering, useSelection } from "../all";
import type { PaginationOptions } from "./types";

const props = defineProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- for simplicity we use any here
  Pick<OnyxDataGridProps<TEntry, any, any, any, any, any>, "data" | "skeleton"> & {
    paginationOptions?: PaginationOptions;
    enabledFeatures?: ("filtering" | "selection")[];
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
  <OnyxDataGrid v-bind="props" :columns="['a']" :features />
</template>
