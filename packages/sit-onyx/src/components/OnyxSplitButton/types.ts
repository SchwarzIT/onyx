import type { OnyxButtonProps } from "../OnyxButton/types.js";
import type { OnyxFlyoutMenuProps } from "../OnyxNavBar/modules/OnyxFlyoutMenu/types.js";

export type OnyxSplitButtonProps = OnyxButtonProps &
  Pick<OnyxFlyoutMenuProps, "trigger" | "open" | "alignment" | "position">;
