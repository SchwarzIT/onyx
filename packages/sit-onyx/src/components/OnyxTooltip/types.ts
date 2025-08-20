import type { MaybeRefOrGetter } from "vue";
import type { DensityProp } from "../../composables/density.js";
import type { AnchorPosition } from "../../composables/useAnchorPositionPolyfill.js";
import type { OpenAlignment } from "../../composables/useOpenAlignment.js";
import type { Nullable, OnyxColor } from "../../types/index.js";

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
  /**
   * Tooltip color.
   */
  color?: Extract<OnyxColor, "neutral" | "danger" | "success">;
  /**
   * How to position the tooltip relative to the parent element.
   */
  position?: AnchorPosition | "auto";
  /**
   * Specifies how to align the tooltip relative to the parent element.
   * This is applicable only for top and bottom positioning.
   */
  alignment?: OpenAlignment | "auto";
  /**
   * If `true`, the tooltip will match the width of the parent/slot element.
   */
  fitParent?: boolean;
  /**
   * Whether the tooltip is currently open/visible. If unset, the state will be managed internally.
   */
  open?: Nullable<boolean>;
  /**
   * Whether the tooltip is triggered on hover or click. Can also be an object with additional options.
   *
   * - hover: tooltip - describes the associated element
   * - click: toggletip - gives additional information about in the current context
   *
   * The "toggletip" is implemented using an aria-live region.
   * See also: https://inclusive-components.design/tooltips-toggletips/
   */
  trigger?: TooltipTrigger;
  /**
   * Determines whether the tooltip aligns with the edge of the parent element,
   * depending on the specified alignment.
   */
  alignsWithEdge?: boolean;
  /**
   * Determines whether the tooltip should be rendered without a wedge (triangle).
   */
  withoutWedge?: boolean;
};

export type TooltipTrigger =
  | "hover"
  | "click"
  | ({
      type: "hover";
    } & Partial<TooltipOptions>)
  | ({
      type: "click";
    } & Partial<ToggletipOptions>);
