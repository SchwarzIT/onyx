<script setup lang="ts">
import { computed } from "vue";
import type { DataGridEntry, OnyxDataGridProps } from "../../../../index.js";
import { DataGridFeatures, OnyxDataGrid } from "../../../../index.js";
import type { FilterOptions } from "./types.js";

const { columns, data, filterOptions } = defineProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- for simplicity we use any here
  Pick<OnyxDataGridProps<any, any, any, any, any, any>, "columns" | "data"> & {
    /**
     * config
     */
    filterOptions?: FilterOptions<DataGridEntry>;
  }
>();
const withFiltering = computed(() => DataGridFeatures.useFiltering(filterOptions));
const features = computed(() => [withFiltering.value]);
</script>

<template>
  <OnyxDataGrid :columns :data :features />
</template>
