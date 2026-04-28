import {
  computed,
  onBeforeUnmount,
  toValue,
  useId,
  watch,
  type MaybeRef,
  type MaybeRefOrGetter,
  type Ref,
} from "vue";
import { createBuilder, createElRef } from "../../utils/builder.js";
import { debounce } from "../../utils/timer.js";
import { useGlobalEventListener } from "../helpers/useGlobalListener.js";
import { useOutsideClick } from "../helpers/useOutsideClick.js";

type CreateMenuButtonOptions = {
  isExpanded: Readonly<Ref<boolean>>;
  trigger: Readonly<MaybeRef<"hover" | "click">>;
  onToggle: () => void;
  disabled?: Readonly<Ref<boolean>>;
  /**
   * Whether the menu button opens to the top or bottom. Defines the keyboard navigation behavior (e.g. Arrow up and down).
   *
   * @default "bottom"
   */
  position?: MaybeRef<"top" | "bottom">;
};

/**
 * Based on https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/
 */
export const createMenuButton = createBuilder((options: CreateMenuButtonOptions) => {
  const rootId = useId();
  const menuId = useId();
  const rootRef = createElRef<HTMLElement>();
  const menuRef = createElRef<HTMLElement>();
  const buttonId = useId();

  const position = computed(() => toValue(options.position) ?? "bottom");

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

    const menuItems = Array.from(currentMenu.querySelectorAll<HTMLElement>('[role="menuitem"]'))
      // filter out nested children
      .filter((item) => item.closest('[role="menu"]') === currentMenu);
    if (position.value === "top") menuItems.reverse();
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
        event.preventDefault();
        focusRelativeItem(position.value === "bottom" ? "next" : "prev");
        break;
      case "ArrowUp":
        event.preventDefault();
        focusRelativeItem(position.value === "bottom" ? "prev" : "next");
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
      case "Enter":
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

  const triggerEvents = computed(() => {
    if (toValue(options.trigger) !== "hover") return;
    return {
      onMouseenter: () => setExpanded(true),
      onMouseleave: () => setExpanded(false, true),
    };
  });

  useOutsideClick({
    inside: rootRef,
    onOutsideClick: () => setExpanded(false),
    disabled: computed(() => !options.isExpanded.value),
    checkOnTab: true,
  });

  return {
    elements: {
      root: computed(() => ({
        id: rootId,
        onKeydown: handleKeydown,
        ref: rootRef,
        ...triggerEvents.value,
      })),
      button: computed(
        () =>
          ({
            "aria-controls": menuId,
            "aria-expanded": options.isExpanded.value,
            "aria-haspopup": true,
            onFocus: () => setExpanded(true, true),
            onClick: () =>
              toValue(options.trigger) == "click"
                ? setExpanded(!options.isExpanded.value)
                : undefined,
            id: buttonId,
            disabled: options.disabled?.value,
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

type CreateMenuItemOptions = {
  /** Current expanded state of the menu item (for nested children). */
  isExpanded?: Ref<boolean>;
  /** Whether the menu item renders its children in an external flyout. */
  isExternal?: MaybeRefOrGetter<boolean>;
  /** Whether the menu item is disabled. */
  disabled?: MaybeRefOrGetter<boolean>;
  /** DOM element ref of the external children wrapper (used for focus checks). */
  externalChildrenRef?: Readonly<Ref<HTMLElement | null>>;
  /** Called when the menu item should be opened (if it has nested children). */
  onOpen?: () => void;
  /** Called when the menu item should be closed.*/
  onClose?: () => void;
  /** Called when the external children should close and focus the trigger. */
  onFocusTrigger?: () => void;
  /** Called to notify a parent menu of a hover enter event. */
  onHoverEnterParent?: () => void;
  /** Called to notify a parent menu of a hover leave event. */
  onHoverLeaveParent?: () => void;
  openingArrowDirection?: MaybeRefOrGetter<"ArrowRight" | "ArrowLeft">;
};

export const createMenuItems = createBuilder((options?: CreateMenuItemOptions) => {
  const {
    isExpanded,
    isExternal,
    disabled,
    externalChildrenRef,
    onOpen,
    onClose,
    onFocusTrigger,
    onHoverEnterParent,
    onHoverLeaveParent,
    openingArrowDirection = "ArrowRight",
  } = options || {};

  const debouncedClose = debounce(() => {
    if (isExpanded) isExpanded.value = false;
  }, 300);

  onBeforeUnmount(() => {
    debouncedClose.abort();
  });

  const handleClose = () => {
    debouncedClose.abort();
    if (isExpanded) isExpanded.value = false;
    onClose?.();
  };

  const handleTriggerMouseEnter = (event?: Event) => {
    if (toValue(isExternal) && !toValue(disabled)) {
      if (event?.type === "focusin") {
        const focusEvent = event as FocusEvent;
        const relatedTarget = focusEvent.relatedTarget as Node | null;
        const target = focusEvent.target as Node | null;

        const externalNode = toValue(externalChildrenRef);
        const isFocusInsidePopover = externalNode?.contains(target);

        if (!isFocusInsidePopover && relatedTarget && externalNode?.contains(relatedTarget)) {
          debouncedClose.abort();
          return;
        }
      }

      debouncedClose.abort();
      if (isExpanded) isExpanded.value = true;
    }
  };

  const handleTriggerMouseLeave = () => {
    if (toValue(isExternal)) {
      debouncedClose.abort();
      debouncedClose();
    }
  };

  const handlePopoverMouseEnter = (event?: Event) => {
    handleTriggerMouseEnter(event);
    onHoverEnterParent?.();
  };

  const handlePopoverMouseLeave = () => {
    handleTriggerMouseLeave();
    onHoverLeaveParent?.();
  };

  const onKeydown = (event: KeyboardEvent) => {
    const resolvedKey = toValue(openingArrowDirection);

    switch (event.key) {
      case resolvedKey:
      case " ":
      case "Enter":
        event.preventDefault();
        onOpen?.();
        break;
    }
  };

  const getClosingArrowDirection = () => {
    return toValue(openingArrowDirection) === "ArrowRight" ? "ArrowLeft" : "ArrowRight";
  };

  const onBackButtonKeydown = (event: KeyboardEvent) => {
    const closeKey = getClosingArrowDirection();
    if ([closeKey, " ", "Enter"].includes(event.key)) {
      event.preventDefault();
      event.stopPropagation();
      handleClose();
    }
  };

  const onExternalChildrenKeydown = (event: KeyboardEvent) => {
    const closeKey = getClosingArrowDirection();
    if (event.key === closeKey) {
      event.preventDefault();
      event.stopPropagation();
      onFocusTrigger?.();
    }
  };

  return {
    elements: {
      listItem: {
        role: "none",
        onMouseenter: handleTriggerMouseEnter,
        onMouseleave: handleTriggerMouseLeave,
        onFocusin: handleTriggerMouseEnter,
        onFocusout: handleTriggerMouseLeave,
      },
      menuItem: (data: { active?: boolean; disabled?: boolean }) => ({
        "aria-current": data.active ? "page" : undefined,
        "aria-disabled": data.disabled,
        role: "menuitem",
        onKeydown,
      }),
      internalChildren: {
        role: "menu",
      },
      backButton: {
        onKeydown: onBackButtonKeydown,
        onClick: (event: Event) => {
          event.stopPropagation();
          handleClose();
        },
      },
      externalChildren: {
        role: "presentation",
        tabindex: -1,
        onKeydown: onExternalChildrenKeydown,
        onMouseenter: handlePopoverMouseEnter,
        onMouseleave: handlePopoverMouseLeave,
        onFocusin: handlePopoverMouseEnter,
        onFocusout: handlePopoverMouseLeave,
      },
    },
    internals: {
      handlePopoverMouseEnter,
      handlePopoverMouseLeave,
    },
  };
});
