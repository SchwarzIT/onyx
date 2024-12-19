import type { DensityProp } from "../../composables/density";

export type OnyxBottomBarProps = DensityProp & {
  /**
   * Whether to remove the top border / separator.
   */
  hideTopBorder?: boolean;
};
