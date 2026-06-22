export type OnyxLinkDialogProps = {
  /**
   * Controls whether the dialog is open.
   */
  open: boolean;
  /**
   * The initial link when the dialog is opened.
   */
  initialLink?: string;
  /**
   * The initial text (label) when the dialog is opened.
   */
  initialText?: string;
  /**
   * Whether the text field is required.
   */
  textRequired?: boolean;
  /**
   * Whether the link field is required.
   */
  linkRequired?: boolean;
};
