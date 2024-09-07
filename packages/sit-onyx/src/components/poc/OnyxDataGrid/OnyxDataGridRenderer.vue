<script lang="ts" setup generic="TEntry extends TableEntry, TMetadata extends object">
import type { RendererProps, TableEntry } from "./OnyxDataGridRenderer";

const props = defineProps<RendererProps<TEntry, TMetadata>>();
</script>

<template>
  <table>
    <thead v-bind="props.theadProps">
      <tr>
        <th v-for="col in props.columns" :key="col.key">
          <component :is="col.header" v-bind="col.headerProps" />
        </th>
      </tr>
    </thead>
    <tbody v-bind="props.tbodyProps">
      <tr v-for="row in props.rows" :key="row.id" v-bind="row.trProps">
        <td v-for="col in props.columns" :key="col.key" v-bind="row.cells[col.key].tdProps">
          <component :is="row.cells[col.key].is" v-bind="row.cells[col.key].props" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
