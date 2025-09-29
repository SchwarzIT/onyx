import type { OnyxHeadlessCalderProps } from "@sit-onyx/headless";
import type { DensityProp } from "../../composables/density.js";
import type { SkeletonInjected } from "../../composables/useSkeletonState.js";

export type OnyxCalderProps = DensityProp &
  OnyxHeadlessCalderProps & {
    /**
     * The size of the calendar.
     */
    size?: OnyxCalderSize;
    /**
     * A skeleton component to be displayed while the calendar is loading.
     */
    skeleton?: SkeletonInjected;
    /**
     * The selection mode for dates (single, multiple, or a date range).
     */
    selection?: OnyxCalderSelection;
    /**
     * Whether to display calendar week numbers.
     */
    //TODO: Implement
    //  displayCalendarWeek?: boolean;
  };
// TODO: add multi & range
export type OnyxCalderSelection = "single";
export type OnyxCalderSize = "big" | "small" | "auto";
