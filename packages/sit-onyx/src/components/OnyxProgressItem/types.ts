import type { DensityProp } from "../../composables/density.js";
import type { SkeletonInjected } from "../../composables/useSkeletonState.js";

export type OnyxProgressItemProps = DensityProp & {
  /**
   * Visual label.
   */
  label: string;
  /**
   * The value/number of the step.
   */
  value: number;
  /**
   * The status of the progress item which indicates whether the item is currently active, upcoming or already visited/completed.
   */
  status?: ProgressItemStatus;
  /**
   * Icon to display instead of the numeric indicator.
   * If `status` is "completed", "visited" or "invalid", the icon will be pre-defined so passing a different icon does not work then.
   */
  icon?: string;
  /**
   * Whether the item is disabled and can not be interacted with.
   */
  disabled?: boolean;
  /**
   * Whether to show a skeleton item.
   */
  skeleton?: SkeletonInjected;
};

export const PROGRESS_ITEM_STATUS = [
  "default",
  "active",
  "completed",
  "visited",
  "invalid",
] as const;
export type ProgressItemStatus = (typeof PROGRESS_ITEM_STATUS)[number];
