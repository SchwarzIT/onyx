import type { DensityProp } from "../../composables/density.js";
import type { SkeletonInjected } from "../../composables/useSkeletonState.js";
import type { Orientation } from "../../types/index.js";
import type { OnyxProgressItemProps } from "../OnyxProgressItem/types.js";

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
   * The highest value/step that the user has visited but not completed (independent from the active step).
   * Used to automatically managed the "visited" state of the steps.
   * If undefined, will be managed internally but can be set manually to e.g. reset the value if a new workflow has been started by the user.
   * First step = 1.
   */
  highestValue?: number;
  /**
   * Orientation of the steps.
   */
  orientation?: Orientation;
  /**
   * Whether to show all steps as skeleton. Can also be set on individual steps.
   */
  skeleton?: SkeletonInjected;
};

export type ControlledProgressStep = Omit<OnyxProgressItemProps, "value" | "density">;
