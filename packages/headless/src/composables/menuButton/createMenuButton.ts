import { computed, ref } from "vue";
import { createBuilder } from "../../utils/builder";
import { createId } from "../../utils/id";

/**
 * Purpose of the onSelect function is to set selected option (page) as active
 */
export type CreateMenuButtonOptions = { onSelect: (value: string) => void };

export const createMenuButton = createBuilder((options: CreateMenuButtonOptions) => {
  const menuId = createId("menu");
  const buttonId = createId("menu-button");
  const isExpanded = ref<boolean>(false);

  return {
    state: { isExpanded },
    elements: {
      parentComponent: {
        onMouseover: () => {
          isExpanded.value = true;
        },
        onMouseleave: () => {
          isExpanded.value = false;
        },
        onFocusin: () => {
          isExpanded.value = true;
        },
      },
      button: computed(
        () =>
          ({
            "aria-controls": menuId,
            "aria-expanded": isExpanded.value,
            "aria-haspopup": true,
            id: buttonId,
            onClick: () => {
              isExpanded.value = !isExpanded.value;
            },
          }) as const,
      ),
      listItem: {
        role: "none",
      },
      menu: {
        id: menuId,
        role: "menu",
        "aria-labelledby": buttonId,
      },
      menuItems: (data: { active?: boolean; value: string }) => ({
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
