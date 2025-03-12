<script setup lang="ts">
import type { DataGridEntry } from "../../..";
import { DataGridFeatures, OnyxDataGrid } from "../../..";

// STORY SETUP START
// This section will be removed from the Storybook code example, because it's to complex
import type { ResizingOptions } from "../../OnyxDataGrid/features/resizing/types";

type TEntry = (typeof data)[number];
const props = defineProps<ResizingOptions<TEntry>>();

// STORY SETUP END

const data = [
  { id: 1, name: "Alice", rank: 30, birthday: new Date("1990-01-01") },
  { id: 2, name: "Charlie", rank: 35, birthday: new Date("1998-02-11") },
  { id: 3, name: "Bob", rank: 25, birthday: new Date("1995-06-15") },
  { id: 4, name: "Robin", rank: 28, birthday: new Date("2001-02-22") },
  { id: 5, name: "John", rank: 42, birthday: new Date("1997-04-18") },
] satisfies DataGridEntry[];

const withResizing = DataGridFeatures.useResizing(props);
</script>

<template>
  <OnyxDataGrid :columns="['name', 'rank', 'birthday']" :data="data" :features="[withResizing]" />
</template>
