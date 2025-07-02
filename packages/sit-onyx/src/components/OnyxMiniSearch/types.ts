import type { DensityProp } from "../../composables/density.js";
import type { Nullable } from "../../types/index.js";

export type OnyxMiniSearchProps = DensityProp & {
  /**
   * (Aria) label of the input.
   */
  label: string;
  autofocus?: boolean;
  /**
   * Current search input.
   */
  modelValue?: Nullable<string>;
};
