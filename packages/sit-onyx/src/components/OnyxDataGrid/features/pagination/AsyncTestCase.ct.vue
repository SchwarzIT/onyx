<script setup lang="ts" generic="TEntry extends DataGridEntry">
import { computed, ref, toRef } from "vue";
import type { DataGridEntry, OnyxDataGridProps } from "../../../..";
import { DataGridFeatures, OnyxDataGrid } from "../../../..";
import type { PaginationOptions, PaginationState } from "./types";

const props = defineProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- for simplicity we use any here
  Pick<OnyxDataGridProps<TEntry, any, any, any, any, any>, "data"> & {
    paginationOptions: PaginationOptions;
    loading?: boolean;
  }
>();

const paginationState = ref<PaginationState>({ current: 1, pages: 3, pageSize: 25 });

const withPagination = computed(() =>
  DataGridFeatures.usePagination({
    type: "button",
    loading: toRef(props, "loading"),
    paginationState,
  }),
);
const features = computed(() => [withPagination.value]);
</script>

<template>
  <OnyxDataGrid v-bind="props" :columns="['a']" :features async />
</template>
