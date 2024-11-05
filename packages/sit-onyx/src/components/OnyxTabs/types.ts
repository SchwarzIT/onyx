import type { createTabs } from "@sit-onyx/headless";
import type { InjectionKey, Ref } from "vue";
import type { DensityProp } from "../../composables/density";

export type OnyxTabsProps<TValue extends PropertyKey = PropertyKey> = DensityProp & {
  /**
   * Label of the tabs. Needed for accessibility / screen readers.
   */
  label: string;
  /**
   * Currently active tab.
   */
  modelValue: TValue;
};

/**
 * Injection key to provide relevant context data from the tabs parent to the
 * individual child tab components.
 */
export const TABS_INJECTION_KEY = Symbol() as InjectionKey<{
  /**
   * Headless composable provided for child tabs for correct accessibility and behavior.
   */

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- needed to fix type error when using generics inside the OnyxTabs
  headless: ReturnType<typeof createTabs<any>>;
  /**
   * Ref to the parent tabs element where the child tabs should be teleported to
   * to maintain the correct HTML structure.
   */
  panelRef: Ref<HTMLElement | undefined>;
}>;
