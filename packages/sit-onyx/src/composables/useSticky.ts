import { useGlobalEventListener } from "@sit-onyx/headless";
import { computed, nextTick, onMounted, ref, type CSSProperties, type Ref } from "vue";
import type { AnchorPosition } from "./useAnchorPositionPolyfill.js";
import type { OpenDirection } from "./useOpenDirection.js";

export type UseStickyOptions = {
  popoverRef: Ref<HTMLElement | null>;
  popoverWrapperRef: Ref<HTMLElement | null>;
  popoverPosition: Ref<AnchorPosition | OpenDirection>;
  isVisible: Ref<boolean>;
  sticky: Ref<boolean>;
};

export function useSticky(options: UseStickyOptions) {
  const stickyStyles = ref<CSSProperties>();
  const scrolledOut = ref<OpenDirection>();
  const isSticky = ref(false);

  const checkVisibilityOnScroll = () => {
    const MIN_DISTANCE_TO_BORDER = 16;
    const MARGIN = 8;

    if (!options.popoverRef.value || !options.popoverWrapperRef.value || !options.isVisible.value)
      return;

    if (isSticky.value) {
      const popoverRect = options.popoverRef.value.getBoundingClientRect();
      const wrapperRect = options.popoverWrapperRef.value.getBoundingClientRect();
      const requiredHeight = popoverRect.height + MIN_DISTANCE_TO_BORDER + MARGIN;

      if (options.popoverPosition.value.includes("top")) {
        if (scrolledOut.value === "top" && wrapperRect.top > requiredHeight) {
          isSticky.value = false;
          return;
        }
        if (scrolledOut.value === "bottom" && wrapperRect.top + MARGIN < window.innerHeight) {
          isSticky.value = false;
          return;
        }
      } else if (options.popoverPosition.value.includes("bottom")) {
        if (scrolledOut.value === "top" && wrapperRect.bottom > MARGIN) {
          isSticky.value = false;
          return;
        }
        if (
          scrolledOut.value === "bottom" &&
          window.innerHeight - wrapperRect.bottom > requiredHeight
        ) {
          isSticky.value = false;
          return;
        }
      } else {
        if (
          scrolledOut.value === "top" &&
          wrapperRect.top + MIN_DISTANCE_TO_BORDER > popoverRect.height
        ) {
          isSticky.value = false;
          return;
        }
        if (
          scrolledOut.value === "bottom" &&
          wrapperRect.bottom + MIN_DISTANCE_TO_BORDER < window.innerHeight
        ) {
          isSticky.value = false;
          return;
        }
      }
    } else {
      const rect = options.popoverRef.value.getBoundingClientRect();
      const isTooHigh = rect.top < MIN_DISTANCE_TO_BORDER;
      const isTooLow = rect.bottom > window.innerHeight - MIN_DISTANCE_TO_BORDER;
      if (isTooHigh || isTooLow) {
        isSticky.value = true;
        if (isTooHigh) {
          scrolledOut.value = "top";
          stickyStyles.value = { left: rect.left + "px", top: "var(--onyx-density-md)" };
        } else if (isTooLow) {
          scrolledOut.value = "bottom";
          stickyStyles.value = { left: rect.left + "px", bottom: "var(--onyx-density-md)" };
        }
      }
    }
  };
  const disableSticky = computed(() => {
    return !options.sticky.value || !options.isVisible.value;
  });
  useGlobalEventListener({
    type: "scroll",
    listener: () => checkVisibilityOnScroll(),
    disabled: disableSticky,
  });
  useGlobalEventListener({
    type: "resize",
    listener: () => checkVisibilityOnScroll(),
    disabled: disableSticky,
  });
  onMounted(async () => {
    await nextTick(); // waiting for DOM
    if (!disableSticky.value) checkVisibilityOnScroll();
  });

  return { stickyStyles, scrolledOut, isSticky, checkVisibilityOnScroll };
}
