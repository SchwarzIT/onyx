import type { OnyxIconProps } from "../OnyxIcon/types.js";
import type { OnyxSupportDialogProps } from "../OnyxSupportDialog/types.js";

export type OnyxAlertModalProps = Pick<
  OnyxSupportDialogProps,
  "density" | "nonDismissible" | "label" | "open"
> & {
  /**
   * Optional icon to show.
   */
  icon?: Pick<OnyxIconProps, "icon" | "color">;
};
