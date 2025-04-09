import type { TooltipPosition } from "src/components/OnyxTooltip/types";
import { ref, type ComputedRef, type ShallowRef } from "vue";
import type { WedgePosition } from "./useWedgePosition";

export const useHandleTooltipPositioningWithoutAnchorSupport = (
  tooltipRef: Readonly<ShallowRef<HTMLDialogElement | null>>,
  wrapperRef: Readonly<ShallowRef<HTMLElement | null>>,
  toolTipPosition: ComputedRef<TooltipPosition>,
  alignment: ComputedRef<WedgePosition>,
  alignsWithEdge: ComputedRef<boolean>,
  fitParent: ComputedRef<boolean>,
) => {
  const wedgeSize = 8;
  const leftPosition = ref("-1000px");
  const topPosition = ref("-1000px");

  const updateTooltipPositioningWithoutAnchorSupport = () => {
    const tooltip = tooltipRef.value;
    const wrapper = wrapperRef.value;
    if (tooltip && wrapper) {
      const wrapperRect = wrapper.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      let top = 0;
      let left = 0;

      const alignmentPositioning =
        alignsWithEdge && alignment.value !== "center"
          ? alignment.value === "left" || fitParent.value
            ? wrapperRect.left
            : wrapperRect.right - tooltipRect.width
          : wrapperRect.left + wrapperRect.width / 2 - tooltipRect.width / 2;
      switch (toolTipPosition.value) {
        case "top":
          top = wrapperRect.top - tooltipRect.height;
          left = alignmentPositioning;
          break;

        case "top right":
          top = wrapperRect.top - tooltipRect.height;
          left = wrapperRect.right;
          break;

        case "top left":
          top = wrapperRect.top - tooltipRect.height;
          left = wrapperRect.left - tooltipRect.width;
          break;

        case "right":
          top = wrapperRect.top + wrapperRect.height / 2 - tooltipRect.height / 2;
          left = wrapperRect.right;
          break;

        case "bottom":
          top = wrapperRect.bottom;
          left = alignmentPositioning;
          break;

        case "bottom right":
          top = wrapperRect.bottom + wedgeSize;
          left = wrapperRect.right + wedgeSize;
          break;

        case "bottom left":
          top = wrapperRect.bottom + wedgeSize;
          left = wrapperRect.left - tooltipRect.width - wedgeSize;
          break;

        case "left":
          top = wrapperRect.top + wrapperRect.height / 2 - tooltipRect.height / 2;
          left = wrapperRect.left - tooltipRect.width;
          break;
      }

      leftPosition.value = `${left}px`;
      topPosition.value = `${top}px`;
    }
  };
  return {
    leftPosition,
    topPosition,
    updateTooltipPositioningWithoutAnchorSupport,
  };
};
