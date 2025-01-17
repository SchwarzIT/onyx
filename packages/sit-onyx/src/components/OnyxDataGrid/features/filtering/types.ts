import type { MaybeRef, MaybeRefOrGetter } from "vue";
import type { DataGridEntry } from "../../types";
import type { Compare } from "../all";

export type FilterState<TEntry extends DataGridEntry = DataGridEntry> = {
  /**
   * The column which is used to sort by.
   * `undefined` means no sorting is applied.
   */
  column: keyof TEntry | undefined;
  /**
   * The sorting direction by which the `column` is sorted.
   * `none` means no sorting is applied.
   */
  filter: string;
};

/**
 * Per column sorting configuration.
 * If at least one column has configuration, sorting must be explicitly enabled for all columns.
 */
export type FilterColumnOptions<TEntry extends DataGridEntry> = {
  [TKey in keyof TEntry]?: {
    /**
     * If sorting is enabled for this column.
     */
    enabled: boolean;
    /**
     * A custom filtering function for this column.
     * By default the `Intl.Collator` with the current locale is used.
     */
    filterFunc?: Compare<TEntry[TKey]>;
  };
};

/**
 * The options of the sorting feature for the OnyxDataGrid component.
 */
export type FilterOptions<TEntry extends DataGridEntry> = {
  /**
   * The currently applied sorting. Will be updated by the data grid, can be used for reading, updating and watching the applied sorting.
   */
  filter?: MaybeRef<FilterState<TEntry>>;
  /**
   * The options for each column, including whether sorting is enabled and a custom sorting function. If undefined, sorting is enabled for all columns (default).
   */
  columns?: MaybeRefOrGetter<FilterColumnOptions<TEntry> | undefined>;
};
