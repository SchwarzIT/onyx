import type { TooltipPosition } from "src/components/OnyxTooltip/types";
import { ref, unref, type MaybeRefOrGetter } from "vue";
import type { WedgePosition } from "./useWedgePosition";

//TODO: can be removed after anchor is implemented in all common browers

export const USERAGENT_SUPPORTS_ANCHOR_API =
  "CSS" in globalThis && typeof CSS !== "undefined" && CSS.supports("anchor-name: --test");

type UseAnchorPositionPolyfillOptions = {
  positionedRef: MaybeRefOrGetter<HTMLElement | null>;
  targetRef: MaybeRefOrGetter<HTMLElement | null>;
  positionArea: MaybeRefOrGetter<TooltipPosition>;
  alignment: MaybeRefOrGetter<WedgePosition>;
  alignsWithEdge: MaybeRefOrGetter<boolean>;
  fitParent: MaybeRefOrGetter<boolean>;
  offset: MaybeRefOrGetter<number>;
};

export const useAnchorPositionPolyfill = ({
  positionedRef,
  targetRef,
  positionArea,
  alignment,
  alignsWithEdge,
  fitParent,
  offset,
}: UseAnchorPositionPolyfillOptions) => {
  const leftPosition = ref("-1000px");
  const topPosition = ref("-1000px");

  const getElement = (refOrGetter: MaybeRefOrGetter<HTMLElement | null>): HTMLElement | null => {
    const element = unref(refOrGetter);
    return typeof element === "function" ? element() : element;
  };

  const getNumber = (refOrGetter: MaybeRefOrGetter<number>): number => {
    const value = unref(refOrGetter);
    return typeof value === "function" ? value() : value;
  };

  const updateAnchorPositionPolyfill = () => {
    const positionedEl = getElement(positionedRef);
    const target = getElement(targetRef);
    if (!positionedEl || !target) {
      return;
    }
    const targetRect = target.getBoundingClientRect();
    const positionedElRect = positionedEl.getBoundingClientRect();
    let top = 0;
    let left = 0;

    const alignmentPositioning =
      unref(alignsWithEdge) && unref(alignment) !== "center"
        ? unref(alignment) === "left" || unref(fitParent)
          ? targetRect.left
          : targetRect.right - positionedElRect.width
        : targetRect.left + targetRect.width / 2 - positionedElRect.width / 2;

    const offsetValue = getNumber(offset);

    switch (unref(positionArea)) {
      case "top":
        top = targetRect.top - positionedElRect.height;
        left = alignmentPositioning;
        break;

      case "top right":
        top = targetRect.top - positionedElRect.height;
        left = targetRect.right + offsetValue;
        break;

      case "top left":
        top = targetRect.top - positionedElRect.height;
        left = targetRect.left - positionedElRect.width - offsetValue;
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
        top = targetRect.bottom + offsetValue;
        left = targetRect.right + offsetValue;
        break;

      case "bottom left":
        top = targetRect.bottom + offsetValue;
        left = targetRect.left - positionedElRect.width - offsetValue;
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
