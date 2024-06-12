import type { DensityProp } from "../../composables/density";

export type OnyxTableProps = DensityProp & {
  /**
   * Whether to use striped row background colors.
   */
  striped?: boolean;
  /**
   * If `true`, vertical borders will be displayed in addition to the default horizontal borders.
   */
  withVerticalBorders?: boolean;
};
