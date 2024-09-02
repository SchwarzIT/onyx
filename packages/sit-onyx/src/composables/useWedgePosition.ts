import { ref, unref, type MaybeRef } from "vue";

export type WedgePosition = "center" | "left" | "right";

export const useWedgePosition = (
  element: MaybeRef<Element | undefined>,
  tooltipElement: MaybeRef<Element | undefined>,
) => {
  const minMargin = 16;
  const wedgePosition = ref<WedgePosition>("center");

  const updateWedgePosition = () => {
    const wrapperEl = unref(element);
    const tooltipEl = unref(tooltipElement);

    if (!wrapperEl || !tooltipEl) {
      wedgePosition.value = "center";
      return;
    }

    const overflowParentRect = findParentWithHiddenOverflow(wrapperEl)?.getBoundingClientRect();
    const wrapperRect = wrapperEl.getBoundingClientRect();
    const tooltipElementRect = tooltipEl.getBoundingClientRect();

    if (tooltipElementRect.width < wrapperRect.width) {
      wedgePosition.value = "center";
      return;
    }

    const minSpace = (tooltipElementRect.width - wrapperRect.width + minMargin * 2) / 2;

    const parentLeft = overflowParentRect?.left ?? window.visualViewport?.pageLeft ?? 0;
    const parentRight =
      overflowParentRect?.right ??
      (window.visualViewport?.width ?? window.innerWidth) +
        (window.visualViewport?.offsetLeft ?? 0) ??
      0;

    const freeSpaceLeft = wrapperRect.left - parentLeft;
    const freeSpaceRight = parentRight - wrapperRect.right;

    const enoughSpaceLeft = freeSpaceLeft >= minSpace;
    const enoughSpaceRight = freeSpaceRight >= minSpace;

    wedgePosition.value =
      enoughSpaceLeft === enoughSpaceRight
        ? "center"
        : freeSpaceLeft > freeSpaceRight
          ? "right"
          : "left";
  };

  /**
   * Recursively finds the first parent element with hidden overflow.
   */
  const findParentWithHiddenOverflow = (element?: Element): Element | undefined => {
    if (!element) return undefined;

    const style = getComputedStyle(element);
    if (style.overflow === "hidden" || style.overflow === "hidden auto") {
      // if the element has hidden overflow, the flyout would be cut off by this element so we need to use
      // this element as parent to calculate the open direction instead of the body.
      return element;
    }

    return element.parentElement ? findParentWithHiddenOverflow(element.parentElement) : undefined;
  };

  return {
    /**
     * Direction in which the flyout etc. should open to.
     */
    wedgePosition,
    /**
     * Detects in which direction a flyout etc. should be opened, depending on the available space in each direction.
     * Should only be called onBeforeMount or later to support server side rendering.
     */
    updateWedgePosition,
  };
};
