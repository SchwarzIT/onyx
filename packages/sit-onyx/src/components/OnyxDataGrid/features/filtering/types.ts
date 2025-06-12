import type { Ref } from "vue";
import type { DataGridFeatureOptions } from "..";
import type { DataGridEntry } from "../../types";
import type { FilterState } from "./filtering";

/**
 * Configuration for how filtering should behave.
 */
export type FilterConfig<TEntry extends DataGridEntry> = {
  /**
   * A custom filtering function for this column.
   * This function is used to filter the column data, instead of using the default filtering behavior.
   */
  filterFunc?: (
    /**
     * The searchTerm as entered by the user.
     */
    searchTerm: string,
    /**
     * The current row value to be checked.
     */
    value: TEntry[keyof TEntry],
    /**
     * The column that is filtered by.
     */
    column: keyof TEntry,
    /**
     * The complete row data.
     */
    entry: TEntry,
  ) => boolean;
  /**
   * If true, filtering will be case-sensitive.
   * If false, filtering will be case-insensitive.
   */
  caseSensitive?: boolean;
  /**
   * If true, the filter will start searching from the beginning of the value.
   * If false, it will search anywhere in the value.
   */
  searchFromStart?: boolean;
  /**
   * If true, the filter will match the value exactly, without partial matches.
   * If false, partial matches will be allowed.
   */
  exactMatch?: boolean;
};

/**
 * The configuration options for the filtering feature in the OnyxDataGrid component.
 * Includes settings for the individual columns and general filter behavior.
 */
export type FilterOptions<TEntry extends DataGridEntry> = DataGridFeatureOptions<
  TEntry,
  {
    [TKey in keyof TEntry]?: {
      /**
       * Configuration for how filtering should behave for this column.
       */
      config?: FilterConfig<TEntry>;
    };
  }
> & {
  filterState?: Ref<FilterState<DataGridEntry>>;
  /**
   * Configuration for how the filtering should behave across all columns.
   */
  filterConfig?: FilterConfig<TEntry>;
};
