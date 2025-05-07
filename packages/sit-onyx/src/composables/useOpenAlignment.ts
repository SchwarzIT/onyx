import { ref, unref, type ShallowRef } from "vue";
import { findParentWithHiddenOverflow } from "./useOpenDirection";

export type OpenAlignment = "center" | "left" | "right";

export const useOpenAlignment = (
  element: Readonly<ShallowRef<Element | null>>,
  tooltipElement: Readonly<ShallowRef<Element | null>>,
  defaultPosition: "center" | "left" | "right" = "center",
) => {
  const minMargin = 16;
  const openAlignment = ref<OpenAlignment>(defaultPosition);

  const updateOpenAlignment = () => {
    const wrapperEl = unref(element);
    const tooltipEl = unref(tooltipElement);

    if (!wrapperEl || !tooltipEl) {
      openAlignment.value = defaultPosition;
      return;
    }

    const overflowParentRect = findParentWithHiddenOverflow(wrapperEl)?.getBoundingClientRect();
    const wrapperRect = wrapperEl.getBoundingClientRect();
    const tooltipElementRect = tooltipEl.getBoundingClientRect();

    if (tooltipElementRect.width < wrapperRect.width) {
      openAlignment.value = defaultPosition;
      return;
    }

    const minSpace = (tooltipElementRect.width - wrapperRect.width + minMargin * 2) / 2;

    const parentLeft = overflowParentRect?.left ?? window.visualViewport?.pageLeft ?? 0;
    const parentRight =
      overflowParentRect?.right ??
      (window.visualViewport?.width ?? window.innerWidth) +
        (window.visualViewport?.offsetLeft ?? 0);

    const freeSpaceLeft = wrapperRect.left - parentLeft;
    const freeSpaceRight = parentRight - wrapperRect.right;

    const enoughSpaceLeft = freeSpaceLeft >= minSpace;
    const enoughSpaceRight = freeSpaceRight >= minSpace;

    openAlignment.value =
      enoughSpaceLeft === enoughSpaceRight
        ? defaultPosition
        : freeSpaceLeft > freeSpaceRight
          ? "right"
          : "left";
  };

  return {
    /**
     * Direction in which the flyout etc. should open to.
     */
    openAlignment,
    /**
     * Detects in which direction a flyout etc. should be opened, depending on the available space in each direction.
     * Should only be called onBeforeMount or later to support server side rendering.
     */
    updateOpenAlignment,
  };
};
