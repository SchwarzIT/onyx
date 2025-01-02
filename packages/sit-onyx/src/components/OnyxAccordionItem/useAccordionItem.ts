import { computed, inject } from "vue";
import { ACCORDION_INJECTION_KEY } from "../OnyxAccordion/types";

export function useAccordionItem(itemId: string) {
  const accordionContext = inject(ACCORDION_INJECTION_KEY);

  const isOpen = computed({
    get: () => accordionContext?.openItems.value.has(itemId) || false,
    set: (value: boolean) => {
      accordionContext?.updateOpen(itemId, value);
    },
  });
  return {
    accordionContext,
    isOpen,
  };
}
