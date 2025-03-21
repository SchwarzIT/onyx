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
   * An icon displayed on the right side of the label.
   * Should be used to indicate an action (e.g., dismissing).
   */
  interactiveIcon?: string;
  /**
   * Whether to show a skeleton tag.
   */
  skeleton?: SkeletonInjected;
};
