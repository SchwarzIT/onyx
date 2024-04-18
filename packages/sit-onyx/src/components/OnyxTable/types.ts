import type { DensityProp } from "../../composables/density";

export type OnyxTableProps = DensityProp & {
  /**
   * Whether to use striped row background colors.
   */
  striped?: boolean;
  /**
   * If `true`, both horizontal and vertical borders will be displayed.
   */
  grid?: boolean;
};
