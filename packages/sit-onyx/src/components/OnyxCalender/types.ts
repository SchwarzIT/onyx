import type { DensityProp } from "../../composables/density.js";
import type { SkeletonInjected } from "../../composables/useSkeletonState.js";

export type OnyxCalderProps = DensityProp & {
  /**
   * The size of the calendar.
   */
  size?: OnyxCalderSize;
  /**
   * Whether the calendar should be disabled, preventing user interaction.
   */
  disabled?: boolean;
  /**
   * A skeleton component to be displayed while the calendar is loading.
   */
  skeleton?: SkeletonInjected;
  /**
   * The selection mode for dates (single, multiple, or a date range).
   */
  selection?: OnyxCalderSelection;
  /**
   * The first day of the week to be displayed.
   */
  weekStartDay?: OnyxWeekDays;
  /**
   * The earliest selectable date.
   */
  min?: Date;
  /**
   * The latest selectable date.
   */
  max?: Date;
  /**
   * Whether to display calendar week numbers.
   */
  displayCalendarWeek?: boolean;
  /**
   * The Date that should initially displayed
   */
  initialDate?: Date;
};
export type OnyxCalderSelection = "single";
export type OnyxCalderSize = "big" | "small" | "auto";
export type OnyxWeekDays =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";
