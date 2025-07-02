import type { DensityProp } from "../../composables/density";
import type { Nullable } from "../../types";

export type OnyxFabProps = DensityProp & {
  /**
   * (Aria) Label of the action button that describes the action.
   */
  label: string;
  /**
   * If `true`, the label will be visually hidden.
   * For accessibility / screen readers, the aria-label will still be set.
   */
  hideLabel?: boolean;
  /**
   * Icon to show in the action button. If `options` are provided as slot, a pre-defined icon will be displayed for toggling the options.
   */
  icon?: string;
  /**
   * How to align the component relative to the viewport.
   */
  alignment?: "left" | "right";
  /**
   * Whether the element is expanded or collapsed.
   * If unset, the open state is manged internally.
   */
  open?: Nullable<boolean>;
};
