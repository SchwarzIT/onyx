<script setup lang="ts">
import { computed } from "vue";
import type { DataGridEntry, OnyxDataGridProps } from "../../../..";
import { DataGridFeatures, OnyxDataGrid } from "../../../..";
import type { FilterOptions } from "./types";

const { columns, data, filterOptions } = defineProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Pick<OnyxDataGridProps<any, any, any, any>, "columns" | "data"> & {
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
