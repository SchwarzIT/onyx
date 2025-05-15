<script
  setup
  lang="ts"
  generic="
    TEntry extends DataGridEntry,
    TTypeRenderer extends TypeRenderMap<TEntry>,
    TColumnGroup extends ColumnGroupConfig,
    TTypes extends ColumnConfigTypeOption<PropertyKey, unknown>,
    TFeatureName extends symbol,
    TFeatures extends DataGridFeature<TEntry, TTypeRenderer, TFeatureName>[] | [] = []
  "
>
import { shallowRef, toRefs, watch, type HTMLAttributes, type WatchHandle } from "vue";
import { injectI18n } from "../../i18n";
import type { TableColumnGroup } from "../OnyxTable/types";
import {
  useDataGridFeatures,
  type ColumnConfigTypeOption,
  type ColumnGroupConfig,
  type DataGridFeature,
  type TypeRenderMap,
} from "./features";
import { BASE_FEATURE } from "./features/base/base";
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
const renderColumns = shallowRef<DataGridRendererColumn<TEntry>[]>([]);
const renderRows = shallowRef<DataGridRendererRow<TEntry, DataGridMetadata>[]>([]);
const rendererColumnGroups = shallowRef<TableColumnGroup[]>();
const rendererScrollContainerAttributes = shallowRef<HTMLAttributes | undefined>();

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
  createScrollContainerAttributes,
}: ReturnType<
  typeof useDataGridFeatures<TEntry, TFeatureName, TTypeRenderer, TColumnGroup, TTypes, TFeatures>
>) => {
  return watch(
    [data, columns, columnGroups, i18n.locale, i18n.t, ...watchSources],
    () => {
      renderColumns.value = createRendererColumns();
      renderRows.value = createRendererRows(data.value);
      rendererColumnGroups.value = createRendererColumnGroups();
      rendererScrollContainerAttributes.value = createScrollContainerAttributes();
    },
    { immediate: true, deep: true },
  );
};

watch(
  features,
  () => {
    const featureBuilder = useDataGridFeatures([BASE_FEATURE, ...features.value], {
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
    :scroll-container-attrs="rendererScrollContainerAttributes"
  >
    <template #empty>
      <slot name="empty" />
    </template>
  </OnyxDataGridRenderer>
</template>
