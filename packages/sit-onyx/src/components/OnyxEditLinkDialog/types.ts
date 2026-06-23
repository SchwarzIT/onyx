export type OnyxEditLinkDialogProps = {
  /**
   * Current link value.
   */
  modelValue?: EditLinkValue;
  /**
   * Controls whether the dialog is open.
   */
  open?: boolean;
};

export type EditLinkValue = {
  /**
   * URL that the link points to.
   */
  href: string;
  /**
   * User-friendly label to display instead of the link.
   */
  label?: string;
};
