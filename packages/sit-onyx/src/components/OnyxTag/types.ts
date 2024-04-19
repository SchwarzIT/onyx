import type { DensityProp } from "../../composables/density";
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
};
