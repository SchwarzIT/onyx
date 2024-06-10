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
};
