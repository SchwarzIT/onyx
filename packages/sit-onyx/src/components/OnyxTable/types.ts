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
  /**
   * Additional HTML attributes for the scroll container.
   * Supports attributes like id, class, style, and events.
   */
  scrollContainerAttrs?: HTMLAttributes;
};

export type OnyxTableSlots = {
  /**
   * Table content. Must only contain valid HTML `<tbody>` children like `<tr>` and `<td>`.
   */
  default(): unknown[];
  /**
   * Table header. Must only contain valid HTML `<thead>` children like `<tr>` and `<th>`.
   */
  head?(): unknown;
  /**
   * Optional slot to customize the empty state when no body content exist.
   * It is recommended to use the `<OnyxEmpty>` component here.
   *
   * If unset, a default translated message will be displayed for the current locale.
   */
  empty?(props: { defaultMessage: string }): unknown;
  /**
   * Optional slot for showing a headline above the table (top left). See OnyxHeadline component.
   */
  headline?(): unknown;
  /**
   * Optional slot for showing table actions above the table (top right). See OnyxIconButton and OnyxButton component.
   */
  actions?(): unknown;
  /**
   * Optional slot for displaying a pagination below the table (bottom right). See OnyxPagination component.
   */
  pagination?(): unknown;
  /**
   * Optional slot for displaying additional information below the table (bottom left).
   * Useful for showing a legend, page size selection etc.
   */
  bottomLeft?(): unknown;
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
