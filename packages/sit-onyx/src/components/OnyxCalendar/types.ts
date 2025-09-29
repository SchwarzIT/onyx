import type { OnyxHeadlessCalendarOptions } from "@sit-onyx/headless";
import type { DensityProp } from "../../composables/density.js";
import type { SkeletonInjected } from "../../composables/useSkeletonState.js";

export type OnyxCalendarProps = DensityProp &
  OnyxHeadlessCalendarOptions & {
    /**
     * The size of the calendar.
     */
    size?: OnyxCalendarSize;
    /**
     * A skeleton component to be displayed while the calendar is loading.
     */
    skeleton?: SkeletonInjected;
    /**
     * The selection mode for dates (single, multiple, or a date range).
     */
    selection?: OnyxCalendarSelection;
    /**
     * Whether to display calendar week numbers.
     */
    //TODO: Implement
    //  displayCalendarWeek?: boolean;
  };
// TODO: add multi & range
export type OnyxCalendarSelection = "single";
export type OnyxCalendarSize = "big" | "small" | "auto";
