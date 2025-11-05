import type { Nullable } from "../../types/utils.js";
import type { OnyxBasicDialogProps } from "../OnyxBasicDialog/types.js";

export type OnyxGlobalSearchProps = Omit<OnyxBasicDialogProps, "modal" | "alignment" | "label"> & {
  /**
   * The current search term.
   */
  modelValue?: Nullable<string>;
  /**
   * Whether the search is currently loading results.
   */
  loading?: boolean;
  /**
   * Search result groups to display.
   */
  groups?: GlobalSearchGroup[];
};

export type GlobalSearchGroup = {
  /**
   * Label / headline of the group.
   */
  label: string;
  /**
   * A list of options / search results to display for this group.
   */
  options: GlobalSearchOption[];
};

export type GlobalSearchOption = {
  /**
   * Label / name of the search option / result.
   */
  label: string;
  /**
   * Optional icon to show.
   */
  icon?: string;
};
