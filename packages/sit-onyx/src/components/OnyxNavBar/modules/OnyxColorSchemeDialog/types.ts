import type { OnyxSelectDialogProps } from "../../../OnyxSelectDialog/types";

export type OnyxColorSchemeDialogProps = Omit<
  OnyxSelectDialogProps,
  "label" | "modelValue" | "options"
> & {
  /**
   * Currently active color scheme.
   */
  modelValue?: ColorSchemeValue;
};

export type ColorSchemeValue = "light" | "dark" | "auto";
