import type { OnyxDialogProps } from "../OnyxDialog/types";

export type OnyxModalDialogProps = Omit<OnyxDialogProps, "modal"> & {
  /**
   * How to align the dialog horizontally. If "left" or "right", the modal will also be made full height.
   */
  alignment?: ModalDialogAlignment;
};

export const MODAL_DIALOG_ALIGNMENTS = ["left", "center", "right"] as const;
export type ModalDialogAlignment = (typeof MODAL_DIALOG_ALIGNMENTS)[number];
