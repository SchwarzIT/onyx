<script setup lang="ts" generic="TEntry extends DataGridEntry">
import { computed } from "vue";
import type { DataGridEntry, OnyxDataGridProps } from "../../../..";
import { DataGridFeatures, OnyxDataGrid } from "../../../..";
import type { HideColumnsOptions } from "./types";

const { columns, data, hideColumnsOptions } = defineProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- for simplicity we use any here
  Pick<OnyxDataGridProps<TEntry, any, any, any, any, any>, "columns" | "data"> & {
    /**
     * config
     */
    hideColumnsOptions?: HideColumnsOptions<TEntry>;
  }
>();
const withHideColumns = computed(() => DataGridFeatures.useHideColumns(hideColumnsOptions));
const features = computed(() => [withHideColumns.value]);
</script>

<template>
  <OnyxDataGrid :columns :data :features />
</template>
