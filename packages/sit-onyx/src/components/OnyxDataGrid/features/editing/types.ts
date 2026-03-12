import type { Ref } from "vue";
import type { Nullable } from "../../../../types/utils.js";
import type { DataGridEntry } from "../../types.js";
import type { DataGridFeatureOptions } from "../index.js";

/**
 * Configuration for how editing should behave.
 */
export type EditConfig<
  TEntry extends DataGridEntry,
  TKey extends keyof TEntry = keyof TEntry,
  TValue = TEntry[TKey],
> = {
  todo: string | TValue;
};

/**
 * Defines the current edit state per row
 */
export type EditState<TEntry extends DataGridEntry> = Partial<
  Record<TEntry["id"], Partial<TEntry>>
>;

/**
 * The configuration options for the editing feature in the OnyxDataGrid component.
 * Includes settings for the individual columns and general editing behavior.
 */
export type EditOptions<TEntry extends DataGridEntry> = DataGridFeatureOptions<
  TEntry,
  {
    [TKey in keyof TEntry]?: {
      /**
       * Configuration for how editing should behave for this column.
       */
      config?: EditConfig<TEntry, TKey>;
    };
  },
  true
> & {
  editState?: Ref<EditState<TEntry>>;
  /**
   * Configuration for how the editing should behave across all columns.
   */
  editConfig?: EditConfig<TEntry>;

  isCellEditable?: (entry: TEntry, columnKey: keyof TEntry) => Nullable<boolean>;
};
