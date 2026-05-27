import { computed, type Ref } from "vue";

export interface UseTreeViewItemNavigationOptions {
  disabled: Ref<boolean> | boolean;
  isOpen: Ref<boolean>;
  hasChildren: Ref<boolean>;
  currentDepth: Ref<number> | number;
  emitSelect: () => void;
}

export function createTreeViewItem(options: UseTreeViewItemNavigationOptions) {
  const disabled = computed(() =>
    typeof options.disabled === "boolean" ? options.disabled : options.disabled.value,
  );

  const currentDepth = computed(() =>
    typeof options.currentDepth === "number" ? options.currentDepth : options.currentDepth.value,
  );

  const isOpen = options.isOpen;
  const hasChildren = options.hasChildren;

  const toggleOpen = () => {
    if (disabled.value) return;
    if (hasChildren.value) {
      isOpen.value = !isOpen.value;
    }
    options.emitSelect();
  };

  /**
   * Determines if a specific DOM element or its tree item wrapper is disabled.
   */
  const isElementDisabled = (item: HTMLElement): boolean => {
    if (item.hasAttribute("disabled") || item.getAttribute("aria-disabled") === "true") {
      return true;
    }
    const parentLi = item.closest(".onyx-tree-view-item");
    if (parentLi?.classList.contains("onyx-tree-view-item--disabled")) {
      return true;
    }
    return false;
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
          if (!isOpen.value) {
            isOpen.value = true;
          } else {
            const items = getVisibleTreeItems(currentTrigger);
            const currentIndex = items.indexOf(currentTrigger);
            if (currentIndex !== -1 && currentIndex < items.length - 1) {
              items[currentIndex + 1]!.focus();
            }
          }
        }
        break;

      case "ArrowLeft":
        event.preventDefault();
        if (hasChildren.value && isOpen.value) {
          isOpen.value = false;
        } else {
          const parentGroup = currentTrigger.closest('[role="group"]');
          if (parentGroup) {
            const parentLi = parentGroup.closest(".onyx-tree-view-item");
            if (parentLi) {
              const parentTrigger = parentLi.querySelector('[role="treeitem"]') as HTMLElement;
              if (parentTrigger && parentTrigger !== currentTrigger) {
                parentTrigger.focus();
              }
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

  const treeItemAttrs = computed(() => ({
    role: "treeitem",
    "aria-expanded": hasChildren.value ? isOpen.value : undefined,
    "aria-level": currentDepth.value,
    "aria-disabled": disabled.value ? "true" : undefined,
    tabindex: disabled.value ? -1 : 0,
  }));

  return {
    toggleOpen,
    handleKeyDown,
    treeItemAttrs,
  };
}
