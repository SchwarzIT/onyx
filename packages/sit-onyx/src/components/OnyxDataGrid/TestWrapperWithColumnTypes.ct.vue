<script lang="ts" setup>
import OnyxDataGrid from "./OnyxDataGrid.vue";

const data = [
  {
    id: 1,
    name: "Alice",
    age: 30,
    birthday: new Date("1990-01-01"),
    nickname: "Al",
    favoriteColor: "red",
  },
  {
    id: 2,
    name: "Charlie",
    age: 35,
    birthday: new Date("1998-02-11"),
    nickname: "Lee",
    favoriteColor: "red",
  },
  {
    id: 3,
    name: "Bob",
    age: 25,
    birthday: new Date("1995-06-15"),
    nickname: "Bo",
    favoriteColor: "blue",
  },
  {
    id: 4,
    name: "John",
    age: 28,
    birthday: new Date("2003-04-10"),
    nickname: "Joni",
    favoriteColor: "red",
  },
  {
    id: 5,
    name: "Charlotte",
    age: 28,
    birthday: new Date("2000-11-08"),
    nickname: "Char",
    favoriteColor: "red",
  },
];
</script>

<template>
  <OnyxDataGrid
    :data="data"
    :columns="[
      { key: 'name', type: 'string', columnGroupKey: 'gdpr' },
      'favoriteColor',
      { key: 'age', type: 'number', columnGroupKey: 'derived' },
      { key: 'nickname', type: 'string', columnGroupKey: 'gdpr' },
      { key: 'birthday', type: 'string', columnGroupKey: 'gdpr' },
    ]"
    :column-groups="{
      gdpr: { label: 'Identifiable' },
      derived: { label: 'Derived' },
    }"
  />
</template>
