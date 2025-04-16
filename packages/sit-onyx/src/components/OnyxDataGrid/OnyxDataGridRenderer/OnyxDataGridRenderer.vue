<script lang="ts" setup generic="TEntry extends DataGridEntry, TMetadata extends DataGridMetadata">
import { computed } from "vue";
import { mergeVueProps } from "../../../utils/attrs";
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

const columnStyle = computed(() => {
  return {
    "--onyx-data-grid-column-count": props.columns.length,
    "--onyx-data-grid-row-count": props.rows.length + 2,
    "--onyx-data-grid-template-columns": props.columns
      .map(({ key, width }) => {
        const name = `--onyx-data-grid-column-${CSS.escape(String(key))}`;
        const value = width ?? "minmax(min-content, 1fr)";
        return `var(${name}, ${value})`;
      })
      .join(" "),
  };
});
</script>

<template>
  <OnyxTable
    class="onyx-data-grid"
    v-bind="props"
    :scroll-container-attrs="mergeVueProps(props.scrollContainerAttrs, { style: columnStyle })"
  >
    <template #head>
      <tr>
        <!-- We set `ref_for` to false, so the refs are not passed as an array  -->
        <th
          v-for="column in props.columns"
          :key="column.key"
          v-bind="column.thAttributes"
          :ref_for="false"
          scope="col"
        >
          <component :is="column.component" />
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

@include layers.override() {
  .onyx-data-grid {
    width: max-content;
    max-width: 100%;

    .onyx-table-wrapper__container {
      display: grid;
      grid-template-columns: var(--onyx-data-grid-template-columns);
      grid-template-rows: repeat(var(--onyx-data-grid-row-count), auto);

      table {
        display: grid;
        grid-template-columns: subgrid;
        grid-template-rows: subgrid;
        grid-column: 1 / -1;
        grid-row: 1 / -1;
      }

      thead {
        display: grid;
        grid-template-columns: subgrid;
        grid-column: 1 / -1;
        grid-row: 1 / 3;
      }

      tbody {
        display: grid;
        grid-column: 1 / -1;
        grid-row: 3 / -1;
        grid-template-columns: subgrid;
        grid-template-rows: subgrid;
      }

      tr {
        display: grid;
        grid-column: 1 / -1;
        grid-template-columns: subgrid;
      }

      // Waiting for :attr support https://developer.mozilla.org/en-US/docs/Web/CSS/attr
      @for $i from 1 through 99 {
        :is(th, td)[colspan="#{$i}"] {
          grid-column: span $i;
        }
      }
    }
  }
}
</style>
