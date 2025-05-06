import type { TooltipPosition } from "src/components/OnyxTooltip/types";
import {
  onBeforeMount,
  onUnmounted,
  ref,
  toValue,
  watchEffect,
  type MaybeRefOrGetter,
  type Ref,
} from "vue";
import { useIntersectionObserver } from "./useIntersectionObserver";
import { getTemplateRefElement, type VueTemplateRefElement } from "./useResizeObserver";
import type { WedgePosition } from "./useWedgePosition";

// TODO: can be removed after anchor is implemented in all common browsers
export const USERAGENT_SUPPORTS_ANCHOR_API =
  "CSS" in globalThis &&
  typeof CSS !== "undefined" &&
  CSS.supports("anchor-name: --test") &&
  CSS.supports("position-area: top");

type UseAnchorPositionPolyfillOptions = {
  positionedRef: Ref<VueTemplateRefElement>;
  targetRef: Ref<VueTemplateRefElement>;
  positionArea: MaybeRefOrGetter<TooltipPosition>;
  alignment: MaybeRefOrGetter<WedgePosition>;
  alignsWithEdge: MaybeRefOrGetter<boolean>;
  fitParent: MaybeRefOrGetter<boolean>;
};

export const useAnchorPositionPolyfill = ({
  positionedRef,
  targetRef,
  positionArea,
  alignment,
  alignsWithEdge,
  fitParent,
}: UseAnchorPositionPolyfillOptions) => {
  const leftPosition = ref("-1000px");
  const topPosition = ref("-1000px");

  const { isIntersecting: targetVisible } = useIntersectionObserver(targetRef);

  const updateAnchorPositionPolyfill = () => {
    const positionedEl = getTemplateRefElement(positionedRef.value);
    const target = getTemplateRefElement(targetRef.value);
    if (!positionedEl || !target) {
      return;
    }
    const targetRect = target.getBoundingClientRect();
    const positionedElRect = positionedEl.getBoundingClientRect();
    let top = 0;
    let left = 0;

    const alignmentPositioning =
      toValue(alignsWithEdge) && toValue(alignment) !== "center"
        ? toValue(alignment) === "left" || toValue(fitParent)
          ? targetRect.left
          : targetRect.right - positionedElRect.width
        : targetRect.left + targetRect.width / 2 - positionedElRect.width / 2;

    switch (toValue(positionArea)) {
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
        top = targetRect.bottom;
        left = targetRect.right;
        break;

      case "bottom left":
        top = targetRect.bottom;
        left = targetRect.left - positionedElRect.width;
        break;

      case "left":
        top = targetRect.top + targetRect.height / 2 - positionedElRect.height / 2;
        left = targetRect.left - positionedElRect.width;
        break;
    }

    leftPosition.value = `${left}px`;
    topPosition.value = `${top}px`;
  };

  // using onBeforeMount here to support server-side-rendering because window is not available in SSR
  onBeforeMount(() => {
    watchEffect(() => {
      if (targetVisible.value && positionedRef.value) {
        window.addEventListener("scroll", updateAnchorPositionPolyfill, true);
      } else {
        window.removeEventListener("scroll", updateAnchorPositionPolyfill, true);
        leftPosition.value = "-1000px";
        topPosition.value = "-1000px";
      }
    });
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", updateAnchorPositionPolyfill, true);
  });

  return {
    leftPosition,
    topPosition,
    updateAnchorPositionPolyfill,
  };
};
