import type { OnyxInputProps } from "../OnyxInput/types";

// TODO: check autocomplete
export type OnyxDatePickerProps = Omit<
  OnyxInputProps,
  "type" | "modelValue" | "autocapitalize" | "maxlength" | "minlength" | "pattern"
> & {
  /**
   * Current date value. Supports all data types that are parsable by `new Date()`.
   */
  modelValue?: DateValue;
  /**
   * Whether the user should be able to select only date or date + time.
   */
  type?: "date" | "datetime";
};

/** Data types that are parsable as date via `new Date()`. */
export type DateValue = ConstructorParameters<typeof Date>[0];
