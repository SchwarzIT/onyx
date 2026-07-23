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
};

export type RowRearrangeState<TEntry extends DataGridEntry> = {
  order: Map<TEntry["id"], number>;
  active: boolean;
};
