import type { DensityProp } from "../../composables/density";
import type { OnyxColor } from "../../types/colors";

export type OnyxBadgeProps = DensityProp & {
  /**
   * The color of the badge.
   */
  variation?: OnyxColor;
  /**
   * An icon which will be displayed inside the badge.
   * Note: If the icon property is set, the default slot will not be rendered.
   */
  icon?: string;
};
