<script setup lang="ts">
import { iconMinus, iconPlaceholder, iconPlus } from "@sit-onyx/icons";
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
const withCustomActions = createFeature(() => ({
  name: Symbol("custom actions feature"),
  actions: [
    {
      label: "Add New Entry",
      icon: iconPlus,
      group: { name: "main", order: 1 },
      onClick: () => {},

      color: "neutral",
    },
    {
      label: "Remove Entry",
      icon: iconMinus,
      color: "neutral",
      group: "main",
      onClick: () => {},
    },

    {
      label: "Others",
      icon: iconPlaceholder,
      onClick: () => {},
    },
    {
      label: "Others",
      icon: iconPlaceholder,
      onClick: () => {},
    },
    {
      displayAs: "button",
      label: "Button",
      order: -1,
      mode: "plain",
      onClick: () => {},
    },
  ],
}));

const features = [withCustomActions, withPagination];
</script>

<template>
  <OnyxDataGrid headline="Example headline" :columns :data :features />
</template>
