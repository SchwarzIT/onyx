import type { DensityProp } from "../../composables/density.js";
import type { SkeletonInjected } from "../../composables/useSkeletonState.js";
import type { OnyxBreakpoint } from "../../utils/breakpoints.js";

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
   * The display type of the pagination.
   *
   * @default select
   */
  type?: PaginationType;
  /**
   * Whether to disable the select flyout for selecting a specific page.
   * Useful when using cursor-based pagination where jumping to a specific page is not possible.
   */
  disableFlyout?: boolean;
  /**
   * Whether the pagination type should be automatically switched to "compact" if the screen width is below a given breakpoint.
   * Can be set to a boolean or a specific breakpoint. If set to `true`, the "xs" breakpoint is used.
   */
  autoCompact?: boolean | number | OnyxBreakpoint;
};

export type PaginationType = "select" | "inline" | "compact";
