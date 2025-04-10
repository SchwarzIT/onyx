import type { TooltipPosition } from "src/components/OnyxTooltip/types";
import { ref, type ComputedRef, type ShallowRef } from "vue";
import type { WedgePosition } from "./useWedgePosition";

export const useAnchorPositionPolyfill = (
  positionedRef: Readonly<ShallowRef<HTMLElement | null>>,
  targetRef: Readonly<ShallowRef<HTMLElement | null>>,
  positionArea: ComputedRef<TooltipPosition>,
  alignment: ComputedRef<WedgePosition>,
  alignsWithEdge: ComputedRef<boolean>,
  fitParent: ComputedRef<boolean>,
  offset: number,
) => {
  const leftPosition = ref("-1000px");
  const topPosition = ref("-1000px");

  const updateAnchorPositionPolyfill = () => {
    const positionedEl = positionedRef.value;
    const target = targetRef.value;
    if (!positionedEl || !target) {
      return;
    }
    const targetRect = target.getBoundingClientRect();
    const positionedElRect = positionedEl.getBoundingClientRect();
    let top = 0;
    let left = 0;

    const alignmentPositioning =
      alignsWithEdge.value && alignment.value !== "center"
        ? alignment.value === "left" || fitParent.value
          ? targetRect.left
          : targetRect.right - positionedElRect.width
        : targetRect.left + targetRect.width / 2 - positionedElRect.width / 2;

    switch (positionArea.value) {
      case "top":
        top = targetRect.top - positionedElRect.height;
        left = alignmentPositioning;
        break;

      case "top right":
        top = targetRect.top - positionedElRect.height;
        left = targetRect.right;
        break;

      case "top left":
        top = targetRect.top - positionedElRect.height;
        left = targetRect.left - positionedElRect.width;
        break;

      case "right":
        top = targetRect.top + targetRect.height / 2 - positionedElRect.height / 2;
        left = targetRect.right;
        break;

      case "bottom":
        top = targetRect.bottom;
        left = alignmentPositioning;
        break;

      case "bottom right":
        top = targetRect.bottom + offset;
        left = targetRect.right + offset;
        break;

      case "bottom left":
        top = targetRect.bottom + offset;
        left = targetRect.left - positionedElRect.width - offset;
        break;

      case "left":
        top = targetRect.top + targetRect.height / 2 - positionedElRect.height / 2;
        left = targetRect.left - positionedElRect.width;
        break;
    }

    leftPosition.value = `${left}px`;
    topPosition.value = `${top}px`;
  };
  return {
    leftPosition,
    topPosition,
    updateAnchorPositionPolyfill,
  };
};
