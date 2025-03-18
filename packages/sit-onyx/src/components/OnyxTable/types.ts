import type { HTMLAttributes } from "vue";
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
   * Whether the table will only scroll in a page context and will not scroll internally.
   * - `false` => the table header will stick to the top of the **table** when it has a limited height
   * - `true` => the table header will stick to the top of the **page** when scrolling the page
   * - Warning: Don't set a max-height/width on the table when `withPageScrolling` is set.
   */
  withPageScrolling?: boolean;
  /**
   * Optional column groups that are rendered above the table head to group columns together.
   * Slot `head` must be filled for this to work and `withVerticalBorders` property should be set.
   */
  columnGroups?: TableColumnGroup[];
  scrollContainerAttrs?: HTMLAttributes;
};

/**
 * Table group that is rendered as `<colgroup>` and corresponding `<th scope="colgroup">` inside the table.
 */
export type TableColumnGroup = {
  /**
   * Unique key to identify the column group.
   */
  key: PropertyKey;
  /**
   * Number of columns to span. Must be >= 1.
   * Sum of all column group spans must add up to the total number of table columns.
   */
  span: number;
  /**
   * Header text to display.
   */
  header?: string;
};
