import type { DensityProp } from "../../composables/density";

export type OnyxDialogProps = DensityProp & {
  /**
   * (Aria) label that describes the dialog. Required for accessibility / screen readers.
   */
  label: string;
  /**
   * Whether the dialog is open.
   */
  open?: boolean;
  /**
   * Whether the dialog is a modal.
   * If `true`, interaction with the rest of the page is prevented and a backdrop is displayed.
   * Also the `close` event is emitted when pressing "Escape".
   */
  modal?: boolean;
  /**
   * Whether the dialog is an [alert dialog](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/).
   * Should be set for better accessibility / screen reader support when the dialog
   * interrupts the user's workflow to communicate an important message and acquire a response,
   * e.g. a delete confirmation.
   */
  alert?: boolean;
};
