import type { DensityProp } from "../../composables/density.js";
import type { SkeletonInjected } from "../../composables/useSkeletonState.js";
import type { Nullable } from "../../types/utils.js";
import type { DateValue } from "../OnyxDatePicker/types.js";

export type OnyxCalendarProps<TSelection extends OnyxCalendarSelection> = DensityProp & {
  /**
   * Selected Value
   */
  modelValue?: Nullable<OnyxCalendarValueBySelection<TSelection>>;

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
   * The month / year that is currently visible. If unset, it will be managed internally.
   * Useful if you want to switch the view month programmatically.
   * @default today
   */
  viewMonth?: Nullable<DateValue>;

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
   * Defines how dates are selected in the calendar.
   * If undefined, no selection will be possible.
   */
  selection?: TSelection;

  /**
   * Whether to show week numbers in the calendar.
   */
  showCalendarWeek?: boolean;
};

export type OnyxCalendarSelection = "single" | "multiple" | "range";
export type OnyxCalendarSize = "big" | "small" | "auto";
export type OnyxWeekDays =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type DateRange = { start: Date; end: Date };

export type OnyxCalendarValueBySelection<TSelection extends OnyxCalendarSelection> =
  TSelection extends "single"
    ? Date
    : TSelection extends "multiple"
      ? Date[]
      : TSelection extends "range"
        ? DateRange
        : never;
