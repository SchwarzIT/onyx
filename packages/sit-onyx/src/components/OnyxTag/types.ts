import type { DensityProp } from "../../composables/density";
import type { SkeletonInjected } from "../../composables/useSkeletonState";
import type { OnyxColor } from "../../types/colors";

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
   * Deermines whether the Tag is clickalbe or not.
   * If a string is provided,it represnts a tooltip label
   * If an object is provided, it contains a tooltip label and ann optional action icon.
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
