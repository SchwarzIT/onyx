import type { SkeletonInjected } from "src/composables/useSkeletonState";
import type { IfExtends, IfNotEmpty, MaybePick, RecordValues, UnionByKey } from "../../types";
import type { OnyxTableProps } from "../OnyxTable/types";
import type {
  ColumnConfig,
  ColumnConfigTypeOption,
  ColumnGroupConfig,
  DataGridFeature,
  TypeRenderer,
  TypeRenderMap,
} from "./features";
import type { BASE_FEATURE } from "./features/base/base";

export type DataGridMetadata = Record<string, unknown>;

/**
 * Makes registered types of typeRenderers available for use in the column configuration.
 * Extracts all registered `Keys` and their `TOptions` types and maps them to the `ColumnConfigurationTypeOption`.
 */
export type MapTypeRenderOptions<T> = {
  [Key in keyof T]: T[Key] extends TypeRenderer<infer _, infer TOptions>
    ? ColumnConfigTypeOption<Key, TOptions>
    : ColumnConfigTypeOption<Key, unknown>;
};

/**
 * Unwraps the defined typeRenderers
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- we use any for simplicity
export type RenderTypesFromFeature<TFeatures extends DataGridFeature<any, any, any>[]> =
  // 8. Safeguard against unwanted types
  IfExtends<
    // 7. Union type of all column types
    RecordValues<
      // 6. Map all `typeRenderer`s to their appropriate column option types
      MapTypeRenderOptions<
        // 5. Drop all empty records to avoid ending up with `unknown` type
        IfNotEmpty<
          // 4. If defined, take the type of the `typeRenderer` key from the feature
          MaybePick<
            // 3. Merge the values together
            UnionByKey<
              // 2. Take the feature description object
              ReturnType<
                // 1. For each feature
                TFeatures[number]
              >
            >,
            "typeRenderer"
          >
        >
      >
    >,
    ColumnConfigTypeOption<PropertyKey, unknown>
  >;

/**
 * @experimental The DataGrid is still working in progress and the props will change in the future.
 */
export type OnyxDataGridProps<
  TEntry extends DataGridEntry,
  TColumnGroup extends ColumnGroupConfig,
  TTypeRenderer extends TypeRenderMap<TEntry>,
  TFeatureName extends symbol,
  TFeatures extends DataGridFeature<TEntry, TTypeRenderer, TFeatureName>[] = never,
  TTypes extends ColumnConfigTypeOption<PropertyKey, unknown> = RenderTypesFromFeature<
    [ReturnType<typeof BASE_FEATURE>, ...TFeatures]
  >,
> = {
  /**
   * Features that should be applied.
   * They allow the modification of the behavior and rendering.
   * Usually you want to use the provided features of the exported `DataGridFeature` namespace.
   * Check the Storybook examples (e.g. [Sorting](/?path=/story/data-datagrid-features--sorting)) for more details on how the features are used and configured.
   */
  features?: TFeatures;
  /**
   * When `async` is `true`, the data transformation of supported features is disabled and externalized.
   * This allows for backend handling of data fetching and data transformation.
   */
  async?: boolean;
  /**
   * The order of and which columns should be rendered.
   */
  columns: ColumnConfig<TEntry, TColumnGroup, TTypes>[];
  /**
   * Configuration for the column groups defined via the `columns` configuration.
   */
  columnGroups?: TColumnGroup;
  /**
   * The data that should be used to fill the datagrid.
   */
  data: TEntry[];
  /**
   *  Whether to show skeleton rows. Can be set to `true` to use a pre-defined skeleton row count or you can pass a number to define a specific count.
   */
  skeleton?: SkeletonInjected;
} & Omit<OnyxTableProps, "columnGroups" | "scrollContainerAttrs">;

/**
 * "Raw" user data for a data grid entry/row, e.g. fetched from a backend service.
 */
export type DataGridEntry = {
  id: PropertyKey;
  [key: PropertyKey]: unknown;
};
