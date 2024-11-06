import type { OnyxInputProps } from "../OnyxInput/types";

// TODO: check autocomplete
export type OnyxDatepickerProps = Omit<
  OnyxInputProps,
  "type" | "modelValue" | "autocapitalize" | "maxlength" | "minlength" | "pattern"
> & {
  /**
   * Current date value. Supports all data types that are parsable by `new Date()`.
   */
  modelValue?: ConstructorParameters<typeof Date>[0];
  /**
   * Whether the user should be able to select only date or date + time.
   */
  type?: "date" | "datetime";
};
