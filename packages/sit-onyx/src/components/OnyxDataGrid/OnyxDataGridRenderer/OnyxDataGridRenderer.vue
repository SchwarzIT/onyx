<script lang="ts" setup generic="TEntry extends DataGridEntry, TMetadata extends DataGridMetadata">
import OnyxTable from "../../OnyxTable/OnyxTable.vue";
import type { DataGridEntry, DataGridMetadata } from "../types";
import type { OnyxDataGridRendererProps } from "./types";

const props = withDefaults(defineProps<OnyxDataGridRendererProps<TEntry, TMetadata>>(), {
  // usually we default all boolean props to false (see https://onyx.schwarz/principles/technical-vision.html#component-interface).
  // However, here for striped and withVerticalBorders this makes sense from UX perspective
  striped: true,
  withVerticalBorders: true,
});

defineSlots<{
  /**
   * Optional slot to customize the empty state when no data exist.
   *
   * If unset, the default empty content of OnyxTable will be displayed.
   */
  empty?(): unknown;
}>();
</script>

<template>
  <OnyxTable class="onyx-data-grid" v-bind="props">
    <template #head>
      <tr>
        <th
          v-for="column in props.columns"
          :key="column.key"
          v-bind="column.thAttributes"
          scope="col"
        >
          <component :is="column.component" v-bind="column.props" />
        </th>
      </tr>
    </template>

    <tr v-for="row in props.rows" :key="row.id" v-bind="row.trAttributes">
      <template v-for="column in props.columns" :key="column.key">
        <td v-if="row.cells[column.key]" v-bind="row.cells[column.key]!.tdAttributes">
          <!-- We are safe to use the Non-Null Assertion operator ("!") here, as we check beforehand with "v-if" -->
          <component :is="row.cells[column.key]!.component" v-bind="row.cells[column.key]!.props" />
        </td>
      </template>
    </tr>

    <template #empty>
      <slot name="empty" />
    </template>
  </OnyxTable>
</template>

<style lang="scss">
@use "../../../styles/mixins/layers.scss";

.onyx-data-grid {
  @include layers.component() {
  }
}
</style>
