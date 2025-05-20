<script setup lang="ts">
import forward from "@sit-onyx/icons/forward.svg?raw";
import { h } from "vue";
import { createFeature, OnyxDataGrid, OnyxSystemButton, type TypeRenderMap } from "../../..";
import { createTypeRenderer } from "../features/renderer";

type Entry = {
  id: number;
  name: string;
  age: number;
};

const data: Entry[] = [
  { id: 1, name: "Alice", age: 10 },
  { id: 2, name: "Charlie", age: 35 },
  { id: 3, name: "Bob", age: 71 },
  { id: 4, name: "Robin", age: 4 },
  { id: 5, name: "John", age: 42 },
];

// create a custom reusable data grid feature for custom types that you can also e.g. share / re-use in your project to be used in multiple data grids
const withCustomType = createFeature(() => ({
  name: Symbol("example feature name"),
  typeRenderer: {
    // use the `createTypeRenderer` function to create a type renderer with custom column type options
    // all properties must be optional
    ageIcon: createTypeRenderer<{ offset?: number }, Entry>({
      cell: {
        component: ({ modelValue, metadata }) => {
          // the custom column options are provided via `props.metadata.typeOptions`
          const offset = metadata?.typeOptions?.offset ?? 0;

          const age = Number(modelValue) + offset;
          return age < 15 ? "🐣" : age > 60 ? "🐉" : "🐍";
        },
      },
    }),
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
  } satisfies TypeRenderMap<Entry>,
}));

const features = [withCustomType()];
</script>

<template>
  <OnyxDataGrid
    :columns="[
      { key: 'name', label: 'Name', type: 'string' },
      { key: 'age', label: 'Age', type: { name: 'ageIcon', options: { offset: -5 } } },
      { key: 'id', label: '', type: 'detailsButton' },
    ]"
    :data
    :features
  />
</template>
