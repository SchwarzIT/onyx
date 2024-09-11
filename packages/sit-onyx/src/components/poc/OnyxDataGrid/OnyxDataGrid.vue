<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup generic="TEntry extends TableEntry">
import type { OnyxDataGridProps } from "./OnyxDataGrid";
import type { RenderRow, RenderHeader, TableEntry, Metadata } from "./OnyxDataGridRenderer";
import OnyxDataGridRenderer from "./OnyxDataGridRenderer.vue";
import { useTableFeatures, type AnyKey, type NativeProps } from "./OnyxDataGrid.feature";
import { withSortingFeature } from "./features/sorting/sorting";
import { withDraggingFeature } from "./features/reordering/dragging";

import { watch } from "vue";
import { shallowRef } from "vue";
import { withFilteringFeature } from "./features/filtering/filtering";
import { withPaginationFeature } from "./features/pagination/pagination";
import { toValue } from "vue";

const props = defineProps<OnyxDataGridProps<TEntry>>();

const withSorting = withSortingFeature<TEntry>();
const withFiltering = withFilteringFeature<TEntry>();
const withDragging = withDraggingFeature<TEntry>();
const withPagination = withPaginationFeature<TEntry>();

const { enrichTableData, enrichHeaders, provideRootProps, states, afters } = useTableFeatures([
  withDragging,
  withFiltering as any,
  withSorting as any,
  withPagination as any,
]);

const rows = shallowRef<RenderRow<TEntry, object>[]>([]);
const columns = shallowRef<RenderHeader<TEntry>[]>([]);
const tbodyProps = shallowRef<NativeProps>({});
const theadProps = shallowRef<NativeProps>({});

const update = () => {
  rows.value = enrichTableData([...props.data], [...props.columns]);
  columns.value = updateColumns();
  const { theadProps: _theadProps, tbodyProps: _tbodyProps } = provideRootProps();
  tbodyProps.value = _tbodyProps;
  theadProps.value = _theadProps;
};

const updateColumns = () => {
  const _columns = props.columns.map(({ key }) => ({
    key,
    headerProps: {},
    header: () => `${key.toString()}`,
  }));
  return enrichHeaders(_columns);
};

// eslint-disable-next-line no-console
watch([() => props.data, () => props.columns, ...states], () => update(), {
  immediate: true,
  // eslint-disable-next-line no-console
  onTrigger: console.log,
});
</script>

<template>
  <div>
    <OnyxDataGridRenderer
      :rows="rows"
      :columns="columns"
      :tbody-props="tbodyProps"
      :thead-props="theadProps"
    />
    <component
      v-for="a in afters"
      :is="a"
      :key="withPagination.state.map((v) => toValue(v)).join('#')"
    />
    {{}}
  </div>
</template>

<style lang="scss">
.dragover {
  box-shadow: red 0 -2px;
}
</style>
