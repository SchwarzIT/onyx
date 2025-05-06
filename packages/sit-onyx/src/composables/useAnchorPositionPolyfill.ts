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
import type { OpenAlignment } from "./useOpenAlignment";
import { getTemplateRefElement, type VueTemplateRefElement } from "./useResizeObserver";

// TODO: can be removed after anchor is implemented in all common browsers
export const USERAGENT_SUPPORTS_ANCHOR_API =
  "CSS" in globalThis &&
  typeof CSS !== "undefined" &&
  CSS.supports("anchor-name: --test") &&
  CSS.supports("position-area: top");

export type AnchorPosition =
  | "top"
  | "top right"
  | "top left"
  | "right"
  | "bottom"
  | "bottom right"
  | "bottom left"
  | "left";

type UseAnchorPositionPolyfillOptions = {
  positionedRef: Ref<VueTemplateRefElement>;
  targetRef: Ref<VueTemplateRefElement>;
  positionArea: MaybeRefOrGetter<AnchorPosition>;
  alignment: MaybeRefOrGetter<OpenAlignment>;
  alignsWithEdge: MaybeRefOrGetter<boolean>;
  fitParent: MaybeRefOrGetter<boolean>;
  offset?: number;
};

export const useAnchorPositionPolyfill = ({
  positionedRef,
  targetRef,
  positionArea,
  alignment,
  alignsWithEdge,
  fitParent,
  offset = 0,
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
      toValue(alignsWithEdge) &&
      toValue(alignment) !== "center" &&
      (toValue(positionArea) === "top" || toValue(positionArea) === "bottom")
        ? toValue(alignment) === "left" || toValue(fitParent)
          ? targetRect.left
          : targetRect.right - positionedElRect.width
        : targetRect.left + targetRect.width / 2 - positionedElRect.width / 2;

    switch (toValue(positionArea)) {
      case "top":
        top = targetRect.top - positionedElRect.height - offset;
        left = alignmentPositioning;
        break;

      case "top right":
        top = targetRect.top - positionedElRect.height - offset;
        left = targetRect.right + offset;
        break;

      case "top left":
        top = targetRect.top - positionedElRect.height - offset;
        left = targetRect.left - positionedElRect.width - offset;
        break;

      case "right":
        top = targetRect.top + targetRect.height / 2 - positionedElRect.height / 2;
        left = targetRect.right + offset;
        break;

      case "bottom":
        top = targetRect.bottom + offset;
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
        left = targetRect.left - positionedElRect.width - offset;
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
