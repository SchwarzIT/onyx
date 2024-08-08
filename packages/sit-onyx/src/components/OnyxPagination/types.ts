import type { DensityProp } from "../../composables/density";

export type OnyxPaginationProps = DensityProp & {
  /**
   *  The currently selected page (zero-based page index).
   */
  modelValue: number;
  /**
   *  The maximum number of pages.
   */
  pages: number;
  /**
   * The different style variants of the pagination:
   * `classic`: A pagination with many numbered page buttons surrounded by arrow buttons to navigate to pages.
   * `modern`: A less space consuming pagination, which provides a dropdown and arrow keys for the page selection.
   */
  type?: "modern" | "classic";
  /**
   * Whether to show a skeleton pagination.
   */
  skeleton?: boolean;
  /**
   * Whether the pagination should be disabled (e.g. while loading data).
   */
  disabled?: boolean;
};
