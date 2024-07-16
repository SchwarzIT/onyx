import type { CreateToggletipOptions, CreateTooltipOptions } from "@sit-onyx/headless";
import type { OnyxColor } from "../../types";

export type OnyxTooltipProps = {
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
   * When open is not the default value `hover`, the component will act as an "toggletip":
   * - tooltip: Describes the associated element
   * - toggletip: Gives additional information about in the current context
   *
   * The "toggletip" is implemented using an aria-live region.
   */
  open?: TooltipOpen;
};

export const TOOLTIP_POSITIONS = ["top", "bottom"] as const;
export type TooltipPosition = (typeof TOOLTIP_POSITIONS)[number];

export type TooltipOpen =
  | "hover"
  | "click"
  | boolean
  | ({
      type: "hover";
    } & Partial<CreateTooltipOptions>)
  | ({
      type: "click";
    } & Partial<CreateToggletipOptions>);
