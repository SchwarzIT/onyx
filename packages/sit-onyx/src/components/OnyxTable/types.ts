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
  /**
   * Whether the table will scroll internally when a CSS max height/width is exceeded.
   * - with scrolling internally, the table header will stick to the top of the **table**
   * - without scrolling internally, the table header will stick to the top of the **page**
   * - Never set a max-height/width on the table without setting `withInternalScrolling` to true.
   */
  withInternalScrolling?: boolean;
};
