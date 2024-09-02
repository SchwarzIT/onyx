<script lang="ts" setup generic="TEntry extends TableEntry">
import type { RendererProps, TableEntry } from "./OnyxDataGridRenderer";

const props = defineProps<RendererProps<TEntry>>();
</script>

<template>
  <table>
    <thead>
      <tr>
        <th v-for="col in props.columns" :key="col.key">
          <component :is="col.header" v-bind="col.cellAttrs" />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in props.rows" :key="row.id">
        <td v-for="col in row.cells" :key="col.key">
          <component :is="col.cell" :metadata="col.metadata" :data="col.data" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
