import type { DensityProp } from "../../composables/density";
import type { OnyxColor } from "../../types";

export type OnyxToastProps = DensityProp & {
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
   * Whether the toast is clickable (will emit the `click` event).
   * Will also hide the manual close button.
   */
  clickable?: boolean;
  /**
   * Icon to display. By default, an icon will be displayed depending on the current `color` property.
   * Can be set to `false` to hide the icon.
   */
  icon?: string | false;
};
