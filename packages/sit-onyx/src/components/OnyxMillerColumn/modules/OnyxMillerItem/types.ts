import type { DensityProp } from "../../../../composables/density.js";

export type OnyxMillerItemProps = DensityProp & {
  /**
   * Label of item
   */
  label?: string;
  /**
   * Whether the item is currently active because it was selected
   */
  active?: boolean;
  /**
   * Whether an arrow should be displayes
   */
  arrow?: boolean;
  /**
   * Whether an dot should be displayed
   */
  dot?: boolean;
  /**
   * Which color the displayed dot should have
   */
  dotColor?: string;
  /**
   * Whether a count should be displayed after the label and with which number in it
   */
  count?: number;
};
