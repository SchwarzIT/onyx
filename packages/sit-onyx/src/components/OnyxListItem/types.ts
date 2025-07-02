import type { DensityProp } from "../../composables/density.js";
import type { OnyxColor } from "../../types/index.js";

export type OnyxListItemProps = DensityProp & {
  /**
   * Whether the option is currently selected (if the content includes interactive components like a checkbox, use `checked` instead).
   */
  selected?: boolean;
  /**
   * Same as `selected` but with optimized styles when the content includes interactive component (e.g. a checkbox).
   */
  checked?: boolean;
  /**
   * Whether the option is (visually) active.
   */
  active?: boolean;
  /**
   * Whether the option is disabled.
   */
  disabled?: boolean;
  /**
   * Main color of the option content.
   */
  color?: Extract<OnyxColor, "primary" | "danger">;
};
