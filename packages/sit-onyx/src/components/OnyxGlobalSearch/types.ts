import type { createComboBox } from "@sit-onyx/headless";
import type { InjectionKey, Ref } from "vue";
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
};

export const GLOBAL_SEARCH_INJECTION_KEY = Symbol() as InjectionKey<{
  headless: ReturnType<typeof createComboBox<string, "list", false>>;
  activeValue: Ref<string | undefined>;
}>;
