import {
  computed,
  onBeforeMount,
  onUnmounted,
  ref,
  toValue,
  watchEffect,
  type MaybeRefOrGetter,
  type Ref,
} from "vue";
import type { PopoverPosition } from "../components/OnyxSupportPopover/types.js";
import { useIntersectionObserver } from "./useIntersectionObserver.js";
import { getTemplateRefElement, type VueTemplateRefElement } from "./useResizeObserver.js";

type UseAnchorPositionPolyfillOptions = {
  positionedRef: Ref<VueTemplateRefElement>;
  targetRef: Ref<VueTemplateRefElement>;
  position: MaybeRefOrGetter<PopoverPosition>;
  offset?: number;
};

export const useAnchorPositionPolyfill = ({
  positionedRef,
  targetRef,
  position,
  offset = 0,
}: UseAnchorPositionPolyfillOptions) => {
  const fitParentWidth = computed(() =>
    (["top center", "bottom center", "center center"] as PopoverPosition[]).includes(
      toValue(position),
    ),
  );

  const fitParentHeight = computed(() =>
    (["center left", "center right"] as PopoverPosition[]).includes(toValue(position)),
  );

  const alignment = computed(() => {
    const _position = toValue(position);
    if (_position.startsWith("left")) return "left";
    if (_position.startsWith("right")) return "right";
    return "center";
  });

  const alignsWithEdge = computed(() => {
    const _position = toValue(position);
    return _position.includes("span-") && !_position.includes("span-all");
  });

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

    const positionArea = toValue(position);

    const alignmentPositioning =
      alignsWithEdge.value &&
      alignment.value !== "center" &&
      (positionArea.startsWith("top") || positionArea.startsWith("bottom"))
        ? alignment.value === "left" || fitParentWidth.value
          ? targetRect.left
          : targetRect.right - positionedElRect.width
        : targetRect.left + targetRect.width / 2 - positionedElRect.width / 2;

    switch (positionArea) {
      case "top center":
      case "top span-all":
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

      case "bottom center":
      case "bottom span-all":
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

      case "center center":
        top = targetRect.top + targetRect.height / 2 - positionedElRect.height / 2;
        left = targetRect.left + targetRect.width / 2 - positionedElRect.width / 2;
        break;

      case "center right":
        top = targetRect.top + targetRect.height / 2 - positionedElRect.height / 2;
        left = targetRect.right + offset;
        break;

      case "center left":
        top = targetRect.top + targetRect.height / 2 - positionedElRect.height / 2;
        left = targetRect.left - positionedElRect.width - offset;
        break;

      // spans
      case "top span-left":
        top = targetRect.top - positionedElRect.height - offset;
        left = targetRect.right - positionedElRect.width;
        break;

      case "top span-x-end":
        top = targetRect.top - positionedElRect.height - offset;
        left = targetRect.left;
        break;

      case "bottom span-left":
        top = targetRect.bottom + offset;
        left = targetRect.right - positionedElRect.width;
        break;

      case "bottom span-x-end":
        top = targetRect.bottom + offset;
        left = targetRect.left;
        break;

      case "center span-left":
        top = targetRect.top + targetRect.height / 2 - positionedElRect.height / 2;
        left = targetRect.right - positionedElRect.width;
        break;

      case "center span-x-end":
        top = targetRect.top + targetRect.height / 2 - positionedElRect.height / 2;
        left = targetRect.left;
        break;

      case "left span-top":
        top = targetRect.top - (positionedElRect.height - targetRect.height);
        left = targetRect.left - positionedElRect.width - offset;
        break;

      case "left span-bottom":
        top = targetRect.top;
        left = targetRect.left - positionedElRect.width - offset;
        break;

      case "left span-all":
        top = targetRect.top + targetRect.height / 2 - positionedElRect.height / 2;
        left = targetRect.left - positionedElRect.width - offset;
        break;

      case "right span-top":
        top = targetRect.top - (positionedElRect.height - targetRect.height);
        left = targetRect.right + offset;
        break;

      case "right span-bottom":
        top = targetRect.top;
        left = targetRect.right + offset;
        break;

      case "right span-all":
        top = targetRect.top + targetRect.height / 2 - positionedElRect.height / 2;
        left = targetRect.right + offset;
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

  const userAgentSupportsAnchorApi = ref(true);

  /**
   * SSR safe composable for checking whether the browser supports the Anchor API.
   * TODO: can be removed after anchor is implemented in all common browsers.
   */
  onBeforeMount(() => {
    const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);

    useragentSupportsAnchorApi.value =
      "CSS" in globalThis &&
      typeof CSS !== "undefined" &&
      CSS.supports("anchor-name: --test") &&
      CSS.supports("position-area: top") &&
      !isSafari;
  });

  return {
    leftPosition,
    topPosition,
    updateAnchorPositionPolyfill,
    userAgentSupportsAnchorApi,
    fitParentWidth,
    fitParentHeight,
    alignment,
  };
};
