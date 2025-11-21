import type { DensityProp } from "../../composables/density.js";
import type { SkeletonInjected } from "../../composables/useSkeletonState.js";

export type OnyxItemsPerPageProps = DensityProp & {
  /**
   * The current number of items per page.
   */
  modelValue: number;
  /**
   * The options for items per page selection.
   * Each option represents a possible number of items per page.
   *
   * @default [5, 10, 20, 30, 40, 75]
   */
  options?: number[];
  /**
   * Whether the items per page selector is disabled.
   * When true, the user cannot change the number of items per page.
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * An optional label for the items per page selector.
   *
   * @default "Results per Page"
   */
  label?: string;
  /**
   * Alignment of the label.
   *
   * @default "left"
   */
  labelAlignment?: "left" | "right";
  /**
   * Whether to show a skeleton pagination.
   */
  skeleton?: SkeletonInjected;
  /**
   * If `true`, the label will be visually hidden.
   * For accessibility / screen readers, the aria-label will still be set.
   */
  hideLabel?: boolean;
};

export const DEFAULT_ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 30, 40, 75];
