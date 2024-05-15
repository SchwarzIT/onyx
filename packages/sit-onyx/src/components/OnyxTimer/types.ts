import type { DensityProp } from "../../composables/density";

export type OnyxTimerProps = DensityProp & {
  /**
   * The end time of the timer
   */
  endTime?: string;
  /**
   * optional label to show
   */
  label?: string;
  /**
   * label for minutes, e.g. "min"
   */
  minutesLabel?: string;
  /**
   * is the time paused
   */
  isPaused?: boolean;
};
