<script
  setup
  lang="ts"
  generic="TEntry extends DataGridEntry, TFeatures extends DataGridFeature<TEntry, symbol>[] | []"
>
import { computed, ref, toRefs, watch, type Ref, type WatchHandle } from "vue";
import { injectI18n } from "../../i18n";
import { useDataGridFeatures, type DataGridFeature } from "./features";
import OnyxDataGridRenderer from "./OnyxDataGridRenderer/OnyxDataGridRenderer.vue";
import type { DataGridRendererColumn, DataGridRendererRow } from "./OnyxDataGridRenderer/types";
import type { DataGridEntry, DataGridMetadata, OnyxDataGridProps } from "./types";

const props = withDefaults(defineProps<OnyxDataGridProps<TEntry, TFeatures>>(), {
  features: () => [] as TFeatures,
});

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
const renderColumns: Ref<DataGridRendererColumn<TEntry, object>[]> = ref([]);
const renderRows: Ref<DataGridRendererRow<TEntry, DataGridMetadata>[]> = ref([]);

const { columns, data, features } = toRefs(props);

const featureBuilder = computed<ReturnType<typeof useDataGridFeatures<TEntry, TFeatures>>>(() =>
  useDataGridFeatures(features.value, t),
);

/**
 * Function to be able to reset the watcher in case of the features being updated.
 */
let featureBuilderWatchHandle: WatchHandle | undefined;
const createFeatureBuilderWatcher = () => {
  const { createRendererColumns, createRendererRows, watchSources } = featureBuilder.value;
  return watch(
    [columns, data, t, ...watchSources],
    () => {
      renderColumns.value = createRendererColumns(columns.value);
      renderRows.value = createRendererRows(data.value, columns.value);
    },
    { immediate: true, deep: true },
  );
};

watch(
  featureBuilder,
  () => {
    featureBuilderWatchHandle?.();
    featureBuilderWatchHandle = createFeatureBuilderWatcher();
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
