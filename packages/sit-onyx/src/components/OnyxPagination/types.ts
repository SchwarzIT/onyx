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
  /**
   * The display type of the pagination
   *
   * @default select
   */
  type?: PaginationType;
  /**
   * If `true`, the flyout inside the compact pagination is disabled and the user cannot open it.
   * Useful in the case of cursor-based pagination where it is not possible to jump to a specific page.
   *
   * @default false
   */
  compactFlyoutDisabled?: boolean;
  /**
   * If `true`, the pagination for breakpoints less than `xs` will automatically switch to `compact` type.
   * Can be optionally disabled to always use the specified `type` prop.
   *
   * @default true
   */
  autoTypeDetection?: boolean;
};

export type PaginationType = "select" | "inline" | "compact";
