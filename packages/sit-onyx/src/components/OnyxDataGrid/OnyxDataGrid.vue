<script
  setup
  lang="ts"
  generic="TEntry extends DataGridEntry, TFeatures extends DataGridFeature<TEntry, symbol>[] | []"
>
import { ref, toRefs, watch, type Ref } from "vue";
import {
  OnyxDataGridRenderer,
  type DataGridEntry,
  type DataGridMetadata,
  type DataGridRendererColumn,
  type DataGridRendererRow,
  type OnyxDataGridProps,
} from "../..";
import { useDataGridFeatures, type DataGridFeature } from "./features";

const props = withDefaults(defineProps<OnyxDataGridProps<TEntry, TFeatures>>(), {
  features: () => [] as TFeatures,
});

// eslint-disable-next-line vue/no-setup-props-reactivity-loss
const { watchSources, createRendererRows, createRendererColumns } = useDataGridFeatures<
  TEntry,
  TFeatures
>(props.features);

// Using Ref types to avoid `UnwrapRef` issues
const renderColumns: Ref<DataGridRendererColumn<TEntry, object>[]> = ref([]);
const renderRows: Ref<DataGridRendererRow<TEntry, DataGridMetadata>[]> = ref([]);

const { columns, data } = toRefs(props);

watch(
  [columns, data, ...watchSources],
  () => {
    renderColumns.value = createRendererColumns(columns.value);
    renderRows.value = createRendererRows(data.value, columns.value);
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <OnyxDataGridRenderer :columns="renderColumns" :rows="renderRows" />
</template>
