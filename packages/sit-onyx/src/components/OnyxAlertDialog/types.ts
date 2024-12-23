import type { OnyxDialogProps } from "../OnyxDialog/types";
import type { OnyxIconProps } from "../OnyxIcon/types";

export type OnyxAlertDialogProps = Omit<OnyxDialogProps, "modal" | "alert"> & {
  /**
   * Optional icon to show.
   */
  icon?: Omit<OnyxIconProps, "size">;
};
