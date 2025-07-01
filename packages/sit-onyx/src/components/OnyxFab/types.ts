import type { DensityProp } from "../../composables/density";

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
};
