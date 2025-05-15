import type { DialogAlignment } from "../OnyxDialog/types";
import type { OnyxModalDialogProps } from "../OnyxModalDialog/types";

export type OnyxDrawerProps = OnyxModalDialogProps & {
  /**
   * How to align the drawer horizontally.
   */
  alignment?: Exclude<DialogAlignment, "center">;
  /**
   * Whether to hide the backdrop.
   */
  noBackdrop?: boolean;
};
