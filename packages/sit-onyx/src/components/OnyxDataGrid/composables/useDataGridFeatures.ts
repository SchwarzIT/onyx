import type { Component, WatchSource } from "vue";
import type { DataGridEntry, DataGridMetadata } from "../types";

/**
 * Composable for combining multiple features of the OnyxDataGrid.
 */
export const useDataGridFeatures = () => {
  return {};
};

export type DataGridFeature<TName extends string, TEntry extends DataGridEntry> = {
  /**
   * Unique name and identifier of the feature.
   */
  name: TName;
  /**
   * An array of reactive states that should trigger a data grid re-calculation.
   */
  watch?: WatchSource[];
  /**
   * Allows mutating/modifying the table state as a whole, e.g. my mapping data, sorting, filtering etc..
   */
  mutation?: {
    func: (state: DataGridEntryState<TEntry>[]) => DataGridEntryState<TEntry>[];
  };
  /**
   * Allows the modification of the header columns before render.
   */
  header?: {
    /**
     * Actions are shown after the header label.
     */
    actions?: {
      iconComponent: Component;
      onTrigger?: (event: MouseEvent) => void;
    }[];
  };
};

export type DataGridEntryState<
  TEntry extends DataGridEntry,
  TMetadata extends DataGridMetadata = DataGridMetadata,
> = {
  entry: Readonly<TEntry>;
  metadata: TMetadata;
};
