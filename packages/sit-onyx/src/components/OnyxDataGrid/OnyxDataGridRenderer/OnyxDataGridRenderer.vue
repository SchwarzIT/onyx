<script lang="ts" setup generic="TEntry extends DataGridEntry, TMetadata extends DataGridMetadata">
import OnyxTable from "../../OnyxTable/OnyxTable.vue";
import type { DataGridEntry, DataGridMetadata } from "../types";
import type { OnyxDataGridRendererProps } from "./types";

const props = defineProps<OnyxDataGridRendererProps<TEntry, TMetadata>>();
</script>

<template>
  <OnyxTable class="onyx-data-grid" v-bind="props">
    <template #head>
      <tr>
        <th v-for="column in props.columns" :key="column.key" v-bind="column.thAttributes">
          <component :is="column.component" v-bind="column.props" />
        </th>
      </tr>
    </template>

    <tr v-for="row in props.rows" :key="row.id">
      <td v-for="column in props.columns" :key="column.key">
        <template v-if="row.cells[column.key]">
          <component :is="row.cells[column.key]!.component" v-bind="row.cells[column.key]!.props" />
        </template>
      </td>
    </tr>
  </OnyxTable>
</template>

<style lang="scss">
@use "../../../styles/mixins/layers.scss";

.onyx-data-grid {
  @include layers.component() {
  }
}
</style>
