import { computed, unref, useId, type MaybeRef, type Ref } from "vue";
import { createBuilder } from "../../utils/builder";

type CreateTabsOptions<TKey extends PropertyKey = PropertyKey> = {
  /**
   * Label of the tablist.
   */
  label: MaybeRef<string>;
  /**
   * Currently selected tab.
   */
  selectedTab: Ref<TKey>;
  /**
   * Called when the user selects a tab.
   */
  onSelect?: (selectedTabValue: TKey) => void;
};

/**
 * Composable for implementing accessible tabs.
 * Based on https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
 */
export const createTabs = createBuilder(<T extends PropertyKey>(options: CreateTabsOptions<T>) => {
  /**
   * Map for looking up tab and panel IDs for given tab keys/values defined by the user.
   * Key = custom value from the user, value = random generated tab and panel ID
   */
  const idMap = new Map<T, { tabId: string; panelId: string }>();

  const getId = (value: T) => {
    if (!idMap.has(value)) {
      idMap.set(value, { tabId: useId(), panelId: useId() });
    }
    return idMap.get(value)!;
  };

  const handleKeydown = (event: KeyboardEvent) => {
    const tab = event.target as Element;

    const focusFirstTab = () => {
      const element = tab.parentElement?.querySelector('[role="tab"]');
      if (element instanceof HTMLElement) element.focus();
    };

    const focusLastTab = () => {
      const element = Array.from(tab.parentElement?.querySelectorAll('[role="tab"]') ?? []).at(-1);
      if (element instanceof HTMLElement) element.focus();
    };

    switch (event.key) {
      case "ArrowRight":
        if (tab.nextElementSibling && tab.nextElementSibling instanceof HTMLElement) {
          tab.nextElementSibling.focus();
        } else {
          focusFirstTab();
        }
        break;
      case "ArrowLeft":
        if (tab.previousElementSibling && tab.previousElementSibling instanceof HTMLElement) {
          tab.previousElementSibling.focus();
        } else {
          focusLastTab();
        }
        break;
      case "Home":
        focusFirstTab();
        break;
      case "End":
        focusLastTab();
        break;
    }
  };

  return {
    elements: {
      tablist: computed(() => ({
        role: "tablist",
        "aria-label": unref(options.label),
        onKeydown: handleKeydown,
      })),
      tab: computed(() => {
        return (data: { value: T }) => {
          const { tabId: selectedTabId } = getId(unref(options.selectedTab));
          const { tabId, panelId } = getId(data.value);
          const isSelected = tabId === selectedTabId;

          return {
            id: tabId,
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": panelId,
            onClick: () => options.onSelect?.(data.value),
            tabindex: isSelected ? 0 : -1,
          } as const;
        };
      }),
      tabpanel: computed(() => {
        return (data: { value: T }) => {
          const { tabId, panelId } = getId(data.value);

          return {
            id: panelId,
            role: "tabpanel",
            "aria-labelledby": tabId,
          } as const;
        };
      }),
    },
  };
});
