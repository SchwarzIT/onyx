import type { SkeletonInjected } from "src/composables/useSkeletonState";
import type { InjectionKey, Ref } from "vue";
import type { DensityProp } from "../../composables/density";

export type OnyxAccordionProps = DensityProp & {
  /**
   *  if `true`, only one accordion item can be open at the same time.
   */
  exclusive?: boolean;
  /**
   * Disable the accordion.
   */
  disabled?: boolean;
  /**
   * If set, the specified number of skeleton accordions will be shown.
   */
  skeleton?: SkeletonInjected;
};

export type AccordionInjectionKey = InjectionKey<{
  /**
   * IDs of currently open AccordionItems.
   */
  openItems: Readonly<Ref<string[]>>;
  /**
   * Function to update the open state of an AccordionItem.
   * @param id - The unique ID of the AccordionItem.
   * @param value - Whether the AccordionItem should be open (true) or closed (false).
   */
  updateOpen: (id: string, value: boolean) => void;
  disabled: Ref<boolean>;
  skeleton: Ref<SkeletonInjected>;
}>;

export const ACCORDION_INJECTION_KEY = Symbol() as AccordionInjectionKey;
