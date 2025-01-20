<script lang="ts" setup>
import { h } from "vue";
import OnyxMenuItem from "../OnyxNavBar/modules/OnyxMenuItem/OnyxMenuItem.vue";
import OnyxSystemButton from "../OnyxSystemButton/OnyxSystemButton.vue";
import OnyxDataGrid from "./OnyxDataGrid.vue";
import { createFeature } from "./features";

const features = createFeature(() => ({
  name: Symbol("More actions"),
  watch: [],
  header: {
    actions: () => [
      {
        iconComponent: h(OnyxSystemButton, {
          label: "Column options",
          color: "medium",
        }),
        menuItems: [h(OnyxMenuItem, () => ["Pin column"]), h(OnyxMenuItem, () => ["Unpin column"])],
      },
      {
        iconComponent: h(OnyxSystemButton, {
          label: "Column options",
          color: "medium",
        }),
        menuItems: [h(OnyxMenuItem, () => ["Remove column"])],
      },
    ],
  },
}));

const data = [
  { id: 1, name: "Alice", age: 30, birthday: new Date("1990-01-01") },
  { id: 2, name: "Charlie", age: 35, birthday: new Date("1998-02-11") },
  { id: 3, name: "Bob", age: 25, birthday: new Date("1995-06-15") },
  { id: 4, name: "John", age: 28, birthday: new Date("2003-04-10") },
  { id: 5, name: "Charlotte", age: 28, birthday: new Date("2000-11-08") },
];
</script>

<template>
  <OnyxDataGrid :data="data" :columns="['name', 'age', 'birthday']" :features="[features()]" />
</template>
