import type { Ref } from "vue";
import type { DataGridFeatureOptions } from "..";
import type { DataGridEntry } from "../../types";

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
   * @default 15
   */
  pageSize?: number;
  /**
   * Whether the data is currently loading after changing the current page (will disable the pagination).
   */
  loading?: Ref<boolean>;
  paginationState?: Ref<PaginationState>;
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
   */
  pageSize: number;
};
