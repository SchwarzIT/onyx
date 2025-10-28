import type { HTMLAttributes } from "vue";
import type { DensityProp } from "../../composables/density.js";
import type { OnyxColor } from "../../types/colors.js";
import type { OnyxCalendarSize } from "../OnyxCalendar/types.js";

export type OnyxCalendarCellProps = DensityProp & {
  /**
   * Numeric date / day of the month.
   */
  date: number;
  size: OnyxCalendarSize;
  is?: "div" | "button";
  /**
   * Whether the cell is disabled and can not be interacted with.
   */
  disabled?: boolean;
  /**
   * Whether to visually show the cell as disabled but still allow it to be interactive.
   */
  showAsDisabled?: boolean;
  /**
   * Optional highlight color.
   */
  color?: Extract<OnyxColor, "neutral" | "primary">;
  backgroundColor?: "tinted" | "blank";
  /**
   * Optionally define which range selection type the cell is currently active.
   */
  rangeType?: CalendarCellRangeType;
  buttonAttributes?: HTMLAttributes;
  /**
   * Optional tooltip text
   */
  toolTipText?: string;
};

export type CalendarCellRangeType = "start" | "middle" | "end";
