import type { MaybeRefOrGetter, Ref } from "vue";

export type ColumnRearrangeState = {
  /**
   * Whether the rearrange mode is active. While active, the user can rearrange columns using drag
   * and drop.
   */
  active: boolean;
  /**
   * Map of rearranged columns. Key = columns ID, value = new order (starting from 1). Only
   * contains changed/rearranged columns and not necessarily all available columns.
   */
  order: Map<PropertyKey, number>;
};

export type ColumnRearrangeOptions = {
  /**
   * Whether the feature is enabled.
   *
   * @default true
   */
  enabled?: MaybeRefOrGetter<boolean>;
  /**
   * The current column rearrange state.
   */
  state?: Ref<ColumnRearrangeState>;
  /**
   * Whether to hide all default UI actions to activate the rearrange mode.
   * Useful when custom triggers are used. You must set the `state` manually then.
   */
  headless?: boolean;
};
