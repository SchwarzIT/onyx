import type { DensityProp } from "../../composables/density";
import type { Nullable } from "../../composables/useVModel";

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
