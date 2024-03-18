import type { OnyxColor } from "../../types";

export type OnyxTooltipProps = {
  /**
   * Text to display inside the tooltip.
   */
  text: string;
  /**
   * Optional icon to show on the left of the text.
   */
  icon?: string;
  color?: Extract<OnyxColor, "neutral" | "danger">;
  /**
   * How to position the tooltip relative to the parent element.
   */
  position?: TooltipPosition;
};

export const TOOLTIP_POSITIONS = ["top", "bottom"] as const;
export type TooltipPosition = (typeof TOOLTIP_POSITIONS)[number];
