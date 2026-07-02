import type { DensityProp } from "../../composables/density.js";

export type OnyxGlobalSearchGroupProps = DensityProp & {
  /**
   * Group name.
   */
  label: string;
  /**
   * Whether to show skeleton options.
   */
  skeleton?: boolean | number;
  /**
   * Orientation of the component.
   * @default "vertical"
   */
  orientation?: "horizontal" | "vertical";
};
