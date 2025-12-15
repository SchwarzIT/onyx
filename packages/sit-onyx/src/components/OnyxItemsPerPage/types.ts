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
   */
  options: number[];
  /**
   * Whether the items per page selector is disabled.
   * When true, the user cannot change the number of items per page.
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * Alignment of the label.
   *
   * @default "right"
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
