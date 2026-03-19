import type { Ref } from "vue";
import type { Nullable } from "../../../../types/utils.js";
import type { DataGridEntry } from "../../types.js";
import type { DataGridFeatureOptions } from "../index.js";

/**
 * Contains changes that have been performed using the edit mode.
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
  object,
  false
> & {
  /**
   * The `editState` contains all performed edits.
   */
  editState?: Ref<EditState<TEntry>>;
  /**
   * In `manual` mode the all cells are rendered in their editable state per default. They don't swap automatically between display and editing.
   * The `isCellEditable` option can be used to configure the edit mode for specific cells and rows.
   *
   * More edit modes will follow in future updates.
   */
  mode: "manual";

  isCellEditable?: (entry: TEntry, columnKey: keyof TEntry) => Nullable<boolean>;
};
