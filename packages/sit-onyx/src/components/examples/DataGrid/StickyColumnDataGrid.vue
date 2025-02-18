<script setup lang="ts">
import placeholder from "@sit-onyx/icons/placeholder.svg?raw";
import type { DataGridEntry } from "../../..";
import {
  createFeature,
  DataGridFeatures,
  OnyxDataGrid,
  OnyxIcon,
  OnyxMenuItem,
  OnyxSystemButton,
} from "../../..";
import type { StickyColumnsOptions } from "../../OnyxDataGrid/features/stickyColumns/types";

// STORY SETUP START
// This section will be removed from the Storybook code example, because it's to complex
import { h } from "vue";

const props = defineProps<StickyColumnsOptions>();

// STORY SETUP END
// Add your feature configuration here, e.g.:
// const sortState = ref<SortState<TEntry>>({ column: undefined, direction: "none" });
// const columns = ref<SortColumnOptions<TEntry> | undefined>({ name: { enabled: true }, birthday: { enabled: true, sortFunc: (a, b) => a.getTime() - b.getTime() } });

const data = [
  {
    id: 1,
    name: "Alice",
    rank: 30,
    moreContent: "Content",
  },
  {
    id: 2,
    name: "Charlie",
    rank: 35,
    moreContent: "Content",
  },
  {
    id: 3,
    name: "Bob",
    rank: 25,
    moreContent: "Content",
  },
  {
    id: 4,
    name: "Robin",
    rank: 28,
    moreContent: "Content",
  },
  {
    id: 5,
    name: "John",
    rank: 42,
    moreContent: "Content",
  },
] satisfies DataGridEntry[];

const withStickyColumns = DataGridFeatures.useStickyColumns(props);

// this is just an example feature to demonstrate the menu items of the sorting feature if multiple features with menu items exist
const someOtherFeature = createFeature(() => ({
  name: Symbol("Example feature"),
  header: {
    actions: (column) => {
      if (column.key !== "name") return [];
      return [
        {
          iconComponent: h(OnyxSystemButton, {
            label: "Example feature",
            icon: placeholder,
            color: "medium",
          }),
          menuItems: [
            h(OnyxMenuItem, () => [h(OnyxIcon, { icon: placeholder }), "Example feature"]),
          ],
        },
      ];
    },
  },
}));
</script>

<template>
  <OnyxDataGrid
    :columns="[
      'name',
      'rank',
      'moreContent',
      'moreContent',
      'moreContent',
      'moreContent',
      'moreContent',
      'moreContent',
      'moreContent',
      'moreContent',
      'moreContent',
      'moreContent',
      'moreContent',
      'moreContent',
      'moreContent',
      'moreContent',
    ]"
    :data="data"
    :features="[withStickyColumns, someOtherFeature()]"
  />
</template>
