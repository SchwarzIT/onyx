import type { createComboBox } from "@sit-onyx/headless";
import type { InjectionKey } from "vue";
import type { Nullable } from "../../types/utils.js";
import type { OnyxBasicDialogProps } from "../OnyxBasicDialog/types.js";
import type { OnyxGlobalSearchOptionProps } from "../OnyxGlobalSearchOption/types.js";
import type { OnyxSelectProps } from "../OnyxSelect/types.js";

export type OnyxGlobalSearchProps = Omit<OnyxBasicDialogProps, "modal" | "alignment" | "label"> &
  Pick<OnyxSelectProps<string, false>, "noFilter"> & {
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

export type GlobalSearchOption = Pick<OnyxGlobalSearchOptionProps, "label" | "icon" | "link"> & {
  /**
   * Unique value / ID of the option.
   */
  value: string;
};

export const GLOBAL_SEARCH_INJECTION_KEY = Symbol() as InjectionKey<{
  headless: ReturnType<typeof createComboBox<string, "list", false>>;
}>;
