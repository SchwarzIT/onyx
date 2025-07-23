import type { OnyxDialogProps } from "../OnyxDialog/types.js";
import type { OnyxIconProps } from "../OnyxIcon/types.js";

export type OnyxAlertModalProps = Omit<OnyxDialogProps, "modal" | "alert" | "alignment"> & {
  /**
   * Optional icon to show.
   */
  icon?: Omit<OnyxIconProps, "size">;
};
