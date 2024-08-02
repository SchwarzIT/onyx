import type { DensityProp } from "../../composables/density";

export type OnyxMiniSearchProps = DensityProp & {
  /**
   * (Aria) label of the input.
   */
  label: string;
  /**
   * Current input/search value.
   */
  modelValue?: string;
};
