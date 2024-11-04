import type { createTabs } from "@sit-onyx/headless";
import type { InjectionKey, Ref } from "vue";

export type OnyxTabsProps = {
  /**
   * Label of the tabs. Needed for accessibility / screen readers.
   */
  label: string;
  /**
   * Currently active tab.
   */
  modelValue: PropertyKey;
};

/**
 * Injection key to provide relevant context data from the tabs parent to the
 * individual child tab components.
 */
export const TABS_INJECTION_KEY = Symbol() as InjectionKey<{
  headless: ReturnType<typeof createTabs>;
  panelRef: Ref<HTMLElement | undefined>;
}>;
