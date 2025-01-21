import type { MaybeRefOrGetter } from "vue";
import type { DataGridEntry } from "../../types";
import type { Compare } from "../all";

export type FilterState<TEntry extends DataGridEntry = DataGridEntry> = {
  /**
   * The column which is used to filter by.
   * `undefined` means no filtering is applied.
   */
  column: keyof TEntry | undefined;
};

/**
 * Per column filtering configuration.
 * If at least one column has configuration, filtering must be explicitly enabled for all columns.
 */
export type FilterColumnOptions<TEntry extends DataGridEntry> = {
  [TKey in keyof TEntry]?: {
    /**
     * If sorting is enabled for this column.
     */
    enabled: boolean;
    /**
     * A custom filtering function for this column.
     */
    filterFunc?: Compare<TEntry[TKey]>;
  };
};

/**
 * The options of the filtering feature for the OnyxDataGrid component.
 */
export type FilterOptions<TEntry extends DataGridEntry> = {
  /**
   * The options for each column, including whether filtering is enabled and a custom filtering function. If undefined, filtering is enabled for all columns (default).
   */
  columns?: MaybeRefOrGetter<FilterColumnOptions<TEntry> | undefined>;
  /**
   * Determines how the filter updates: either on each input or after pressing Enter.
   */
  updateMode?: "onInput" | "onEnter";
};
