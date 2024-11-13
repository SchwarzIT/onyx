import type { createTabs } from "@sit-onyx/headless";
import type { InjectionKey, Ref } from "vue";
import type { DensityProp } from "../../composables/density";
import type { SkeletonProvidedProp } from "../../composables/useSkeletonState";

export type OnyxTabsProps<TValue extends PropertyKey = PropertyKey> = DensityProp &
  Partial<SkeletonProvidedProp> & {
    /**
     * Label of the tabs. Needed for accessibility / screen readers.
     */
    label: string;
    /**
     * Currently selected tab (`value` property of `OnyxTab` component).
     */
    modelValue: TValue;
    /**
     * If `true`, the tabs will be stretched to the full available width.
     */
    stretched?: boolean;
  };

export type TabsInjectionKey<TValue extends PropertyKey = PropertyKey> = InjectionKey<{
  /**
   * Headless composable provided for child tabs for correct accessibility and behavior.
   */
  headless: ReturnType<typeof createTabs<TValue>>;
  /**
   * Ref to the parent tabs element where the child tabs should be teleported to
   * to maintain the correct HTML structure.
   */
  panelRef: Ref<HTMLElement | undefined>;
}>;

/**
 * Injection key to provide relevant context data from the tabs parent to the
 * individual child tab components.
 */
export const TABS_INJECTION_KEY = Symbol() as TabsInjectionKey;
