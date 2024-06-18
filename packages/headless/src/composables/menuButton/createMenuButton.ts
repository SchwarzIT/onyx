import { computed, ref } from "vue";
import { createBuilder } from "../../utils/builder";
import { createId } from "../../utils/id";
import { debounce } from "../../utils/timer";

export type CreateMenuButtonOptions = {
  /**
   * Called when a menu item is selected (via mouse or keyboard).
   */
  onSelect: (value: string) => void;
};

export const createMenuButton = createBuilder((options: CreateMenuButtonOptions) => {
  const menuId = createId("menu");
  const buttonId = createId("menu-button");
  const isExpanded = ref<boolean>(false);

  /**
   * Debounced expanded state that will only be toggled after a given timeout.
   */
  const updateDebouncedExpanded = debounce(
    (expanded: boolean) => (isExpanded.value = expanded),
    400,
  );

  const hoverEvents = computed(() => {
    return {
      onMouseover: () => (isExpanded.value = true),
      onMouseout: () => updateDebouncedExpanded(false),
      onFocusin: () => (isExpanded.value = true),
      onFocusout: () => (isExpanded.value = false),
    };
  });

  return {
    state: { isExpanded },
    elements: {
      button: computed(
        () =>
          ({
            "aria-controls": menuId,
            "aria-expanded": isExpanded.value,
            "aria-haspopup": true,
            id: buttonId,
            ...hoverEvents.value,
          }) as const,
      ),
      listItem: {
        role: "none",
      },
      flyout: {
        ...hoverEvents.value,
      },
      menu: {
        id: menuId,
        role: "menu",
        "aria-labelledby": buttonId,
      },
      menuItem: (data: { active?: boolean; value: string }) => ({
        "aria-current": data.active ? "page" : undefined,
        role: "menuitem",
        tabindex: -1,
        onClick: () => {
          options.onSelect(data.value);
        },
      }),
    },
  };
});
