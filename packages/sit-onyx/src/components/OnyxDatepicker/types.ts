import type { OnyxInputProps } from "../OnyxInput/types";

export type OnyxDatepickerProps = Omit<
  OnyxInputProps,
  "type" | "autocapitalize" | "maxlength" | "minlength" | "withCounter" | "pattern"
> & {
  /**
   * Datepicker type.
   */
  type?: DatepickerType;
};

export const DATEPICKER_TYPES = ["date", "datetime-local", "week", "month", "time"] as const;
export type DatepickerType = (typeof DATEPICKER_TYPES)[number];
