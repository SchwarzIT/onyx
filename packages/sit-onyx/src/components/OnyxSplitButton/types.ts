import type { OnyxButtonProps } from "../OnyxButton/types.js";
import type { OnyxFlyoutMenuProps } from "../OnyxNavBar/modules/OnyxFlyoutMenu/types.js";

export type OnyxSplitButtonProps = Omit<OnyxButtonProps, "iconPosition" | "type"> &
  Pick<OnyxFlyoutMenuProps, "trigger" | "open">;
