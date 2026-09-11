import { computed, toValue, type MaybeRef, type MaybeRefOrGetter } from "vue";
import { createBuilder } from "../../utils/builder.js";

type UseTreeViewItemNavigationOptions = {
  /**
   * Whether the tree view item has nested children.
   */
  hasChildren: MaybeRefOrGetter<boolean>;
  /**
   * Whether the children of the tree view item are open.
   */
  isOpen: MaybeRef<boolean>;
  /**
   * The level of nesting that the item is placed inside the tree view.
   */
  level: MaybeRefOrGetter<number>;
  /**
   * Whether the item is disabled and can not be interacted with.
   */
  disabled?: MaybeRefOrGetter<boolean | undefined>;
  /**
   * Callback when the tree view item is selected.
   */
  onSelect?: () => void;
  /**
   * Callback when the open state is toggled.
   */
  onToggle?: (open: boolean) => void;
};

export const createTreeViewItem = createBuilder((options: UseTreeViewItemNavigationOptions) => {
  const disabled = computed(() => toValue(options.disabled));
  const level = computed(() => toValue(options.level));
  const hasChildren = computed(() => toValue(options.hasChildren));
  const isOpen = computed(() => toValue(options.isOpen));

  const toggleOpen = () => {
    if (disabled.value) return;
    if (hasChildren.value) {
      options.onToggle?.(!isOpen.value);
    }
    options.onSelect?.();
  };

  /**
   * Determines if a specific DOM element or its tree item wrapper is disabled.
   */
  const isElementDisabled = (item: HTMLElement): boolean => {
    if (item.hasAttribute("disabled") || item.getAttribute("aria-disabled") === "true") {
      return true;
    }

    const parentItem = item.parentElement?.closest('[role="treeitem"]');
    return parentItem?.getAttribute("aria-disabled") === "true";
  };

  /**
   * Crawls the parent tree structure to retrieve all currently visible, active tree items.
   */
  const getVisibleTreeItems = (triggerEl: HTMLElement): HTMLElement[] => {
    const rootTree = triggerEl.closest('[role="tree"]');
    if (!rootTree) return [];

    const allItems = Array.from(rootTree.querySelectorAll('[role="treeitem"]')) as HTMLElement[];
    return allItems.filter((item) => {
      const isVisible =
        item.offsetWidth > 0 || item.offsetHeight > 0 || item.getClientRects().length > 0;
      if (!isVisible) return false;

      return !isElementDisabled(item);
    });
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (disabled.value) return;

    const currentTrigger = event.currentTarget as HTMLElement;

    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        toggleOpen();
        break;

      case "ArrowRight":
        event.preventDefault();
        if (hasChildren.value) {
          if (isOpen.value) {
            const items = getVisibleTreeItems(currentTrigger);
            const currentIndex = items.indexOf(currentTrigger);
            if (currentIndex !== -1 && currentIndex < items.length - 1) {
              items[currentIndex + 1]!.focus();
            }
          } else {
            options.onToggle?.(true);
          }
        }
        break;

      case "ArrowLeft":
        event.preventDefault();
        if (hasChildren.value && isOpen.value) {
          options.onToggle?.(false);
        } else {
          const parentGroup = currentTrigger.closest('[role="group"]');
          if (parentGroup) {
            const parentTrigger = (parentGroup.closest('[role="treeitem"]') ||
              parentGroup.parentElement?.querySelector('[role="treeitem"]')) as HTMLElement;
            if (parentTrigger && parentTrigger !== currentTrigger) {
              parentTrigger.focus();
            }
          }
        }
        break;

      case "ArrowDown": {
        event.preventDefault();
        const items = getVisibleTreeItems(currentTrigger);
        const currentIndex = items.indexOf(currentTrigger);
        if (currentIndex !== -1 && currentIndex < items.length - 1) {
          items[currentIndex + 1]!.focus();
        }
        break;
      }

      case "ArrowUp": {
        event.preventDefault();
        const items = getVisibleTreeItems(currentTrigger);
        const currentIndex = items.indexOf(currentTrigger);
        if (currentIndex > 0) {
          items[currentIndex - 1]!.focus();
        }
        break;
      }

      case "Home": {
        event.preventDefault();
        const items = getVisibleTreeItems(currentTrigger);
        if (items.length > 0) {
          items[0]!.focus();
        }
        break;
      }

      case "End": {
        event.preventDefault();
        const items = getVisibleTreeItems(currentTrigger);
        if (items.length > 0) {
          items[items.length - 1]!.focus();
        }
        break;
      }
    }
  };

  return {
    elements: {
      treeItem: computed(() => ({
        role: "treeitem",
        "aria-expanded": hasChildren.value ? isOpen.value : undefined,
        "aria-level": level.value,
        "aria-disabled": disabled.value ? "true" : undefined,
        tabindex: disabled.value ? -1 : 0,
        onClick: toggleOpen,
        onKeydown: handleKeyDown,
      })),
    },
  };
});
