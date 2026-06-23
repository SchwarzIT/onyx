export type OnyxLinkDialogProps = {
  /**
   * Current link value.
   */
  modelValue?: LinkValue;
  /**
   * Controls whether the dialog is open.
   */
  open?: boolean;
};

export type LinkValue = {
  /**
   * URL that the link points to.
   */
  href: string;
  /**
   * User-friendly label to display instead of the link.
   */
  label?: string;
};
