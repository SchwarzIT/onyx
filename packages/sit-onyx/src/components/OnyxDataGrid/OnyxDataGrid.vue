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
import { SKELETON_INJECTED_SYMBOL, useSkeletonContext } from "../../composables/useSkeletonState";
import { injectI18n } from "../../i18n";
import { mergeVueProps } from "../../utils/attrs";
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

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<OnyxDataGridProps<TEntry, TColumnGroup, TTypeRenderer, TFeatureName, TFeatures>>(),
  {
    features: () => [] as TFeatures,
    skeleton: SKELETON_INJECTED_SYMBOL,
    // usually we default all boolean props to false (see https://onyx.schwarz/principles/technical-vision.html#component-interface).
    // However, here for striped and withVerticalBorders this makes sense from UX perspective
    striped: true,
    withVerticalBorders: true,
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

const skeleton = useSkeletonContext(props);
// Using Ref types to avoid `UnwrapRef` issues
const renderColumns = shallowRef<DataGridRendererColumn<TEntry>[]>([]);
const renderRows = shallowRef<DataGridRendererRow<TEntry, DataGridMetadata>[]>([]);
const rendererColumnGroups = shallowRef<TableColumnGroup[]>();
const rendererScrollContainerAttributes = shallowRef<HTMLAttributes | undefined>();

const { columns: columnConfig, data, features, columnGroups, async } = toRefs(props);

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
    [data, skeleton, columnConfig, columnGroups, i18n.locale, i18n.t, ...watchSources],
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
    const featureBuilder = useDataGridFeatures([BASE_FEATURE({ skeleton }), ...features.value], {
      i18n,
      columnConfig,
      columnGroups,
      async,
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
    v-bind="
      mergeVueProps($attrs, {
        density: props.density,
        striped: props.striped,
        withVerticalBorders: props.withVerticalBorders,
        withPageScrolling: props.withPageScrolling,
      })
    "
  >
    <template #empty>
      <slot name="empty" />
    </template>
  </OnyxDataGridRenderer>
</template>
