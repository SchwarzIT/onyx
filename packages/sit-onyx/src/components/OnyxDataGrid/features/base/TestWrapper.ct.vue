<script setup lang="ts">
import { computed } from "vue";
import type { OnyxDataGridProps } from "../../../..";
import { OnyxDataGrid } from "../../../..";
import { useFiltering, usePagination } from "../all.js";

const props = defineProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- for simplicity we use any here
  Omit<OnyxDataGridProps<any, any, any, any, any, any>, "features"> & {
    enabledFeatures?: ("filtering" | "pagination")[];
  }
>();

const features = [
  useFiltering({
    enabled: computed(() => props.enabledFeatures?.includes("filtering") ?? false),
  }),
  usePagination({
    enabled: computed(() => props.enabledFeatures?.includes("pagination") ?? false),
  }),
];
</script>

<template>
  <OnyxDataGrid v-bind="props" :features />
</template>
