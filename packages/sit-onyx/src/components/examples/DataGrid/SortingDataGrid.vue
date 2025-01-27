<script setup lang="ts">
import placeholder from "@sit-onyx/icons/placeholder.svg?raw";
import type { DataGridEntry, NormalizedColumnConfig } from "../../..";
import { DataGridFeatures, OnyxDataGrid, OnyxIcon, OnyxMenuItem, OnyxSystemButton } from "../../..";
import { createFeature } from "../../OnyxDataGrid/features";
import type { SortOptions, SortState } from "../../OnyxDataGrid/features/sorting/types";

// STORY SETUP START
// This section will be removed from the Storybook code example, because it's to complex
import { computed, h, toValue } from "vue";
type TEntry = (typeof data)[number];

const props = defineProps<SortOptions<TEntry>>();

const emit = defineEmits<{
  "update:sortState": [data: SortState<TEntry>];
}>();

const columns = computed(() => toValue(props.columns));

const sortState = computed({
  set: (data: SortState<TEntry>) => emit("update:sortState", data),
  get: () => toValue(props.sortState) ?? { column: undefined, direction: "none" },
});
// STORY SETUP END
// Add your feature configuration here, e.g.:
// const sortState = ref<SortState<TEntry>>({ column: undefined, direction: "none" });
// const columns = ref<SortColumnOptions<TEntry> | undefined>({ name: { enabled: true }, birthday: { enabled: true, sortFunc: (a, b) => a.getTime() - b.getTime() } });

const data = [
  { id: 1, name: "Alice", rank: 30, birthday: new Date("1990-01-01") },
  { id: 2, name: "Charlie", rank: 35, birthday: new Date("1998-02-11") },
  { id: 3, name: "Bob", rank: 25, birthday: new Date("1995-06-15") },
  { id: 4, name: "Robin", rank: 28, birthday: new Date("2001-02-22") },
  { id: 5, name: "John", rank: 42, birthday: new Date("1997-04-18") },
] satisfies DataGridEntry[];

const withSorting = DataGridFeatures.useSorting<TEntry>({ sortState, columns });

// this is just an example feature to demonstrate the menu items of the sorting feature if multiple features with menu items exist
const someOtherFeature = createFeature(() => ({
  name: Symbol("Example feature"),
  watch: [],
  header: {
    actions: (column: NormalizedColumnConfig<TEntry>) => {
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
    :features="[withSorting, someOtherFeature()]"
  />
</template>
