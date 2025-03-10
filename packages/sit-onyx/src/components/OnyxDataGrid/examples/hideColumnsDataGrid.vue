<script setup lang="ts">
import { computed, toValue } from "vue";
import type { DataGridEntry } from "../../..";
import { DataGridFeatures, OnyxDataGrid } from "../../..";

// STORY SETUP START
// This section will be removed from the Storybook code example, because it's to complex
import type { HideColumn, HideColumnsOptions } from "../features/hideColumns/types";

const emit = defineEmits<{
  "update:columns": [columns: HideColumn[]];
}>();

const props = defineProps<HideColumnsOptions>();

const columns = computed({
  set: (columns: HideColumn[]) => emit("update:columns", columns),
  get: () => toValue(props.columns) ?? [],
});
// STORY SETUP END

const data = [
  { id: 1, name: "Alice", rank: 30, birthday: new Date("1990-01-01") },
  { id: 2, name: "Charlie", rank: 35, birthday: new Date("1998-02-11") },
  { id: 3, name: "Bob", rank: 25, birthday: new Date("1995-06-15") },
  { id: 4, name: "Robin", rank: 28, birthday: new Date("2001-02-22") },
  { id: 5, name: "John", rank: 42, birthday: new Date("1997-04-18") },
] satisfies DataGridEntry[];

const withHiddenColumns = DataGridFeatures.useHideColumns({ columns: columns });
</script>

<template>
  <OnyxDataGrid
    :columns="['name', 'rank', 'birthday']"
    :data="data"
    :features="[withHiddenColumns as any]"
  />
</template>
