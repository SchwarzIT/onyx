import type { DensityProp } from "../../composables/density.js";
import type { OnyxColor } from "../../types/colors.js";

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
  /**
   * Determines whether the Badge is clickable or not.
   * If a string is provided, it is used as tooltip label.
   * If an object is provided, it contains the tooltip label and an optional action icon.
   *
   * The label must describe the on-click action, e.g. "Click to remove the Badge."
   */
  clickable?:
    | string
    | {
        /**
         * The label displayed on the Tooltip
         */
        label: string;
        /**
         * An icon displayed on the right side of the label.
         * Should be used to indicate an action (e.g., dismissing).
         */
        actionIcon?: string;
      };
  /**
   * Whether the badge should visually marked as selected
   * If the badge is also clickable, it will automatically handle aria-pressed.
   */
  selected?: boolean;
};
