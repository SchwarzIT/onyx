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

  const isSelected = computed(() => {
    return (value: T) => getId(value).tabId === getId(unref(options.selectedTab)).tabId;
  });

  return {
    state: {
      /**
       * Function to check whether a tab with a given value is currently selected.
       */
      isSelected,
    },
    elements: {
      tablist: computed(() => ({
        role: "tablist",
        "aria-label": unref(options.label),
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
