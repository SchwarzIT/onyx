import type { DensityProp } from "../../composables/density.js";

export type OnyxMillerColumnProps = DensityProp & {
  /**
   * Configuration how many items or panes should be visible before rest is overflow and reached by scrolling horizontally
   */
  itemsInView?: number;
  /**
   * How much gap should be between the columns (important for the calculation of the col positions)
   */
  gap?: string;
  /**
   * What is the height in which the columns should be displayed
   */
  columnHeight?: string;
};
