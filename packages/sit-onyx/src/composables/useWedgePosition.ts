import { ref, unref, type MaybeRef } from "vue";

export type WedgePosition = "center" | "left" | "right";

export const useWedgePosition = (
  element: MaybeRef<Element | undefined>,
  tooltipElement: MaybeRef<Element | undefined>,
) => {
  // const minMargin = 16;
  const wedgePosition = ref<WedgePosition>("center");

  const updateWedgePosition = () => {
    const el = unref(element);
    const tooltipEl = unref(tooltipElement);
    if (!el || !tooltipEl) {
      wedgePosition.value = "center";
      return;
    }

    const overflowParentRect = findParentWithHiddenOverflow(el)?.getBoundingClientRect();
    const elementRect = el.getBoundingClientRect();
    const tooltipElementRect = tooltipEl.getBoundingClientRect();
    // elementwidth

    if (tooltipElementRect.width < elementRect.width) {
      wedgePosition.value = "center";
      return;
    }
    //TODO: tooltipElement.width is not working correctly
    //const minSpace = (tooltipElementRect.width - elementRect.width + minMargin * 2) / 2;
    // const minSpaceLeft =
    //   tooltipElementRect.left - (tooltipElementRect.width - elementRect.width + minMargin * 2) / 2;
    // const minSpaceRight =
    //   tooltipElementRect.right + (tooltipElementRect.width - elementRect.width + minMargin * 2) / 2;
    // const minSpace = 10;
    // console.log("minSpaceLeft", minSpaceLeft);
    // console.log("minSpaceRight", minSpaceRight);

    const parentLeft = overflowParentRect?.left ?? window.visualViewport?.pageLeft ?? 0;
    const parenRight =
      overflowParentRect?.right ??
      (window.visualViewport?.width ?? window.innerWidth) +
        (window.visualViewport?.offsetLeft ?? 0) ??
      0;
    // console.log("parentLeft", parentLeft);
    // console.log("parenRight", parenRight);
    // const centerX = tooltipElementRect.x + tooltipElementRect.width * 0.5;

    const freeSpaceLeft = tooltipElementRect.left - parentLeft;
    const freeSpaceRight = parenRight - tooltipElementRect.right;

    //console.log("freeSpaceLeft", freeSpaceLeft);
    // console.log("freeSpaceRight", freeSpaceRight);
    //console.log("minSpace", minSpace);
    // console.log("center", freeSpaceLeft > minSpace && freeSpaceRight > minSpace);
    // const enoughSpaceLeft = centerX - elementRect.width * 0.5 >= 0;
    // const enoughSpaceRight =
    //   centerX + elementRect.width * 0.5 < document.documentElement.clientWidth;

    // console.log("enoughSpaceLeft", enoughSpaceLeft);
    // console.log("enoughSpaceRight", enoughSpaceRight);

    //const hostBoundingRect = this.parentTooltip.getBoundingClientRect();
    //const tooltipBoundingRect = this.hostElement.getBoundingClientRect();
    //const centerX = hostBoundingRect.x + hostBoundingRect.width * 0.5;
    // const enoughSpaceLeft = centerX - tooltipBoundingRect.width * 0.5 >= 0;
    //const enoughSpaceRight =centerX + tooltipBoundingRect.width * 0.5 < document.documentElement.clientWidth;

    wedgePosition.value =
      // (freeSpaceLeft > minSpace && freeSpaceRight > minSpace) ||
      freeSpaceLeft === freeSpaceRight
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
    if (style.overflow === "hidden") {
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
