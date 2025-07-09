import type { DensityProp } from "../../composables/density.js";
import type { OnyxColor } from "../../types/index.js";

export type OnyxToastMessageProps = DensityProp & {
  /**
   * Main toast headline.
   */
  headline: string;
  /**
   * Optional toast description (e.g. detailed error message).
   */
  description?: string;
  /**
   * Toast color.
   */
  color?: Extract<OnyxColor, "neutral" | "danger" | "warning" | "success">;
  /**
   * Duration in milliseconds for the toast to close automatically.
   * Timer will be paused when hovering the toast.
   *
   * Can be set to `0` to disable the auto closing.
   */
  duration?: number;
  /**
   * Whether the toast is clickable.
   * Enabling this will present the whole toast message element as a button element, but also hide the close button.
   */
  clickable?: boolean;
  /**
   * Icon to display. By default, an icon will be displayed depending on the current `color` property.
   * Can be set to `false` to hide the icon.
   */
  icon?: string | false;
};
