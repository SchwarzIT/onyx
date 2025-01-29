import type { ColumnConfig, DataGridFeature, TypeRenderMap } from "./features";

export type DataGridMetadata = Record<string, unknown>;

/**
 * Gets all possible keys in a union.
 */
export type KeysOfUnion<T> = T extends T ? keyof T : never;

/**
 * Merge the values for all entries by key.
 */
export type UnionByKey<T> = {
  [Key in T extends NonNullable<T> ? keyof T : never]: T extends { [P in Key]?: infer Value }
    ? Value extends undefined
      ? never
      : Value
    : never;
};

/**
 * Pick a value form `T` for the key `K`, if it exists.
 */
export type MaybePick<T, K> = K extends keyof T ? T[K] : never;

/**
 * Unwraps the defined typeRenderers
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RenderTypesFromFeature<TFeatures extends DataGridFeature<any, any, any>[]> =
  // Only expose named types, symbols are intended for internal types
  Exclude<
    // Get all keys of the merged type
    KeysOfUnion<
      // Take the merged `typeRenderer` type
      MaybePick<
        // Merge the values together
        UnionByKey<
          // For each feature
          TFeatures[number]
        >,
        "typeRenderer"
      >
    >,
    symbol
  >;

/**
 * @experimental The DataGrid is still working in progress and the props will change in the future.
 */
export type OnyxDataGridProps<
  TEntry extends DataGridEntry,
  TTypeRenderer extends TypeRenderMap<TEntry>,
  TFeatureName extends symbol,
  TFeatures extends DataGridFeature<TEntry, TTypeRenderer, TFeatureName>[] = DataGridFeature<
    TEntry,
    TTypeRenderer,
    TFeatureName
  >[],
  TTypes = RenderTypesFromFeature<TFeatures>,
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
  columns: ColumnConfig<TEntry, TTypes>[];
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
