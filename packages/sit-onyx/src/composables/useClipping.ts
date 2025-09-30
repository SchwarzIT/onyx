import { useGlobalEventListener } from "@sit-onyx/headless";
import { computed, nextTick, onMounted, ref, type CSSProperties, type Ref } from "vue";
import type { AnchorPosition } from "./useAnchorPositionPolyfill.js";
import type { OpenDirection } from "./useOpenDirection.js";

export type UseClippingOptions = {
  popoverRef: Ref<HTMLElement | null>;
  popoverWrapperRef: Ref<HTMLElement | null>;
  popoverPosition: Ref<AnchorPosition | OpenDirection>;
  isVisible: Ref<boolean>;
  clipping: Ref<boolean>;
};
type UseClippingReturn = {
  clippingStyles: Ref<CSSProperties>;
  scrolledOut: Ref<undefined | OpenDirection>;
  isClipping: Ref<boolean>;
  checkVisibilityOnScroll: () => void;
};
export function useClipping(options: UseClippingOptions): UseClippingReturn {
  const clippingStyles = ref<CSSProperties>({});
  const scrolledOut = ref<OpenDirection>();
  const isClipping = ref(false);

  const checkVisibilityOnScroll = () => {
    const MIN_DISTANCE_TO_BORDER = 16;
    const MARGIN = 8;

    if (!options.popoverRef.value || !options.popoverWrapperRef.value || !options.isVisible.value)
      return;

    if (isClipping.value) {
      const popoverRect = options.popoverRef.value.getBoundingClientRect();
      const wrapperRect = options.popoverWrapperRef.value.getBoundingClientRect();
      const requiredHeight = popoverRect.height + MIN_DISTANCE_TO_BORDER + MARGIN;

      if (options.popoverPosition.value.includes("top")) {
        if (scrolledOut.value === "top" && wrapperRect.top > requiredHeight) {
          isClipping.value = false;
          return;
        }
        if (scrolledOut.value === "bottom" && wrapperRect.top + MARGIN < window.innerHeight) {
          isClipping.value = false;
          return;
        }
      } else if (options.popoverPosition.value.includes("bottom")) {
        if (scrolledOut.value === "top" && wrapperRect.bottom > MARGIN) {
          isClipping.value = false;
          return;
        }
        if (
          scrolledOut.value === "bottom" &&
          window.innerHeight - wrapperRect.bottom > requiredHeight
        ) {
          isClipping.value = false;
          return;
        }
      } else {
        if (
          scrolledOut.value === "top" &&
          wrapperRect.top + MIN_DISTANCE_TO_BORDER > popoverRect.height
        ) {
          isClipping.value = false;
          return;
        }
        if (
          scrolledOut.value === "bottom" &&
          wrapperRect.bottom + MIN_DISTANCE_TO_BORDER < window.innerHeight
        ) {
          isClipping.value = false;
          return;
        }
      }
    } else {
      const rect = options.popoverRef.value.getBoundingClientRect();
      const isTooHigh = rect.top < MIN_DISTANCE_TO_BORDER;
      const isTooLow = rect.bottom > window.innerHeight - MIN_DISTANCE_TO_BORDER;
      if (isTooHigh || isTooLow) {
        isClipping.value = true;
        if (isTooHigh) {
          scrolledOut.value = "top";
          clippingStyles.value = { left: rect.left + "px", top: "var(--onyx-density-md)" };
        } else if (isTooLow) {
          scrolledOut.value = "bottom";
          clippingStyles.value = { left: rect.left + "px", bottom: "var(--onyx-density-md)" };
        }
      }
    }
  };
  const disableClipping = computed(() => {
    return !options.clipping.value || !options.isVisible.value;
  });
  useGlobalEventListener({
    type: "scroll",
    listener: () => checkVisibilityOnScroll(),
    disabled: disableClipping,
  });
  useGlobalEventListener({
    type: "resize",
    listener: () => checkVisibilityOnScroll(),
    disabled: disableClipping,
  });
  onMounted(async () => {
    await nextTick(); // waiting for DOM
    if (!disableClipping.value) checkVisibilityOnScroll();
  });

  return { clippingStyles, scrolledOut, isClipping, checkVisibilityOnScroll };
}
