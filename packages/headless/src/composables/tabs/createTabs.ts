import { computed, unref, useId, type MaybeRef, type Ref } from "vue";
import { createBuilder } from "../../utils/builder.js";

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

    const enabledTabs = Array.from(
      tab.parentElement?.querySelectorAll('[role="tab"]') ?? [],
    ).filter((tab) => tab.ariaDisabled !== "true");

    const currentTabIndex = enabledTabs.indexOf(tab);

    const focusElement = (element?: Element | null) => {
      if (element instanceof HTMLElement) element.focus();
    };

    const focusFirstTab = () => focusElement(enabledTabs.at(0));
    const focusLastTab = () => focusElement(enabledTabs.at(-1));

    /**
     * Focuses the next/previous tab. Will ignore/skip disabled ones.
     */
    const focusTab = (direction: "next" | "previous") => {
      if (currentTabIndex === -1) return;
      const newIndex = direction === "next" ? currentTabIndex + 1 : currentTabIndex - 1;

      if (newIndex < 0) {
        return focusLastTab();
      } else if (newIndex >= enabledTabs.length) {
        return focusFirstTab();
      }

      return focusElement(enabledTabs.at(newIndex));
    };

    switch (event.key) {
      case "ArrowRight":
        focusTab("next");
        break;
      case "ArrowLeft":
        focusTab("previous");
        break;
      case "Home":
        focusFirstTab();
        break;
      case "End":
        focusLastTab();
        break;
      case "Enter":
      case " ":
        {
          const tabEntry = Array.from(idMap.entries()).find(([, { tabId }]) => tabId === tab.id);
          if (tabEntry) options.onSelect?.(tabEntry[0]);
        }
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
        return (data: { value: T; disabled?: boolean }) => {
          const { tabId: selectedTabId } = getId(unref(options.selectedTab));
          const { tabId, panelId } = getId(data.value);
          const isSelected = tabId === selectedTabId;

          return {
            id: tabId,
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": panelId,
            "aria-disabled": data.disabled ? true : undefined,
            onClick: () => options.onSelect?.(data.value),
            tabindex: isSelected && !data.disabled ? 0 : -1,
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
