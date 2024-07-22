import { computed, ref, type Ref } from "vue";
import { createBuilder } from "../../utils/builder";
import { createId } from "../../utils/id";
import { debounce } from "../../utils/timer";
import { useGlobalEventListener } from "../helpers/useGlobalListener";

type CreateMenuButtonOptions = {
  isExpanded: Ref<boolean>;
  onToggle: () => void;
};

/**
 * Based on https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/
 */
export const createMenuButton = createBuilder(
  ({ isExpanded, onToggle }: CreateMenuButtonOptions) => {
    const rootId = createId("menu-button-root");
    const menuId = createId("menu-button-list");
    const menuRef = ref<HTMLElement>();
    const buttonId = createId("menu-button-button");

    useGlobalEventListener({
      type: "keydown",
      listener: (e) => e.key === "Escape" && isExpanded.value && onToggle(),
      disabled: computed(() => !isExpanded.value),
    });

    /**
     * Debounced expanded state that will only be toggled after a given timeout.
     */
    const updateDebouncedExpanded = debounce(
      (expanded: boolean) => isExpanded.value !== expanded && onToggle(),
      200,
    );

    const focusRelativeItem = (next: "next" | "prev" | "first" | "last") => {
      const currentMenuItem = document.activeElement as HTMLElement;

      // Either the current focus is on a "menuitem", then we can just get the parent menu.
      // Or the current focus is on the button, then we can get the connected menu using the menuId
      const currentMenu = currentMenuItem?.closest('[role="menu"]') || menuRef.value;
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
        root: {
          id: rootId,
          onKeydown: handleKeydown,
          onMouseover: () => updateDebouncedExpanded(true),
          onMouseout: () => updateDebouncedExpanded(false),
          onFocusout: (event) => {
            // if focus receiving element is not part of the menu button, then close
            if (document.getElementById(rootId)?.contains(event.relatedTarget as HTMLElement)) {
              return;
            }
            isExpanded.value && onToggle();
          },
        },
        button: computed(
          () =>
            ({
              "aria-controls": menuId,
              "aria-expanded": isExpanded.value,
              "aria-haspopup": true,
              onFocus: () => !isExpanded.value && onToggle(),
              id: buttonId,
            }) as const,
        ),
        menu: {
          id: menuId,
          ref: menuRef,
          role: "menu",
          "aria-labelledby": buttonId,
          onClick: () => isExpanded.value && onToggle(),
        },
        ...createMenuItems().elements,
      },
    };
  },
);

export const createMenuItems = createBuilder(() => {
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
