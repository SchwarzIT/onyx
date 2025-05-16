import type { DialogAlignment } from "../OnyxDialog/types";
import type { OnyxModalDialogProps } from "../OnyxModalDialog/types";

export type OnyxDrawerProps = OnyxModalDialogProps & {
  /**
   * How to align the drawer horizontally.
   */
  alignment?: Exclude<DialogAlignment, "center">;
  /**
   * Whether the drawer is a modal (with backdrop). If set to `false`, the backdrop will be hidden.
   *
   * @default true
   */
  modal?: boolean;
};
