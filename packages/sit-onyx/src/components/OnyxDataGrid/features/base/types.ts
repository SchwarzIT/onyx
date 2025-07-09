import type { MaybeRef } from "vue";
import type { DataGridHeadline } from "../../types.js";

export type BaseFeatureOptions = {
  /**
   * Optional headline to show.
   */
  headline?: Readonly<MaybeRef<string | DataGridHeadline>>;
};
