import { computed, type Ref } from "vue";
import { createBuilder } from "../../utils/builder";
import { createId } from "../../utils/id";

type CreateMenuButtonOptions = {
  isExpanded: Ref<boolean>;
  onToggle: () => void;
};

/**
 * Based on https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/
 */
export const createMenuButton = createBuilder(
  ({ isExpanded, onToggle }: CreateMenuButtonOptions) => {
    const menuId = createId("menu");
    const buttonId = createId("menu-button");

    const focusRelativeItem = (next: "next" | "prev" | "first" | "last") => {
      const currentMenuItem = document.activeElement as HTMLElement;

      // Either the current focus is on a "menuitem", then we can just get the parent menu.
      // Or the current focus is on the button, then we can get the connected menu using the menuId
      const currentMenu =
        currentMenuItem?.closest('[role="menu"]') || document.getElementById(menuId);
      if (!currentMenu) return;

      const menuItems = [...currentMenu.querySelectorAll<HTMLElement>('[role="menuitem"]')];
      let nextIndex = 0;

      if (currentMenuItem) {
        const currentIndex = menuItems.indexOf(currentMenuItem);
        switch (next) {
          case "next":
            nextIndex = currentIndex + 1;
            break;
          case "prev":
            nextIndex = currentIndex - 1;
            break;
          case "first":
            nextIndex = 0;
            break;
          case "last":
            nextIndex = menuItems.length - 1;
            break;
        }
      }

      const nextMenuItem = menuItems[nextIndex];
      nextMenuItem?.focus();
    };

    const handleKeydown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowDown":
        case "ArrowRight":
          event.preventDefault();
          focusRelativeItem("next");
          break;
        case "ArrowUp":
        case "ArrowLeft":
          event.preventDefault();
          focusRelativeItem("prev");
          break;
        case "Home":
          event.preventDefault();
          focusRelativeItem("first");
          break;
        case "End":
          event.preventDefault();
          focusRelativeItem("last");
          break;
        case " ":
          event.preventDefault();
          (event.target as HTMLElement).click();
          break;
        case "Escape":
          event.preventDefault();
          isExpanded.value && onToggle();
          break;
      }
    };

    return {
      elements: {
        button: computed(
          () =>
            ({
              "aria-controls": menuId,
              "aria-expanded": isExpanded.value,
              "aria-haspopup": true,
              id: buttonId,
              onKeydown: handleKeydown,
              onClick: onToggle,
            }) as const,
        ),
        menu: {
          id: menuId,
          role: "menu",
          "aria-labelledby": buttonId,
          onKeydown: handleKeydown,
        },
        ...createMenuItem({}).elements,
      },
    };
  },
);

export const createMenuItem = createBuilder(() => {
  return {
    elements: {
      listItem: {
        role: "none",
      },
      menuItem: (data: { active?: boolean; disabled?: boolean }) => ({
        "aria-current": data.active ? "page" : undefined,
        "aria-disabled": data.disabled,
        role: "menuitem",
      }),
    },
  };
});
