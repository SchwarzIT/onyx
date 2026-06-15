<script setup lang="ts">
import { OnyxDataGrid, type ColumnConfig } from "../../../index.js";

type TEntry = {
  id: number;
  name: string;
  age: number;
  birthday: Date;
  isActive?: boolean;
  favoriteWebsite?: string | { link: string; label: string };
};

const data: TEntry[] = [
  {
    id: 1,
    name: "Alice",
    age: 30,
    birthday: new Date("1990-01-01"),
    isActive: true,
    favoriteWebsite: { link: "https://onyx.schwarz", label: "Onyx" },
  },
  {
    id: 2,
    name: "Charlie",
    age: 35,
    birthday: new Date("1998-02-11"),
    isActive: false,
    favoriteWebsite: "https://onyx.schwarz",
  },
  {
    id: 3,
    name: "Bob",
    age: 25,
    birthday: new Date("1995-06-15"),
    isActive: false,
    favoriteWebsite: "https://onyx.schwarz",
  },
  { id: 4, name: "Robin", age: 28, birthday: new Date("2001-02-22"), isActive: true },
  {
    id: 5,
    name: "John",
    age: 42,
    birthday: new Date("1997-04-18"),
    isActive: false,
    favoriteWebsite: { link: "https://onyx.schwarz", label: "Onyx" },
  },
];

const columns: ColumnConfig<TEntry>[] = [
  { key: "name", label: "Name" },
  { key: "age", label: "Age", type: "number" },
  {
    key: "birthday",
    label: "Birthday",
    type: { name: "date", options: { format: { dateStyle: "full" } } },
  },
  {
    key: "isActive",
    label: "Is active?",
    width: "max-content",
    type: "boolean",
    // you can also pass custom options to the type by passing an object instead of a string
    // type: {
    //   name: "boolean",
    //   options: {
    //     truthy: {
    //       color: "success",
    //     },
    //   },
    // },
  },
  {
    key: "favoriteWebsite",
    label: "Favorite Website",
    type: {
      name: "link",
      options: {
        target: "_blank",
        fallback: "No Favorite",
      },
    },
  },
];
</script>

<template>
  <OnyxDataGrid headline="Example headline" :columns :data />
</template>
