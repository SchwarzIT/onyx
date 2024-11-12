import type { DataGridFeature } from "./features";

export type DataGridMetadata = Record<string, unknown>;

/**
 * @experimental The DataGrid is still working in progress and the props will change in the future.
 */
export type OnyxDataGridProps<
  TEntry extends DataGridEntry = DataGridEntry,
  TFeatures extends DataGridFeature<TEntry, symbol>[] = DataGridFeature<TEntry, symbol>[],
> = {
  /**
   * Features that should be applied.
   * They allow the modification of the behavior and rendering.
   * Usually you want to use the provided features of the exported `DataGridFeature` namespace:
   *
   * @example
   * ```vue
   * <script setup lang="ts">
   * import { ref, watch } from "vue";
   * import type { DataGridEntry, OnyxDataGridProps } from "sit-onyx";
   * import { DataGridFeatures, OnyxDataGrid } from "sit-onyx";
   *
   * const withSorting = DataGridFeatures.useSorting(sortOptions);
   * </script>
   *
   * <template>
   *   <OnyxDataGrid :columns :data :features=[withSorting] />
   * </template>
   *
   * ```
   */
  features?: TFeatures;
  /**
   * The order of and which columns should be rendered.
   */
  columns: (keyof TEntry)[];
  /**
   * The data that should be used to fill the datagrid.
   */
  data: TEntry[];
};

/**
 * "Raw" user data for a data grid entry/row, e.g. fetched from a backend service.
 */
export type DataGridEntry = {
  id: PropertyKey;
  [key: PropertyKey]: unknown;
};
