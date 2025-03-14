<script setup lang="ts">
import { computed } from "vue";
import type { OnyxDataGridProps } from "../../../..";
import { DataGridFeatures, OnyxDataGrid } from "../../../..";
import type { HideColumnsOptions } from "./types";

const { columns, data, hideColumnsOptions } = defineProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Pick<OnyxDataGridProps<any, any, any, any, any>, "columns" | "data"> & {
    /**
     * config
     */
    hideColumnsOptions?: HideColumnsOptions;
  }
>();
const withHideColumns = computed(() => DataGridFeatures.useHideColumns(hideColumnsOptions));
const features = computed(() => [withHideColumns.value]);
</script>

<template>
  <OnyxDataGrid :columns :data :features />
</template>
