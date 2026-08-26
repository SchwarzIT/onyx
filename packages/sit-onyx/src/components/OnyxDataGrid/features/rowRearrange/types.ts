import type { MaybeRef, Ref } from "vue";
import type { DataGridEntry } from "../../types.js";

export type RowRearrangeOptions<TEntry extends DataGridEntry> = {
  /**
   * Whether the feature is enabled.
   *
   * @default true
   */
  enabled?: MaybeRef<boolean | undefined>;
  /**
   * The current row rearrange state.
   */
  state?: Ref<RowRearrangeState<TEntry>>;
  /**
   * Whether to hide all default UI actions to activate the rearrange mode.
   * Useful when custom triggers are used. You must set the `state` manually then.
   */
  headless?: boolean;
};

export type RowRearrangeState<TEntry extends DataGridEntry> = {
  /**
   * Whether the rearrange mode is active. While active, the user can rearrange rows using drag and
   * drop.
   */
  active: boolean;
  /**
   * Map of rearranged rows. Key = row ID, value = new order (starting from 1). Only contains
   * changed/rearranged rows and not necessarily all available rows.
   */
  order: Map<TEntry["id"], number>;
};
