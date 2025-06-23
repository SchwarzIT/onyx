import { ref, unref, type ShallowRef } from "vue";

export type OpenAlignment = "center" | "left" | "right";

export const useOpenAlignment = (
  element: Readonly<ShallowRef<Element | null>>,
  tooltipElement: Readonly<ShallowRef<Element | null>>,
  defaultPosition: OpenAlignment = "center",
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

    const wrapperRect = wrapperEl.getBoundingClientRect();
    const tooltipRect = tooltipEl.getBoundingClientRect();

    if (tooltipRect.width < wrapperRect.width) {
      openAlignment.value = defaultPosition;
      return;
    }

    const minSpaceCenter = (tooltipRect.width - wrapperRect.width + minMargin * 2) / 2;
    const minSpace = tooltipRect.width - wrapperRect.width + minMargin;

    const viewportRight = window.innerWidth;

    const freeSpaceLeft = wrapperRect.left;
    const freeSpaceRight = viewportRight - wrapperRect.right;

    const enoughSpaceLeft = freeSpaceLeft >= minSpaceCenter;
    const enoughSpaceRight = freeSpaceRight >= minSpaceCenter;

    if (
      (defaultPosition === "right" && freeSpaceLeft >= minSpace) ||
      (defaultPosition === "left" && freeSpaceRight >= minSpace) ||
      (defaultPosition === "center" && enoughSpaceLeft && enoughSpaceRight)
    ) {
      openAlignment.value = defaultPosition;
    } else if (freeSpaceLeft > freeSpaceRight) {
      openAlignment.value = "right";
    } else {
      openAlignment.value = "left";
    }
  };

  return {
    /**
     * Direction in which the popover should open to.
     */
    openAlignment,
    /**
     * Detects in which direction a popover should be opened, depending on the available space in each direction.
     * Should only be called onBeforeMount or later to support server side rendering.
     */
    updateOpenAlignment,
  };
};
