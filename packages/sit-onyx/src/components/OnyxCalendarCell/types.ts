import type { HTMLAttributes } from "vue";
import type { DensityProp } from "../../composables/density.js";
import type { OnyxColor } from "../../types/colors.js";

export type OnyxCalendarCellProps = DensityProp & {
  /**
   * Numeric date / day of the month.
   */
  date: number;
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
  /**
   * Optionally define which range selection type the cell is currently active.
   */
  rangeType?: CalendarCellRangeType;
  buttonAttributes?: HTMLAttributes;
};

export type CalendarCellRangeType = "start" | "middle" | "end";
