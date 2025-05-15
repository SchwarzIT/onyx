import { computed, useId, watch, type Ref } from "vue";
import { createBuilder, createElRef } from "../../utils/builder";
import { debounce } from "../../utils/timer";
import { useGlobalEventListener } from "../helpers/useGlobalListener";

type CreateMenuButtonOptions = {
  isExpanded: Readonly<Ref<boolean>>;
  trigger: Readonly<Ref<"hover" | "click">>;
  onToggle: () => void;
  disabled?: Readonly<Ref<boolean, boolean>>;
};

/**
 * Based on https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/
 */
export const createMenuButton = createBuilder((options: CreateMenuButtonOptions) => {
  const rootId = useId();
  const menuId = useId();
  const menuRef = createElRef<HTMLElement>();
  const buttonId = useId();

  useGlobalEventListener({
    type: "keydown",
    listener: (e) => e.key === "Escape" && setExpanded(false),
    disabled: computed(() => !options.isExpanded.value),
  });

  /**
   * Debounced expanded state that will only be toggled after a given timeout.
   */
  const updateDebouncedExpanded = debounce(() => options.onToggle(), 200);
  watch(options.isExpanded, () => updateDebouncedExpanded.abort()); // manually changing `isExpanded` should abort debounced action

  const setExpanded = (expanded: boolean, debounced = false) => {
    if (options.disabled?.value) return;
    if (expanded === options.isExpanded.value) {
      updateDebouncedExpanded.abort();
      return;
    }
    if (debounced) {
      updateDebouncedExpanded();
      return;
    }
    options.onToggle();
  };

  const focusRelativeItem = (next: "next" | "prev" | "first" | "last") => {
    const currentMenuItem = document.activeElement as HTMLElement;

    // Either the current focus is on a "menuitem", then we can just get the parent menu.
    // Or the current focus is on the button, then we can get the connected menu using the menuId
    const currentMenu = currentMenuItem?.closest('[role="menu"]') || menuRef.value;
    if (!currentMenu) return;

    const menuItems = Array.from(currentMenu.querySelectorAll<HTMLElement>('[role="menuitem"]'));
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
        if (event.target instanceof HTMLInputElement) break;
        event.preventDefault();
        (event.target as HTMLElement).click();
        break;
      case "Escape":
        event.preventDefault();
        setExpanded(false);
        break;
    }
  };

  const triggerEvents = () => {
    if (options.trigger.value === "hover") {
      return {
        onMouseenter: () => setExpanded(true),
        onMouseleave: () => setExpanded(false, true),
      };
    }
  };

  return {
    elements: {
      root: {
        id: rootId,
        onKeydown: handleKeydown,
        ...triggerEvents(),
        onFocusout: (event) => {
          // if focus receiving element is not part of the menu button, then close
          if (
            rootId &&
            document.getElementById(rootId)?.contains(event.relatedTarget as HTMLElement)
          ) {
            return;
          }
          setExpanded(false);
        },
      },
      button: computed(
        () =>
          ({
            "aria-controls": menuId,
            "aria-expanded": options.isExpanded.value,
            "aria-haspopup": true,
            onFocus: () => setExpanded(true, true),
            onClick: () =>
              options.trigger.value == "click" ? setExpanded(!options.isExpanded.value) : undefined,
            id: buttonId,
          }) as const,
      ),
      menu: {
        id: menuId,
        ref: menuRef,
        role: "menu",
        "aria-labelledby": buttonId,
        onClick: () => setExpanded(false),
      },
      ...createMenuItems().elements,
    },
  };
});

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
