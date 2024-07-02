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
   * Whether the table will be displayed at it's full size and is scrollable only in the page context.
   * - `false` => the table header will stick to the top of the **table** when it has a limited height
   * - `true` => the table header will stick to the top of the **page** when scrolling the page
   * - Warning: Don't set a max-height/width on the table when `withPageScrolling` is set.
   */
  withPageScrolling?: boolean;
};
