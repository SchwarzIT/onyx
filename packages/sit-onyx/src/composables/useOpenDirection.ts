import { ref, unref, type MaybeRef } from "vue";

export type OpenDirection = "top" | "bottom";

export const useOpenDirection = (element: MaybeRef<Element | undefined>) => {
  const openDirection = ref<OpenDirection>("bottom");

  const updateOpenDirection = () => {
    const el = unref(element);
    if (!el) {
      openDirection.value = "bottom";
      return;
    }

    const referenceElement = findParentWithHiddenOverflow(el) ?? el;
    const rect = referenceElement.getBoundingClientRect();
    const viewportHeight = window.visualViewport?.height ?? 0;

    const freeSpaceBelow = viewportHeight - rect.bottom;
    const freeSpaceAbove = rect.top;

    openDirection.value = freeSpaceAbove > freeSpaceBelow ? "top" : "bottom";
  };

  /**
   * Recursively finds the first parent element with hidden overflow.
   */
  const findParentWithHiddenOverflow = (element?: Element): Element | undefined => {
    if (!element) return undefined;

    const style = getComputedStyle(element);
    if (style.overflow === "hidden") {
      // if the element has hidden overflow, the flyout would we cut off at this element so we need to use
      // this element as parent to calculate the open direction instead of the body.
      return element;
    }

    return element.parentElement ? findParentWithHiddenOverflow(element.parentElement) : undefined;
  };

  return {
    /**
     * Direction in which the flyout etc. should open to.
     */
    openDirection,
    /**
     * Detects in which direction a flyout etc. should be opened, depending on the available space in each direction.
     * Should only be called onBeforeMount oder later to support server side rendering.
     */
    updateOpenDirection,
  };
};
