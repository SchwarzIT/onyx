import type { MaybeRefOrGetter } from "vue";
import type { DataGridEntry } from "../../types";

/**
 * Configuration for filtering on a per-column basis.
 * If at least one column has a filtering configuration, filtering must be explicitly enabled for all columns.
 */
export type FilterColumnOptions<TEntry extends DataGridEntry> = {
  [TKey in keyof TEntry]?: {
    /**
     * Determines if filtering is enabled for this column.
     * If set to true, the column will be filterable.
     */
    enabled: boolean;
    /**
     * The filter value for this column.
     * This value will be used to filter the data in this column.
     */
    searchTerm?: string;
    /**
     * Configuration for how filtering should behave for this column.
     */
    config?: FilterConfig<TEntry>;
  };
};

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
  /**
   * If true, whitespace at the beginning and end of the value will be trimmed before filtering.
   */
  trimWhitespace?: boolean;
};

/**
 * The configuration options for the filtering feature in the OnyxDataGrid component.
 * Includes settings for the individual columns and general filter behavior.
 */
export type FilterOptions<TEntry extends DataGridEntry> = {
  /**
   * The filter options for each column, including whether filtering is enabled, the custom filter function, and the column-specific filter configuration.
   * If undefined, filtering will be enabled for all columns by default.
   */
  columns?: MaybeRefOrGetter<FilterColumnOptions<TEntry> | undefined>;
  /**
   * Configuration for how the filtering should behave across all columns.
   */
  filterConfig?: FilterConfig<TEntry>;
};
