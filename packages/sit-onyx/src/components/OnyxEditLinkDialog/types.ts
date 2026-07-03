import type { OnyxLinkProps } from "../OnyxLink/types.js";

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

export type EditLinkValue = OnyxLinkProps & {
  /**
   * User-friendly label to display instead of the link.
   */
  label?: string;
};
