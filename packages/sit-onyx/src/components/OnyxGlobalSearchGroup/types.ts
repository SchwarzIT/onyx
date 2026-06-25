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
  /** Alignment of the group items.
   * @default "column"
   */

  direction?: "column" | "row";
  /** Whether to render as an HTML list (ul/li) or div.
   * @default "li"
   */
  is?: "li" | "div";
};
