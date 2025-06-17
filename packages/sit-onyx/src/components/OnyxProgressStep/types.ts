import type { DensityProp } from "../../composables/density";
import type { SkeletonInjected } from "../../composables/useSkeletonState";

export type OnyxProgressStepProps = DensityProp & {
  /**
   * Visual label.
   */
  label: string;
  /**
   * The value/number of the step.
   */
  value: number;
  /**
   * The status of the progress step which indicates whether the step is currently active, upcoming or already visited/completed.
   */
  status?: ProgressStepStatus;
  /**
   * Icon to display instead of the numeric indicator.
   * If `status` is "completed", "visited" or "invalid", the icon will be pre-defined so passing a different icon does not work then.
   */
  icon?: string;
  /**
   * Whether the step is disabled and can not be interacted with.
   */
  disabled?: boolean;
  /**
   * Whether to show a skeleton step.
   */
  skeleton?: SkeletonInjected;
};

export const PROGRESS_STEP_STATUS = [
  "default",
  "active",
  "completed",
  "visited",
  "invalid",
] as const;
export type ProgressStepStatus = (typeof PROGRESS_STEP_STATUS)[number];
