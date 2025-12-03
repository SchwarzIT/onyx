import type { Nullable } from "../../types/index.js";
import type { OnyxInputProps } from "../OnyxInput/types.js";

export type OnyxDatePickerProps = Omit<
  OnyxInputProps,
  | "type"
  | "modelValue"
  | "autocapitalize"
  | "maxlength"
  | "minlength"
  | "pattern"
  | "withCounter"
  | "placeholder"
  | "autocomplete"
> & {
  /**
   * A date string compliant with [ISO8601](https://en.wikipedia.org/wiki/ISO_8601).
   * @example "date.toISOString()"
   * @example "2011-10-31"
   */
  modelValue?: Nullable<string>;
  /**
   * Whether the user should be able to select only date, time or date + time.
   */
  type?: "date" | "datetime-local" | "time";
  /**
   * Min. / earliest selectable date (inclusive).
   * When using `type="datetime-local"`, the user can still select a invalid time but the datepicker will show an error.
   */
  min?: DateValue;
  /**
   * Max. / latest selectable date (inclusive).
   * When using `type="datetime-local"`, the user can still select a invalid time but the datepicker will show an error.
   */
  max?: DateValue;
  /**
   * Defines the granularity of the time input in seconds.
   *
   * * When `step` is set to less than 60 (e.g., 1 or 30), it enables the
   * input and selection of seconds (HH:MM:SS) in the browser UI.
   */
  step?: number;
};

/** Data types that are parsable as date via `new Date()`. */
export type DateValue = ConstructorParameters<typeof Date>[0];
