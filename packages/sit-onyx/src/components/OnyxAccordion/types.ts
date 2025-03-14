import type { SkeletonInjected } from "src/composables/useSkeletonState";
import type { InjectionKey, Ref } from "vue";
import type { DensityProp } from "../../composables/density";
import type { Nullable } from "../../composables/useVModel";

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
}>;

export const ACCORDION_INJECTION_KEY = Symbol() as AccordionInjectionKey<PropertyKey>;
