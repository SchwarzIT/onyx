import type { DensityProp } from "../../composables/density.js";
import type { SkeletonInjected } from "../../composables/useSkeletonState.js";
import type { Nullable } from "../../types/utils.js";
import type { DateValue } from "../OnyxDatePicker/types.js";

export type OnyxCalendarProps<TSelection extends OnyxCalendarSelectionMode> = DensityProp & {
  /**
   * Selected Value
   */
  modelValue?: Nullable<OnyxCalendarValueBySelection<TSelection>>;

  /**
   * Whether the calendar is disabled.
   * * This can be a simple boolean to globally disable all interactions and selection,
   * or a **callback function** to disable specific dates individually.
   * @example
   * ```ts
   * // Globally disables the calendar
   * { disabled: true }
   * ```
   * @example
   * ```ts
   * // Disables only weekends (Saturday and Sunday)
   * { disabled: (date: Date) => date.getDay() === 0 || date.getDay() === 6 }
   * ```
   */
  disabled?: boolean | ((date: Date) => boolean);

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
  selectionMode?: TSelection;

  /**
   * Whether to show week numbers in the calendar.
   */
  showCalendarWeeks?: boolean;
};

export type OnyxCalendarSelectionMode = "single" | "multiple" | "range";
export type OnyxCalendarSize = "big" | "small" | "auto";
export type OnyxWeekDays =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type DateRange = { start: Date; end?: Date };

export type OnyxCalendarValueBySelection<TSelection extends OnyxCalendarSelectionMode> =
  TSelection extends "single"
    ? Date
    : TSelection extends "multiple"
      ? Date[]
      : TSelection extends "range"
        ? DateRange
        : never;
