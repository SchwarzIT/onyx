import type { DensityProp } from "../../composables/density";

export type OnyxTimerProps = DensityProp & {
  /**
   * The end time of the timer
   */
  endTime: string;
  /**
   * optional label to show
   */
  label?: string;
  /**
   * is the timer paused
   */
  isPaused?: boolean;
};
