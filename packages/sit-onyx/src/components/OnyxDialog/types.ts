import type { DensityProp } from "../../composables/density.js";
import type { OnyxBasicDialogProps } from "../OnyxBasicDialog/types.js";
import type { OnyxBasicPopoverProps } from "../OnyxBasicPopover/types.js";

export type OnyxDialogProps = DensityProp &
  Omit<OnyxBasicPopoverProps, "role" | "fitParent"> &
  Pick<OnyxBasicDialogProps, "nonDismissible"> & {
    buttonText?: string;
  };
