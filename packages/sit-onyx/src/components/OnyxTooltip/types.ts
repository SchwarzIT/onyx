import type { MaybeRefOrGetter } from "vue";
import type { DensityProp } from "../../composables/density";
import type { OnyxColor } from "../../types";

export type TooltipOptions = {
  /**
   * Number of milliseconds to use as debounce when showing/hiding the tooltip.
   */
  debounce: MaybeRefOrGetter<number>;
};

export type ToggletipOptions = {
  toggleLabel: MaybeRefOrGetter<string>;
};

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
   * How to float the tooltip relative to the parent element.
   */
  float?: TooltipFloat;
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
   * See also: https://inclusive-components.design/tooltips-toggletips/
   */
  open?: TooltipOpen;
};

export const TOOLTIP_POSITIONS = ["top", "bottom", "auto"] as const;
export type TooltipPosition = (typeof TOOLTIP_POSITIONS)[number];
export const TOOLTIP_FLOAT = ["left", "right", "center", "auto"] as const;
export type TooltipFloat = (typeof TOOLTIP_FLOAT)[number];

export type TooltipOpen =
  | "hover"
  | "click"
  | boolean
  | ({
      type: "hover";
    } & Partial<TooltipOptions>)
  | ({
      type: "click";
    } & Partial<ToggletipOptions>);
