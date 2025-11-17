import type { InjectionKey, Ref } from "vue";
import type { OnyxTabsProps } from "../OnyxTabs/types.js";

export type OnyxCodeTabsProps<TValue extends PropertyKey = PropertyKey> = Omit<
  OnyxTabsProps<TValue>,
  "size" | "density" | "stretched" | "label"
> &
  Partial<Pick<OnyxTabsProps<TValue>, "label">>;

export const CODE_TABS_INJECTION_KEY = Symbol() as InjectionKey<{
  /**
   * A map of tab values to their corresponding code snippets.
   * key = tab value, value = code snippet.
   */
  tabs: Ref<Map<PropertyKey, string>>;
}>;
