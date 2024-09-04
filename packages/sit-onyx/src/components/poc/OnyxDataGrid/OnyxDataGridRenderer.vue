<script lang="ts" setup generic="TEntry extends TableEntry, TKey extends keyof TEntry">
import type { RendererProps, TableEntry } from "./OnyxDataGridRenderer";

const props = defineProps<RendererProps<TEntry>>();
</script>

<template>
  <table>
    <thead>
      <tr>
        <th v-for="col in props.columns" :key="col.key">
          <component :is="col.header" v-bind="col.headerProps" />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in props.rows" :key="row.id">
        <td v-for="col in props.columns" :key="col.key">
          <component :is="row.cells[col.key].is" v-bind="row.cells[col.key]" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
