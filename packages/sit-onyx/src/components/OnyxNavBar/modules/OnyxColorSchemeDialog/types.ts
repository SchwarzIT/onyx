import type { OnyxSelectDialogProps } from "../../../OnyxSelectDialog/types.js";

export type OnyxColorSchemeDialogProps = Omit<
  OnyxSelectDialogProps,
  "label" | "modelValue" | "options"
> & {
  /**
   * Currently active color scheme.
   */
  modelValue: ColorSchemeValue;
};

export type ColorSchemeValue = "light" | "dark" | "auto";
