import type { createTabs } from "@sit-onyx/headless";
import type { InjectionKey, Ref } from "vue";
import type { DensityProp } from "../../composables/density";

export type OnyxTabsProps = DensityProp & {
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
  /**
   * Headless composable provided for child tabs for correct accessibility and behavior.
   */
  headless: ReturnType<typeof createTabs>;
  /**
   * Ref to the parent tabs element where the child tabs should be teleported to
   * to maintain the correct HTML structure.
   */
  panelRef: Ref<HTMLElement | undefined>;
}>;
