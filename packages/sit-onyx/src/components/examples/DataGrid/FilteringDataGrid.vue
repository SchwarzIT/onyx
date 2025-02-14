<script setup lang="ts">
import placeholder from "@sit-onyx/icons/placeholder.svg?raw";
import type { DataGridEntry } from "../../..";
import { DataGridFeatures, OnyxDataGrid, OnyxIcon, OnyxMenuItem, OnyxSystemButton } from "../../..";
import { createFeature } from "../../OnyxDataGrid/features";

// STORY SETUP START
// This section will be removed from the Storybook code example, because it's to complex
import { h } from "vue";
import type { FilterOptions } from "../../OnyxDataGrid/features/filtering/types";
type TEntry = (typeof data)[number];

const props = defineProps<FilterOptions<TEntry>>();

const data = [
  { id: 1, name: "Alice", rank: 30, birthday: new Date("1990-01-01") },
  { id: 2, name: "Charlie", rank: 35, birthday: new Date("1998-02-11") },
  { id: 3, name: "Bob", rank: 25, birthday: new Date("1995-06-15") },
  { id: 4, name: "Robin", rank: 28, birthday: new Date("2001-02-22") },
  { id: 5, name: "John", rank: 42, birthday: new Date("1997-04-18") },
] satisfies DataGridEntry[];

const withFiltering = DataGridFeatures.useFiltering<TEntry>(props);

// this is just an example feature to demonstrate the menu items of the filtering feature if multiple features with menu items exist
const someOtherFeature = createFeature(() => ({
  name: Symbol("Example feature"),
  watch: [],
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
    :columns="['name', 'rank', 'birthday']"
    :data="data"
    :features="[withFiltering, someOtherFeature()]"
  />
</template>
