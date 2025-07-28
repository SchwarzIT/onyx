import type { DensityProp } from "../../composables/density.js";

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
   * Whether to prevent closing the dialog when clicking outside or pressing the `Escape` key.
   */
  nonDismissible?: boolean;
  /**
   * Whether the dialog is an [alert dialog](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/).
   * Should be set for better accessibility / screen reader support when the dialog
   * interrupts the user's workflow to communicate an important message and acquire a response,
   * e.g. a delete confirmation.
   */
  alert?: boolean;
  /**
   * How to align the dialog horizontally. If "left" or "right", the modal will also be made full height.
   */
  alignment?: DialogAlignment;
};

export const DIALOG_ALIGNMENTS = ["left", "center", "right"] as const;
export type DialogAlignment = (typeof DIALOG_ALIGNMENTS)[number];
