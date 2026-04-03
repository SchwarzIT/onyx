import { ref, toValue, unref, type MaybeRefOrGetter, type ShallowRef } from "vue";

export type OpenDirection = "top" | "bottom" | "left" | "right";

export const useOpenDirection = (
  element: Readonly<ShallowRef<Element | null | undefined>>,
  defaultDirection: MaybeRefOrGetter<OpenDirection> = "bottom",
  horizontal: MaybeRefOrGetter<boolean> = false,
) => {
  const openDirection = ref<OpenDirection>(toValue(defaultDirection));

  const updateOpenDirection = () => {
    const el = unref(element);
    if (!el) {
      openDirection.value = toValue(defaultDirection);
      return;
    }

    const overflowParentRect = findParentWithHiddenOverflow(el)?.getBoundingClientRect();
    const elementRect = el.getBoundingClientRect();

    /**
     * In case there no parent with overflow hidden, we consider top/left as 0 and bottom/right as the viewport height/width,
     * since `getBoundingClientRect` returns values relative to the viewport and not considering any scrolling.
     */
    if (toValue(horizontal)) {
      const parentLeft = overflowParentRect?.left ?? 0;
      const parentRight =
        overflowParentRect?.right ?? window.visualViewport?.width ?? window.innerWidth ?? 0;
      const freeSpaceRight = parentRight - elementRect.right;
      const freeSpaceLeft = elementRect.left - parentLeft;

      openDirection.value = freeSpaceLeft > freeSpaceRight ? "left" : "right";
    } else {
      const parentTop = overflowParentRect?.top ?? 0;
      const parentBottom =
        overflowParentRect?.bottom ?? window.visualViewport?.height ?? window.innerHeight ?? 0;
      const freeSpaceBelow = parentBottom - elementRect.bottom;
      const freeSpaceAbove = elementRect.top - parentTop;

      openDirection.value = freeSpaceAbove > freeSpaceBelow ? "top" : "bottom";
    }
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
