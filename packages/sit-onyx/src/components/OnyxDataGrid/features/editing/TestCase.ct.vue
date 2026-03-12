<script setup lang="ts">
import { computed } from "vue";
import type { DataGridEntry, OnyxDataGridProps } from "../../../../index.js";
import { DataGridFeatures, OnyxDataGrid } from "../../../../index.js";
import type { EditOptions } from "./types.js";

const { columns, data, editOptions } = defineProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- for simplicity we use any here
  Pick<OnyxDataGridProps<any, any, any, any, any, any>, "columns" | "data"> & {
    editOptions?: EditOptions<DataGridEntry>;
  }
>();

const withEditing = computed(() => DataGridFeatures.useEditing(editOptions));
const features = computed(() => [withEditing.value]);
</script>

<template>
  <OnyxDataGrid :columns :data :features />
</template>
