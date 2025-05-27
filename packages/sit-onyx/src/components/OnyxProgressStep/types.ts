import type { DensityProp } from "../../composables/density";

export type OnyxProgressStepProps = DensityProp & {
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
   * If `status` is "visited" or "invalid", the icon will be pre-defined so passing a different icon does not work then.
   */
  icon?: string;
};

export const PROGRESS_STEP_STATUS = ["default", "active", "visited", "invalid"] as const;
export type ProgressStepStatus = (typeof PROGRESS_STEP_STATUS)[number];
