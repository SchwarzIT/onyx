<script setup lang="ts">
import { h } from "vue";
import {
  createFeature,
  DataGridFeatures,
  OnyxDataGrid,
  type ColumnConfig,
} from "../../../index.js";

type TEntry = {
  id: number;
  name: string;
  age: number;
  birthday: Date;
};

const data: TEntry[] = [
  { id: 1, name: "Alice", age: 30, birthday: new Date("1990-01-01") },
  { id: 2, name: "Charlie", age: 35, birthday: new Date("1998-02-11") },
  { id: 3, name: "Bob", age: 25, birthday: new Date("1995-06-15") },
  { id: 4, name: "Robin", age: 28, birthday: new Date("2001-02-22") },
  { id: 5, name: "John", age: 42, birthday: new Date("1997-04-18") },
];

const columns: ColumnConfig<TEntry>[] = [
  { key: "name", label: "Name" },
  { key: "age", label: "Age", type: "number" },
  { key: "birthday", label: "Birthday", type: "date" },
];

/**
 * @see https://storybook.onyx.schwarz/?path=/story/data-datagrid-features--pagination
 */
const withPagination = DataGridFeatures.usePagination({ pageSize: 2 });

// create a custom reusable data grid feature that you can also e.g. share / re-use in your project
const withCustomSlots = createFeature(() => ({
  name: Symbol("custom slots feature"),
  slots: {
    // you could also define the headline here but please note that the OnyxDataGrid supports a native "headline" property.
    bottomLeft: (slotContent) => [
      h("span", "Example bottom left content"),
      // using slotContent here to ensure that if multiple feature define the same slot, they will be merged
      ...slotContent(),
    ],
    // you could also define pagination here but it is strongly advised to use the built-in "usePagination" feature instead
  },
}));

const features = [withCustomSlots, withPagination];
</script>

<template>
  <OnyxDataGrid headline="Example headline" :columns :data :features />
</template>
