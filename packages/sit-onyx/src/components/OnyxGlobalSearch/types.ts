import type { Nullable } from "../../types/utils.js";
import type { OnyxBasicDialogProps } from "../OnyxBasicDialog/types.js";

export type OnyxGlobalSearchProps = Omit<OnyxBasicDialogProps, "modal" | "alignment" | "label"> & {
  /**
   * The current search term.
   */
  modelValue?: Nullable<string>;
};
