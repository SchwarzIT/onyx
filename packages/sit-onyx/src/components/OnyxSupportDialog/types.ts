export interface OnyxSupportDialogProps {
  /**
   *    Set position on the screen.
   */
  position?: "left" | "right";
  /**
   *    Use this flag to show/hide the close button of the dialog.
   */
  closable?: boolean;
  /**
   *    Use this flag to make the dialog closable, when the user click outside.
   */
  closeOnOutsideClick?: boolean;
  /**
   *    Use this property to set offset from the top of the screen.
   */
  topOffset?: number;
}
