import { ref, unref, type ShallowRef } from "vue";

export type OpenDirection = "top" | "bottom";

export const useOpenDirection = (
  element: Readonly<ShallowRef<Element | null | undefined>>,
  defaultDirection: OpenDirection = "bottom",
) => {
  const openDirection = ref<OpenDirection>(defaultDirection);

  const updateOpenDirection = () => {
    const el = unref(element);
    if (!el) {
      openDirection.value = defaultDirection;
      return;
    }

    const overflowParentRect = findParentWithHiddenOverflow(el)?.getBoundingClientRect();
    const elementRect = el.getBoundingClientRect();

    const parentTop = overflowParentRect?.top ?? window.visualViewport?.pageTop ?? 0;
    const parentBottom = overflowParentRect?.bottom ?? window.visualViewport?.height ?? 0;
    const freeSpaceBelow = parentBottom - elementRect.bottom;
    const freeSpaceAbove = elementRect.top - parentTop;

    openDirection.value = freeSpaceAbove > freeSpaceBelow ? "top" : "bottom";
  };

  return {
    /**
     * Direction in which the popover should open to.
     */
    openDirection,
    /**
     * Detects in which direction a popover should be opened, depending on the available space in each direction.
     * Should only be called onBeforeMount or later to support server side rendering.
     */
    updateOpenDirection,
  };
};

export const findParentWithHiddenOverflow = (element?: Element): Element | undefined => {
  /**
   * Recursively finds the first parent element with hidden overflow.
   */
  if (!element) return undefined;

  const style = getComputedStyle(element);
  if (style.overflow.includes("hidden")) {
    // if the element has hidden overflow, the popover would be cut off by this element so we need to use
    // this element as parent to calculate the open direction instead of the body.
    return element;
  }

  return element.parentElement ? findParentWithHiddenOverflow(element.parentElement) : undefined;
};
