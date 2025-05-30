import type { DensityProp } from "../../composables/density";
import type { Orientation } from "../../types";
import type { OnyxProgressStepProps } from "../OnyxProgressStep/types";

export type OnyxProgressStepsProps = DensityProp & {
  /**
   * List of available steps. The status and disabled state will be managed automatically if not defined but can be overridden per step.
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

export type ControlledProgressStep = Omit<OnyxProgressStepProps, "value" | "density">;
