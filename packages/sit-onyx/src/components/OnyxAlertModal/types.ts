import type { OnyxBasicDialogProps } from "../OnyxBasicDialog/types.js";
import type { OnyxIconProps } from "../OnyxIcon/types.js";

export type OnyxAlertModalProps = Pick<
  OnyxBasicDialogProps,
  "density" | "nonDismissible" | "label" | "open"
> & {
  /**
   * Optional icon to show.
   */
  icon?: Pick<OnyxIconProps, "icon" | "color">;
};
