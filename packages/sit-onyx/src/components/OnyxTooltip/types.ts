import type { DensityProp } from "../../composables/density";
import type { OnyxColor } from "../../types";

export type OnyxTooltipProps = DensityProp & {
  /**
   * Text to display inside the tooltip.
   * Must be set unless the custom "tooltip" slot is used.
   */
  text?: string;
  /**
   * Optional icon to show on the left of the text.
   */
  icon?: string;
  color?: Extract<OnyxColor, "neutral" | "danger">;
  /**
   * How to position the tooltip relative to the parent element.
   */
  position?: TooltipPosition;
  /**
   * If `true`, the tooltip will match the width of the parent/slot element.
   */
  fitParent?: boolean;
  /**
   * How to open/trigger the tooltip. You can set a boolean to force show/hide the tooltip.
   */
  open?: TooltipOpen;
};

export const TOOLTIP_POSITIONS = ["top", "bottom"] as const;
export type TooltipPosition = (typeof TOOLTIP_POSITIONS)[number];

export type TooltipOpen =
  | "hover"
  | "click"
  | boolean
  | {
      type: "hover";
      /**
       * Number of milliseconds to use as debounce when showing/hiding the tooltip
       */
      debounce: number;
    };
