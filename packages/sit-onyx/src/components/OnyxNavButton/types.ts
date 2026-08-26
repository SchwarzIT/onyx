import type { OnyxColor } from "../../types/colors.js";
import type { OnyxButtonProps } from "../OnyxButton/types.js";

export type OnyxNavButtonProps = Pick<OnyxButtonProps, "disabled" | "link" | "label" | "icon"> & {
  /**
   * Whether the label should (visually) be hidden. If set to "auto", the label will be hidden
   * by default and only visible when used inside a vertical nav bar which is expanded.
   */
  hideLabel?: boolean | "auto";
  /**
   * Main button color.
   * - neutral: Used for custom nav bar actions
   * - primary: Used for "Login" buttons
   */
  color?: Extract<OnyxColor, "neutral" | "primary">;
};
