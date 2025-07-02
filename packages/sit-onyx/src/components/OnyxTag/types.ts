import type { DensityProp } from "../../composables/density.js";
import type { SkeletonInjected } from "../../composables/useSkeletonState.js";
import type { OnyxColor } from "../../types/colors.js";

export type OnyxTagProps = DensityProp & {
  /**
   * The text content of the tag.
   */
  label: string;
  /**
   * The color of the tag.
   */
  color?: OnyxColor;
  /**
   * An icon which will be displayed on the left side of the label.
   */
  icon?: string;
  /**
   * Determines whether the Tag is clickable or not.
   * If a string is provided, it is used as tooltip label.
   * If an object is provided, it contains the tooltip label and an optional action icon.
   *
   * The label must describe the on-click action, e.g. "Click to remove the tag."
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
   * Whether to show a skeleton tag.
   */
  skeleton?: SkeletonInjected;
};
