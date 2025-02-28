<script setup lang="ts">
import forward from "@sit-onyx/icons/forward.svg?raw";
import { h } from "vue";
import {
  createFeature,
  OnyxDataGrid,
  OnyxSystemButton,
  type ColumnConfig,
  type ColumnGroupConfig,
  type TypeRenderMap,
} from "../../..";

type TEntry = {
  id: number;
  name: string;
  age: number;
};

type CustomType = "ageIcon" | "detailsButton";

const data: TEntry[] = [
  { id: 1, name: "Alice", age: 10 },
  { id: 2, name: "Charlie", age: 35 },
  { id: 3, name: "Bob", age: 71 },
  { id: 4, name: "Robin", age: 4 },
  { id: 5, name: "John", age: 42 },
];

const columns: ColumnConfig<TEntry, ColumnGroupConfig, CustomType>[] = [
  { key: "name", label: "Name" },
  { key: "age", label: "Age", type: "ageIcon" },
];

// create a custom reusable data grid feature for custom types that you can also e.g. share / re-use in your project to be used in multiple data grids
const withCustomType = createFeature(() => ({
  name: Symbol("example feature name"),
  modifyColumns: {
    func: (columns) => {
      return columns.concat([{ key: "actions", label: "", type: "detailsButton" }]);
    },
  },
  typeRenderer: {
    ageIcon: {
      cell: {
        component: (props) => {
          const age = Number(props.modelValue);
          return age < 15 ? "🐣" : age > 60 ? "🐉" : "🐍";
        },
      },
    },
    detailsButton: {
      cell: {
        tdAttributes: {
          style: { width: "calc(1.5rem + 2 * var(--onyx-density-md))" },
        },
        component: (props) => {
          return h(OnyxSystemButton, {
            label: "Show details",
            icon: forward,
            link: `#some-page-${props.row.id}`,
            onClick: () => alert(JSON.stringify(props)),
            style: { verticalAlign: "middle" },
          });
        },
      },
    },
  } satisfies TypeRenderMap<TEntry, CustomType>,
}));

const features = [withCustomType()];
</script>

<template>
  <OnyxDataGrid :columns :data :features />
</template>
