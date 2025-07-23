import type { OnyxDialogProps } from "../OnyxDialog/types.js";
import type { OnyxIconProps } from "../OnyxIcon/types.js";

export type OnyxAlertModalProps = Pick<
  OnyxDialogProps,
  "density" | "disableClosingOnBackdropClick" | "label" | "open"
> & {
  /**
   * Optional icon to show.
   */
  icon?: Pick<OnyxIconProps, "icon" | "color">;
};
