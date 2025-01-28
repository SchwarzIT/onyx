import type { createTabs } from "@sit-onyx/headless";
import type { InjectionKey, Ref, ShallowRef } from "vue";
import type { DensityProp } from "../../composables/density";
import type { SkeletonProvidedProp } from "../../composables/useSkeletonState";
import type { HeadlineType } from "../OnyxHeadline/types";

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
    /**
     * Tab font size. Note: This only affects the visual size of the tab font and has NO effect on the semantic meaning.
     * Size will be aligned with the corresponding `OnyxHeadline` size.
     */
    size?: TabSize;
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
  panel: Readonly<ShallowRef<HTMLDivElement | null>>;
  /**
   * Tab size passed down from the parent so it can be set once for all tabs.
   */
  size: Ref<TabSize>;
}>;

/**
 * Injection key to provide relevant context data from the tabs parent to the
 * individual child tab components.
 */
export const TABS_INJECTION_KEY = Symbol() as TabsInjectionKey;

export type TabSize = Extract<HeadlineType, "h2" | "h3" | "h4">;
