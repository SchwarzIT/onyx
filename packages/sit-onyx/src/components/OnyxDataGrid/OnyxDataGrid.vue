<script
  setup
  lang="ts"
  generic="
    TEntry extends DataGridEntry,
    TTypeRenderer extends TypeRender<TEntry>,
    TFeatureName extends symbol,
    TFeatures extends DataGridFeature<TEntry, TTypeRenderer, TFeatureName>[] | []
  "
>
import { ref, toRefs, watch, type Ref, type WatchHandle } from "vue";
import { injectI18n } from "../../i18n";
import { useDataGridFeatures, type DataGridFeature, type TypeRender } from "./features";
import OnyxDataGridRenderer from "./OnyxDataGridRenderer/OnyxDataGridRenderer.vue";
import type { DataGridRendererColumn, DataGridRendererRow } from "./OnyxDataGridRenderer/types";
import type { DataGridEntry, DataGridMetadata, OnyxDataGridProps } from "./types";

const props = withDefaults(
  defineProps<OnyxDataGridProps<TEntry, TTypeRenderer, TFeatureName, TFeatures>>(),
  {
    features: () => [] as TFeatures,
  },
);

const { t } = injectI18n();

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

const { columns, data, features } = toRefs(props);

/**
 * Function to be able to reset the watcher in case of the features being updated.
 */
let featureBuilderWatchHandle: WatchHandle | undefined;
const createFeatureBuilderWatcher = ({
  createRendererColumns,
  createRendererRows,
  watchSources,
}: ReturnType<typeof useDataGridFeatures<TEntry, TFeatureName, TTypeRenderer, TFeatures>>) => {
  return watch(
    [data, t, ...watchSources],
    () => {
      renderColumns.value = createRendererColumns();
      renderRows.value = createRendererRows(data.value);
    },
    { immediate: true, deep: true },
  );
};

watch(
  features,
  () => {
    const featureBuilder = useDataGridFeatures(features.value, { t, columnConfig: columns });
    featureBuilderWatchHandle?.();
    featureBuilderWatchHandle = createFeatureBuilderWatcher(featureBuilder);
  },
  { immediate: true },
);
</script>

<template>
  <OnyxDataGridRenderer :columns="renderColumns" :rows="renderRows">
    <template #empty>
      <slot name="empty" />
    </template>
  </OnyxDataGridRenderer>
</template>
