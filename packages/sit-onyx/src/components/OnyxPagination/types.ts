import type { DensityProp } from "../../composables/density.js";
import type { SkeletonInjected } from "../../composables/useSkeletonState.js";

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
};
