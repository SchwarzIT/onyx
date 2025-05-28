import type { DensityProp } from "../../composables/density";
import type { Orientation } from "../../types";
import type { OnyxProgressStepProps, ProgressStepStatus } from "../OnyxProgressStep/types";

export type OnyxProgressStepsProps = DensityProp & {
  /**
   * List of available steps.
   */
  steps: ControlledProgressStep[];
  /**
   * Value of the currently active step. First step = 1.
   */
  modelValue?: number;
  /**
   * Orientation of the steps.
   */
  orientation?: Orientation;
};

export type ControlledProgressStep = Omit<OnyxProgressStepProps, "status" | "value" | "density"> & {
  /**
   * The status of the progress step which indicates whether the step is currently active, upcoming or already visited/completed.
   */
  status?: Extract<ProgressStepStatus, "invalid">;
};
