import type { Ref } from "vue";
import type { DataGridEntry } from "../../types.js";
import type { DataGridFeatureOptions } from "../index.js";

/**
 * The configuration options for the pagination feature in the OnyxDataGrid component.
 */
export type PaginationOptions = Pick<
  DataGridFeatureOptions<DataGridEntry, object, true>,
  "enabled" | "async"
> & {
  /**
   * How many entries should be displayed per page.
   *
   * @default 25
   */
  pageSize?: number;
  /**
   * The current pagination state. Can be used to e.g. set initial pagination state or pass a custom state (useful when async pagination is used).
   *
   * @default `{ current: 1, pageSize: 25, pages: "calculated-automatically" }`
   */
  paginationState?: Ref<PaginationState>;
  /**
   * Whether to disable the pagination.
   */
  disabled?: Ref<boolean | undefined>;
  /**
   * Defines how the pagination is applied by the user.
   * - select: user can select a page using the [OnyxPagination](https://storybook.onyx.schwarz/?path=/docs/data-pagination--docs) component
   * - lazy: current page is increased automatically when the users scrolls to the end of the table. Requires a fixed table height to be set
   * - button: when scrolling to the end of the table, a button is shown that can be clicked to load the next page of data
   *
   * @default "select"
   */
  type?: PaginationType;
  /**
   * Whether the data is currently loading after changing the current page.
   * Should only be used if pagination is async.
   */
  loading?: Ref<boolean>;
  /**
   * A list of page sizes that can be selected by the user.
   * If defined, a `OnyxItemsPerPage` component will be displayed in the bottom left slot of the data grid.
   */
  itemsPerPage?: number[];
};

export type PaginationState = {
  /**
   * Current page number. First page = 1.
   */
  current: number;
  /**
   * Total number of pages.
   */
  pages: number;
  /**
   * How many entries should be displayed per page.
   *
   * **NOTE** If the page size is changed, the current page will be reset to 1.
   */
  pageSize: number;
};

export type PaginationType = "select" | "lazy" | "button";
