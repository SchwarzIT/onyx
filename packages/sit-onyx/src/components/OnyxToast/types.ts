import type { OnyxColor } from "../../types";

export type OnyxToastProps = {
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
   * Can be set to `0` to disable the auto closing (will show a close button instead when `clickable` is `false`).
   */
  duration?: number;
  /**
   * Whether the toast is clickable (will emit the `click` event).
   * Will also hide the manual close button if `duration` is disabled.
   */
  clickable?: boolean;
  /**
   * Icon to display.
   */
  icon?: string;
};
