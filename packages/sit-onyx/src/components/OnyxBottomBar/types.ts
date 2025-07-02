import type { DensityProp } from "../../composables/density.js";

export type OnyxBottomBarProps = DensityProp & {
  /**
   * Whether to remove the top border / separator.
   */
  hideBorder?: boolean;
};
