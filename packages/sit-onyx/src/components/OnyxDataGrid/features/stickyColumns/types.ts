import type { MaybeRef } from "vue";
import type { DataGridEntry } from "../../types.js";
/*
 * The configuration options for the stickyColumn feature in the OnyxDataGrid component.
 */
export type StickyColumnsOptions<TEntry extends DataGridEntry> = {
  /**
   * Defines the columns that should remain sticky.
   */
  columns: MaybeRef<(keyof TEntry)[]>;
  /**
   * Determines the side to which the columns are sticked.
   *
   * @default "left"
   */
  position?: MaybeRef<"left" | "right">;
};
