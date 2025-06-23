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
   * @default 25
   */
  pageSize?: number;
  /**
   * The current pagination state. Can be used to e.g. set initial pagination state or pass a custom state (useful when async pagination is used).
   */
  paginationState?: Ref<PaginationState>;
  /**
   * Whether to disable the pagination.
   */
  disabled?: Ref<boolean | undefined>;
  /**
   * Defines how the pagination is applied by the user, e.g. using a select, lazy loading on scroll etc.
   *
   * @default "select"
   */
  type?: PaginationType;
  /**
   * Whether the data is currently loading after changing the current page.
   * Should only be used if pagination is async.
   */
  loading?: Ref<boolean>;
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

export type PaginationType = "select" | "lazy";
