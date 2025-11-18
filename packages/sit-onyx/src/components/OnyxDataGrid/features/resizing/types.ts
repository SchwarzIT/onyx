import type { Ref } from "vue";
import type { DataGridEntry } from "../../types.js";
import { type DataGridFeatureOptions } from "../index.js";

/**
 * The configuration options for the resizing feature in the OnyxDataGrid component.
 * Includes settings for the individual columns and general resizing behavior.
 */
export type ResizingOptions<TEntry extends DataGridEntry> = DataGridFeatureOptions<
  TEntry,
  object
> & {
  /**
   * The current column resizing state.
   * Can be used to e.g. save the user resized columns and restore them on page load.
   */
  resizeState?: Ref<ResizeState<TEntry>>;
};

/**
 * Defines the current column resizing state.
 * Key = Column key, value = resized width.
 */
export type ResizeState<TEntry> = Map<keyof TEntry, string>;
