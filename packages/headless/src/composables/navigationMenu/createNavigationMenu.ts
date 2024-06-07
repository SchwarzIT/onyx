import { createId } from "src/utils/id";
import { computed, ref } from "vue";

import { createBuilder } from "../../utils/builder";

export type NavigationMenuValue = string | number | boolean;

export const createNavigationMenu = createBuilder(<TValue extends NavigationMenuValue>() => {
  /**
   * Map for option IDs. key = option value, key = ID for the HTML element
   */
  const descendantKeyIdMap = new Map<TValue, string>();

  const getListId = (value: TValue) => {
    if (!descendantKeyIdMap.has(value)) {
      descendantKeyIdMap.set(value, createId("nav-list"));
    }
    return descendantKeyIdMap.get(value)!;
  };

  const expandedListId = ref<string>();

  return {
    elements: {
      button: computed(
        () => (data: { label: TValue }) =>
          ({
            "aria-controls": getListId(data.label),
            "aria-expanded": expandedListId.value === getListId(data.label),
            onclick: () => {
              expandedListId.value = getListId(data.label);
            },
          }) as const,
      ),
      menuItem: (data: { active?: boolean }) => ({
        "aria-current": data.active ? "page" : undefined,
      }),
    },
  };
});
