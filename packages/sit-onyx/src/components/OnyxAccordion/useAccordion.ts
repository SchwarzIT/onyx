import { ref, unref, type Ref } from "vue";

export function useAccordion(exclusive: Ref<boolean> | boolean) {
  const openItems = ref(new Set<string>());
  const updateOpen = (id: string, isOpen: boolean) => {
    if (!isOpen) {
      openItems.value.delete(id);
      return;
    }

    if (unref(exclusive)) openItems.value.clear();
    openItems.value.add(id);
  };

  return {
    openItems,
    updateOpen,
  };
}
