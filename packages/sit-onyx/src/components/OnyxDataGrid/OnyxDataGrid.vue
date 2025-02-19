<script
  setup
  lang="ts"
  generic="
    TEntry extends DataGridEntry,
    TTypeRenderer extends TypeRenderMap<TEntry>,
    TColumnGroup extends ColumnGroupConfig,
    TFeatureName extends symbol,
    TFeatures extends DataGridFeature<TEntry, TTypeRenderer, TFeatureName>[] | []
  "
>
import { ref, toRefs, watch, type Ref, type WatchHandle } from "vue";
import { injectI18n } from "../../i18n";
import type { TableColumnGroup } from "../OnyxTable/types";
import {
  useDataGridFeatures,
  type ColumnGroupConfig,
  type DataGridFeature,
  type TypeRenderMap,
} from "./features";
import OnyxDataGridRenderer from "./OnyxDataGridRenderer/OnyxDataGridRenderer.vue";
import type { DataGridRendererColumn, DataGridRendererRow } from "./OnyxDataGridRenderer/types";
import type { DataGridEntry, DataGridMetadata, OnyxDataGridProps } from "./types";

const props = withDefaults(
  defineProps<OnyxDataGridProps<TEntry, TColumnGroup, TTypeRenderer, TFeatureName, TFeatures>>(),
  {
    features: () => [] as TFeatures,
  },
);

const i18n = injectI18n();

defineSlots<{
  /**
   * Optional slot to customize the empty state when no data exist.
   *
   * If unset, the default empty content of OnyxTable will be displayed.
   */
  empty?(): unknown;
}>();

// Using Ref types to avoid `UnwrapRef` issues
const renderColumns: Ref<DataGridRendererColumn<TEntry>[]> = ref([]);
const renderRows: Ref<DataGridRendererRow<TEntry, DataGridMetadata>[]> = ref([]);
const rendererColumnGroups: Ref<TableColumnGroup[] | undefined> = ref();

const { columns, data, features, columnGroups } = toRefs(props);

/**
 * Function to be able to reset the watcher in case of the features being updated.
 */
let disposeWatcher: WatchHandle | undefined;
const createFeatureBuilderWatcher = ({
  createRendererColumns,
  createRendererRows,
  watchSources,
  createRendererColumnGroups,
}: ReturnType<
  typeof useDataGridFeatures<TEntry, TFeatureName, TTypeRenderer, TColumnGroup, TFeatures>
>) => {
  return watch(
    [data, columns, columnGroups, i18n.locale, i18n.t, ...watchSources],
    () => {
      renderColumns.value = createRendererColumns();
      renderRows.value = createRendererRows(data.value);
      rendererColumnGroups.value = createRendererColumnGroups();
    },
    { immediate: true, deep: true },
  );
};

watch(
  features,
  () => {
    const featureBuilder = useDataGridFeatures(features.value, {
      i18n,
      columnConfig: columns,
      columnGroups,
    });
    disposeWatcher?.();
    disposeWatcher = createFeatureBuilderWatcher(featureBuilder);
  },
  { immediate: true },
);
</script>

<template>
  <OnyxDataGridRenderer
    :column-groups="rendererColumnGroups"
    :columns="renderColumns"
    :rows="renderRows"
  >
    <template #empty>
      <slot name="empty" />
    </template>
  </OnyxDataGridRenderer>
</template>
