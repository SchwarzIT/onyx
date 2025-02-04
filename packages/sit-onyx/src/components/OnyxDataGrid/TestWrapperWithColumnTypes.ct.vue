<script lang="ts" setup>
import OnyxDataGrid from "./OnyxDataGrid.vue";

const data = [
  { id: 1, name: "Alice", age: 30, birthday: new Date("1990-01-01") },
  { id: 2, name: "Charlie", age: 35, birthday: new Date("1998-02-11") },
  { id: 3, name: "Bob", age: 25, birthday: new Date("1995-06-15") },
  { id: 4, name: "John", age: 28, birthday: new Date("2003-04-10") },
  { id: 5, name: "Charlotte", age: 28, birthday: new Date("2000-11-08") },
];
</script>

<template>
  <OnyxDataGrid
    :data="data"
    :columns="[
      { key: 'name', type: 'string' },
      { key: 'age', type: 'number' },
      { key: 'birthday', type: 'string' },
    ]"
  />
</template>
