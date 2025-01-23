<script setup lang="ts">
import { computed, toRefs } from "vue";
import type { DataGridEntry, OnyxDataGridProps } from "../../../..";
import { DataGridFeatures, OnyxDataGrid } from "../../../..";
import type { FilterOptions } from "./types";

const props = defineProps<{
  /**
   * columns
   */
  columns: OnyxDataGridProps["columns"];
  /**
   *
   */
  data: OnyxDataGridProps["data"];
  /**
   * config
   */
  filterOptions?: FilterOptions<DataGridEntry>; // Eigenständiges config-Prop, passe den Typ entsprechend an
}>();
const { columns, data, filterOptions } = toRefs(props);

const withFiltering = computed(() => DataGridFeatures.useFiltering(filterOptions.value));
const features = computed(() => [withFiltering.value]);
</script>

<template>
  <OnyxDataGrid :columns :data :features />
</template>
