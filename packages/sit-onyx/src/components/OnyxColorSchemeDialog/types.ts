import type { OnyxDialogProps } from "../OnyxDialog/types";

export type OnyxColorSchemeDialogProps = Pick<OnyxDialogProps, "open" | "density"> & {
  modelValue: ColorSchemeValue;
};

export type ColorSchemeValue = "light" | "dark" | "auto";
