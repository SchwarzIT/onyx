import { ref, toValue, unref, type MaybeRefOrGetter, type ShallowRef } from "vue";

export type OpenAlignment = "center" | "left" | "right" | "top" | "bottom";

export const useOpenAlignment = (
  element: Readonly<ShallowRef<Element | null>>,
  tooltipElement: Readonly<ShallowRef<Element | null>>,
  defaultAlignment: OpenAlignment = "center",
  position: MaybeRefOrGetter<string> = "bottom",
) => {
  const minMargin = 16;
  const openAlignment = ref<OpenAlignment>(defaultAlignment);

  const updateOpenAlignment = () => {
    const wrapperEl = unref(element);
    const tooltipEl = unref(tooltipElement);

    if (!wrapperEl || !tooltipEl) {
      openAlignment.value = defaultAlignment;
      return;
    }

    const wrapperRect = wrapperEl.getBoundingClientRect();
    const tooltipRect = tooltipEl.getBoundingClientRect();
    const currentPosition = toValue(position);
    const isHorizontalPosition = currentPosition === "left" || currentPosition === "right";

    if (isHorizontalPosition) {
      if (tooltipRect.height < wrapperRect.height) {
        openAlignment.value = defaultAlignment;
        return;
      }

      const minSpaceCenter = (tooltipRect.height - wrapperRect.height + minMargin * 2) / 2;
      const minSpace = tooltipRect.height - wrapperRect.height + minMargin;

      const viewportBottom = window.innerHeight;

      const freeSpaceTop = wrapperRect.top;
      const freeSpaceBottom = viewportBottom - wrapperRect.bottom;

      const enoughSpaceTop = freeSpaceTop >= minSpaceCenter;
      const enoughSpaceBottom = freeSpaceBottom >= minSpaceCenter;

      if (
        (defaultAlignment === "bottom" && freeSpaceTop >= minSpace) ||
        (defaultAlignment === "top" && freeSpaceBottom >= minSpace) ||
        (defaultAlignment === "center" && enoughSpaceTop && enoughSpaceBottom)
      ) {
        openAlignment.value = defaultAlignment;
      } else if (freeSpaceTop > freeSpaceBottom) {
        openAlignment.value = "bottom";
      } else {
        openAlignment.value = "top";
      }
    } else {
      if (tooltipRect.width < wrapperRect.width) {
        openAlignment.value = defaultAlignment;
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
        (defaultAlignment === "right" && freeSpaceLeft >= minSpace) ||
        (defaultAlignment === "left" && freeSpaceRight >= minSpace) ||
        (defaultAlignment === "center" && enoughSpaceLeft && enoughSpaceRight)
      ) {
        openAlignment.value = defaultAlignment;
      } else if (freeSpaceLeft > freeSpaceRight) {
        openAlignment.value = "right";
      } else {
        openAlignment.value = "left";
      }
    }
  };

  return {
    /**
     * Direction in which the popover should align to.
     */
    openAlignment,
    /**
     * Detects in which direction a popover should be aligned, depending on the available space in each direction.
     * Should only be called onBeforeMount or later to support server side rendering.
     */
    updateOpenAlignment,
  };
};
