import type { HTMLAttributes } from "vue";
import type { SkeletonInjected } from "../../composables/useSkeletonState.js";
import type {
  IfExtends,
  IfNotEmpty,
  MaybePick,
  RecordValues,
  UnionByKey,
} from "../../types/index.js";
import type { OnyxHeadlineProps } from "../OnyxHeadline/types.js";
import type { OnyxTableProps } from "../OnyxTable/types.js";
import type { BASE_FEATURE } from "./features/base/base.js";
import type {
  ColumnConfig,
  ColumnConfigTypeOption,
  ColumnGroupConfig,
  DataGridFeature,
  InternalColumnConfig,
  TypeRenderer,
  TypeRenderMap,
} from "./features/index.js";

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
 * A type that can either be the type itself or an array of it.
 */
export type MaybeArray<T> = T | Array<T>;

/**
 * Unwraps the typeRenderers from the given feature(s).
 *
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- we use any for simplicity
export type ColumnTypesFromFeatures<TFeatures extends MaybeArray<DataGridFeature<any, any, any>>> =
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
                // eslint-disable-next-line @typescript-eslint/no-explicit-any -- we use any for simplicity
                TFeatures extends any[] ? TFeatures[number] : TFeatures
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
  TTypes extends ColumnConfigTypeOption<PropertyKey, unknown> = ColumnTypesFromFeatures<
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
  /**
   * Headline to display above the data grid.
   */
  headline?: string | DataGridHeadline;
} & Omit<OnyxTableProps, "columnGroups" | "scrollContainerAttrs">;

/**
 * "Raw" user data for a data grid entry/row, e.g. fetched from a backend service.
 */
export type DataGridEntry = {
  [key: PropertyKey]: unknown;
  /**
   * Unique ID of the data grid entry/row.
   */
  id: PropertyKey;
  /**
   * Additional options for this row.
   */
  [DataGridRowOptionsSymbol]?: DataGridEntryOptions;
};

export type DataGridEntryOptions = {
  /**
   * Attributes that are bound directly to the `<tr>` element of the row.
   */
  trAttributes?: HTMLAttributes;
  /**
   * Overrides which columns to render in which order.
   * Useful if e.g. adding a custom full-width row inside a data grid feature.
   */
  columns?: Omit<InternalColumnConfig<{ id: PropertyKey }>, "label">[];
};

export const DataGridRowOptionsSymbol = Symbol("RowOptions");

export type DataGridHeadline = Partial<OnyxHeadlineProps> & {
  /**
   * Headline text.
   */
  text: string;
  /**
   * Optional row count to display. If set to `true`, the count will be determined automatically.
   * Can also be set to a custom number (useful when e.g. using async pagination).
   */
  rowCount?: boolean | number;
};
