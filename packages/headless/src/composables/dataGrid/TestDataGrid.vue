<script lang="ts" setup>
import { createDataGrid } from "./createDataGrid.js";

const cols = ["a", "b", "c", "d", "e"];
const data = Array.from({ length: 20 }, (_) => [...cols]);

const {
  elements: { table, td, tr, label },
} = createDataGrid({});
</script>

<template>
  <table v-bind="table">
    <tr v-for="(row, i) in data" :key="i" v-bind="tr({ rowId: i })">
      <td
        v-for="(col, j) in row"
        :key="j"
        v-bind="td({ rowId: i.toString(), colKey: j.toString() })"
      >
        {{ col }}
      </td>
    </tr>
    <caption v-bind="label">
      Table with Data
    </caption>
  </table>
</template>
