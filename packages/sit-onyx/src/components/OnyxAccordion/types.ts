import type { InjectionKey, Ref } from "vue";
import type { DensityProp } from "../../composables/density.js";
import type { SkeletonInjected } from "../../composables/useSkeletonState.js";
import type { Nullable } from "../../types/index.js";

export type OnyxAccordionProps<TValue extends PropertyKey> = DensityProp & {
  /**
   * Currently opened items. Will include the `value` property of the nested `OnyxAccordionItems`.
   */
  modelValue?: Nullable<TValue[]>;
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
  /**
   * Accordion type. Will have different visual representations.
   * Please note that "nested-large" and "nested-small" should only be used inside other components like e.g. the [OnyxSidebar](https://storybook.onyx.schwarz/?path=/docs/navigation-sidebar--default).
   */
  type?: AccordionType;
};

export type AccordionInjectionKey<TValue extends PropertyKey> = InjectionKey<{
  /**
   * IDs of currently open AccordionItems.
   */
  openItems: Readonly<Ref<PropertyKey[]>>;
  /**
   * Function to update the open state of an AccordionItem.
   * @param id - The unique ID of the AccordionItem.
   * @param value - Whether the AccordionItem should be open (true) or closed (false).
   */
  updateOpen: (id: TValue, value: boolean) => void;
  disabled: Ref<boolean>;
  skeleton: Ref<SkeletonInjected>;
  type: Ref<AccordionType>;
}>;

export const ACCORDION_INJECTION_KEY = Symbol() as AccordionInjectionKey<PropertyKey>;

export const ACCORDION_TYPES = ["default", "nested-large", "nested-small"] as const;
export type AccordionType = (typeof ACCORDION_TYPES)[number];
