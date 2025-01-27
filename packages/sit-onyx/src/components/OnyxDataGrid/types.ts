import type { DataGridFeature, TypeRender } from "./features";

export type DataGridMetadata = Record<string, unknown>;

/**
 * @experimental The DataGrid is still working in progress and the props will change in the future.
 */
export type OnyxDataGridProps<
  TEntry extends DataGridEntry,
  TTypeRenderer extends TypeRender<TEntry>,
  TFeatureName extends symbol,
  TFeatures extends DataGridFeature<TEntry, TTypeRenderer, TFeatureName>[] = DataGridFeature<
    TEntry,
    TTypeRenderer,
    TFeatureName
  >[],
> = {
  /**
   * Features that should be applied.
   * They allow the modification of the behavior and rendering.
   * Usually you want to use the provided features of the exported `DataGridFeature` namespace.
   * Check the Storybook examples (e.g. [Sorting](/?path=/story/data-datagrid-features--sorting)) for more details on how the features are used and configured.
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
