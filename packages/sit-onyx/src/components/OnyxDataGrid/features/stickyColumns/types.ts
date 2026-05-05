import type { MaybeRef } from "vue";
import type { DataGridEntry } from "../../types.js";
/*
 * The configuration options for the stickyColumn feature in the OnyxDataGrid component.
 */

export type StickyColumnDef<TEntry extends DataGridEntry> =
  | keyof TEntry
  | { key: keyof TEntry | symbol; position?: "left" | "right" };

export type StickyColumnsOptions<TEntry extends DataGridEntry> = {
  /**
   * Defines the columns that should remain sticky.
   */
  columns: MaybeRef<StickyColumnDef<TEntry>[]>;
  /**
   * Determines the side to which the columns are sticked.
   *
   * @default "left"
   */
  position?: MaybeRef<"left" | "right">;
};
