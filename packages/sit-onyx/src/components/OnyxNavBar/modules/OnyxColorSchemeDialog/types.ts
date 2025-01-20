import type { OnyxModalDialogProps } from "../../../OnyxModalDialog/types";

export type OnyxColorSchemeDialogProps = Pick<OnyxModalDialogProps, "open" | "density"> & {
  /**
   * Currently active color scheme.
   */
  modelValue?: ColorSchemeValue;
};

export type ColorSchemeValue = "light" | "dark" | "auto";
