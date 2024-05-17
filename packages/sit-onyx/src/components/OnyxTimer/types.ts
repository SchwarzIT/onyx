import type { DensityProp } from "../../composables/density";

export type OnyxTimerProps = DensityProp & {
  /**
   * The end time of the timer. Supports all values of `new Date()`.
   */
  endTime: ConstructorParameters<typeof Date>[0];
  /**
   * optional label to show
   */
  label?: string;
};
