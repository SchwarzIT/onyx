import type { DensityProp } from "../../composables/density";
import type { OnyxColor } from "../../types";

export type OnyxInfoCardProps = DensityProp & {
  /**
   * Card headline.
   */
  headline?: string;
  /**
   * Card color.
   */
  color?: OnyxColor;
  /**
   * Icon to display. If unset, a default icon will be displayed.
   * Can be set to `false` to hide the icon.
   */
  icon?: string | false;
  /**
   * Whether the info card can be closed. Will show an "x" icon.
   */
  closable?: boolean;
};
