import { type WatchSource } from "vue";
import type { DataGridRendererColumn, DataGridRendererRow } from "./OnyxDataGridRenderer/types";
import type { DataGridEntry } from "./types";

// we need to intersect the empty array, so the array entry types are inferred
export const useTableFeatures = <
  TEntry extends DataGridEntry,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends TableFeature<any, TFeatureName>[] | [],
  TFeatureName extends symbol,
>(
  features: T,
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const enrichHeaders = (columns: string[]): DataGridRendererColumn<TEntry, any>[] => {
    return columns.map((column) => {
      return {
        key: column,
        component: () => column,
        props: {},
      };
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const enrichTableData = (
    entries: TEntry[],
    columns: string[],
  ): DataGridRendererRow<TEntry, any>[] => {
    return entries.map((entry) => {
      return {
        id: entry.id,
        cells: columns.reduce(
          (cells, column) => {
            cells[column] = {
              component: () => entry[column],
              props: {},
            };
            return cells;
          },
          {} as DataGridRendererRow<TEntry, any>["cells"],
        ),
      };
    });
  };

  const watchSources: WatchSource[] = [];

  return {
    /** Takes the column definition and maps all, calls mutation func and maps at the end to RendererCell */
    enrichTableData,
    /** Takes the column definition and creates a RenderHeader for each, adds actions from features */
    enrichHeaders,
    // the combined `watch` for all features
    watchSources,
  };
};

export type TableEntry = {
  id: string | number;
  [key: PropertyKey]: unknown;
};

export type TableFeature<TEntry extends TableEntry, TFeatureName extends symbol> = {
  /**
   * Unique name and identifier of the table feature
   */
  name: TFeatureName;

  /**
   * An array of reactive states that should trigger a table re-calcualtion
   */
  watch: WatchSource[];

  /**
   * Allows modifying the table state as a whole.
   */
  mutation?: {
    func: (state: EntryState<TEntry>[]) => EntryState<TEntry>[];
  };

  /**
   * Allows the modification of the header columns before render.
   */
  header?: {
    /** actions are shown after the header label, later `listComponent` can be added */
    actions?: { iconComponent: Component; onTrigger?: (event: MouseEvent) => void }[];
  };
};
