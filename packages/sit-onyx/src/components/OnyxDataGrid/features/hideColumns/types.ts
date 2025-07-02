import type { DataGridEntry } from "../../types.js";
import type { DataGridFeatureOptions } from "../index.js";

/**
 * The options of the sorting feature for the OnyxDataGrid component.
 */
export type HideColumnsOptions<TEntry extends DataGridEntry> = DataGridFeatureOptions<
  TEntry,
  {
    [TKey in keyof TEntry]?: {
      /**
       * Whether the column is hidden.
       *
       * @default false
       */
      hidden?: boolean;
    };
  }
>;
