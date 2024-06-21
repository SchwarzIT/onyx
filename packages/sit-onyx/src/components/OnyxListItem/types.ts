import type { DensityProp } from "../../composables/density";
import type { OnyxColor } from "../../types";

export type OnyxListItemProps = DensityProp & {
  /**
   * Optional aria label that describes the content {used for screen readers).
   * Useful if the option does not contain text.
   */
  "aria-label"?: string;
  /**
   * Whether the option is currently selected (only use this in combination with single select. For multiselect, use the `checked` property).
   */
  "aria-selected"?: boolean;
  /**
   * Same as `selected` but should be used in combination with multiselect for accessibility / screen readers.
   */
  "aria-checked"?: boolean;
  /**
   * Whether the option is (visually) active.
   */
  active?: boolean;
  /**
   * Whether the option is disabled.
   */
  "aria-disabled"?: boolean;
  /**
   * Main color of the option content.
   */
  color?: Extract<OnyxColor, "primary" | "danger">;
};
