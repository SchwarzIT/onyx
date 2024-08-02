import type { DensityProp } from "../../composables/density";
import type { OnyxColor } from "../../types/colors";

export type OnyxBadgeProps = DensityProp & {
  /**
   * The color of the badge.
   */
  color?: OnyxColor;
  /**
   * An icon which will be displayed inside the badge.
   * Note: If the icon property is set, the default slot will not be rendered.
   */
  icon?: string;
  /**
   * If `true`, only a colored dot will be displayed instead of the icon or slot content.
   */
  dot?: boolean;
};
