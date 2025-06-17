import type { MaybeRef } from "vue";
import type { DataGridFeatureOptions } from "..";
import type { DataGridEntry } from "../../types";

export type SortDirection = "asc" | "desc" | "none";

/**
 * A function to compare two values of type T.
 * The returned number value indicates the relative order of two values:
 * -1: less than, 0: equal to, 1: greater than
 */
export type Compare<T> = (a: T, b: T) => number;

/**
 * The values by which the data is currently sorted.
 * A `undefined` column or a direction of "none" means no sorting is applied.
 */
export type SortState<TEntry extends DataGridEntry> = {
  /**
   * The column which is used to sort by.
   * `undefined` means no sorting is applied.
   */
  column: keyof TEntry | undefined;
  /**
   * The sorting direction by which the `column` is sorted.
   * `none` means no sorting is applied.
   */
  direction: SortDirection;
};

/**
 * The options of the sorting feature for the OnyxDataGrid component.
 */
export type SortOptions<TEntry extends DataGridEntry> = DataGridFeatureOptions<
  TEntry,
  {
    [TKey in keyof TEntry]?: {
      /**
       * A custom sorting function for this column.
       * By default the `Intl.Collator` with the current locale is used.
       */
      sortFunc?: Compare<TEntry[TKey]>;
    };
  },
  true
> & {
  /**
   * The currently applied sorting. Will be updated by the data grid, can be used for reading, updating and watching the applied sorting.
   */
  sortState?: MaybeRef<SortState<TEntry>>;
};
