<script setup lang="ts">
import pinDisabled from "@sit-onyx/icons/pin-disabled.svg?raw";
import pin from "@sit-onyx/icons/pin.svg?raw";
import trash from "@sit-onyx/icons/trash.svg?raw";
import { h } from "vue";
import {
  createFeature,
  OnyxDataGrid,
  OnyxIcon,
  OnyxMenuItem,
  OnyxSystemButton,
  type ColumnConfig,
} from "../../..";

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

// create a custom reusable data grid feature that you can also e.g. share / re-use in your project
const withCustomFeature = createFeature(() => ({
  name: Symbol("example feature name"),
  header: {
    actions: () => [
      {
        iconComponent: h(OnyxSystemButton, {
          label: "Column options",
          icon: pin,
          color: "medium",
        }),
        menuItems: [
          h(OnyxMenuItem, () => [h(OnyxIcon, { icon: pin }), "Pin column"]),
          h(OnyxMenuItem, () => [h(OnyxIcon, { icon: pinDisabled }), "Unpin column"]),
          h(OnyxMenuItem, () => [h(OnyxIcon, { icon: trash }), "Remove column"]),
        ],
        // always show in flyout menu, even if there is only one feature
        showFlyoutMenu: true,
      },
    ],
  },
}));

const features = [withCustomFeature];
</script>

<template>
  <OnyxDataGrid headline="Example headline" :columns :data :features />
</template>
