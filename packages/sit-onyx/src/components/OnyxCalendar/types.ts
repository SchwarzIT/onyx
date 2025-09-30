import type { DensityProp } from "../../composables/density.js";
import type { SkeletonInjected } from "../../composables/useSkeletonState.js";

export type OnyxCalendarProps = DensityProp & {
  /**
   * Whether the calendar is disabled. Disables all interactions and prevents date selection.
   */
  disabled?: boolean;

  /**
   * The earliest selectable date. Dates before this will be disabled.
   */
  min?: Date;

  /**
   * The latest selectable date. Dates after this will be disabled.
   */
  max?: Date;

  /**
   * The first day of the week displayed in the calendar.
   * @default Monday
   */
  weekStartDay?: OnyxWeekDays;

  /**
   * The initial date to display when the calendar is first rendered.
   * @default today
   */
  initialDate?: Date;

  /**
   * The visual size of the calendar.
   * - "big": larger layout with more spacing and bigger text
   * - "small": compact layout
   * - "auto": adjusts based on container or viewport
   */
  size?: OnyxCalendarSize;

  /**
   * Skeleton component to display while the calendar is loading.
   */
  skeleton?: SkeletonInjected;

  /**
   * The selection mode for dates.
   * TODO: support "multiple" and "range".
   */
  selection?: OnyxCalendarSelection;

  /**
   * Whether to display week numbers in the calendar.
   * TODO: Implement feature.
   */
  // displayCalendarWeek?: boolean;
};

// TODO: add multi & range support
export type OnyxCalendarSelection = "single";
export type OnyxCalendarSize = "big" | "small" | "auto";
export type OnyxWeekDays =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";
