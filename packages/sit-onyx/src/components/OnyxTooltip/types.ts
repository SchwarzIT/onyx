import type { MaybeRefOrGetter } from "vue";
import type { DensityProp } from "../../composables/density";
import type { WedgePosition } from "../../composables/useWedgePosition";
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
  color?: Extract<OnyxColor, "neutral" | "danger" | "success">;
  /**
   * How to position the tooltip relative to the parent element.
   */
  position?: TooltipPosition;
  /**
   * How to align the tooltip relative to the parent element.
   */
  alignment?: WedgePosition | "auto";
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
  /**
   * Determines whether the tooltip aligns with the edge of the parent element,
   * depending on the specified alignment.
   */
  alignsWithEdge?: boolean;
};

export const TOOLTIP_POSITIONS = ["top", "bottom", "auto"] as const;
export type TooltipPosition =
  | "auto"
  | "top"
  | "top right"
  | "top left"
  | "right"
  | "bottom"
  | "bottom right"
  | "bottom left"
  | "left";
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
