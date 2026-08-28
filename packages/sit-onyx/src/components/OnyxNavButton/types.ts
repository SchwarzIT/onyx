import type { OnyxColor } from "../../types/colors.js";
import type { OnyxButtonProps } from "../OnyxButton/types.js";

export type OnyxNavButtonProps = Pick<OnyxButtonProps, "disabled" | "link" | "label" | "icon"> & {
  /**
   * Whether the label should (visually) be hidden.
   * If used inside a vertical nav bar, the label is shown depending on the expanded state.
   */
  hideLabel?: boolean;
  /**
   * Main button color.
   * - neutral: Used for custom nav bar actions
   * - primary: Used for "Login" buttons
   */
  color?: Extract<OnyxColor, "neutral" | "primary">;
};
