import type { DensityProp } from "../../composables/density.js";
import type { SkeletonInjected } from "../../composables/useSkeletonState.js";
import type { SelectLazyLoading } from "../OnyxSelect/types.js";

export type OnyxPaginationProps = DensityProp & {
  /**
   * The currently selected page (first page is `1`).
   */
  modelValue: number;
  /**
   *  The maximum number of pages.
   */
  pages: number;
  /**
   * Whether the pagination should be disabled (e.g. while loading data).
   */
  disabled?: boolean;
  /**
   * Whether to show a skeleton pagination.
   */
  skeleton?: SkeletonInjected;
  /**
   * Define how to lazy load the select options.
   * To prevent performance issues, the select will only render X options initially and load X more when the users scrolls to the bottom of the flyout.
   */
  lazyLoading?: PaginationLazyLoading;
};

export type PaginationLazyLoading = Pick<SelectLazyLoading, "scrollOffset"> & {
  /**
   * How many options are lazy loaded per page (and when the user scrolls to the bottom of the options).
   *
   * @default 50
   */
  pageSize?: number;
};
