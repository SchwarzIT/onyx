import { useGlobalEventListener } from "@sit-onyx/headless";
import { computed, nextTick, onMounted, ref, type Ref } from "vue";

export function useClipping(
  popoverRef: Ref<HTMLElement | null>,
  popoverWrapperRef: Ref<HTMLElement | null>,
  popoverPosition: Ref<string>,
  isVisible: Ref<boolean>,
  clipping: Ref<boolean>,
) {
  const clippingStyles = ref("");
  const scrolledOut = ref<null | "top" | "bottom">(null);
  const isClipping = ref(false);

  const checkVisibilityOnScroll = () => {
    const MIN_DISTANCE_TO_BORDER = 16;
    const MARGIN = 8;

    if (!popoverRef.value || !popoverWrapperRef.value || !isVisible.value) return;

    if (isClipping.value) {
      const popoverRect = popoverRef.value.getBoundingClientRect();
      const wrapperRect = popoverWrapperRef.value.getBoundingClientRect();
      const requiredHeight = popoverRect.height + MIN_DISTANCE_TO_BORDER + MARGIN;

      if (
        popoverPosition.value === "top" ||
        popoverPosition.value === "top left" ||
        popoverPosition.value === "top right"
      ) {
        if (scrolledOut.value === "top" && wrapperRect.top > requiredHeight) {
          isClipping.value = false;
          return;
        }
        if (scrolledOut.value === "bottom" && wrapperRect.top + MARGIN < window.innerHeight) {
          isClipping.value = false;
          return;
        }
      } else if (
        popoverPosition.value === "bottom" ||
        popoverPosition.value === "bottom left" ||
        popoverPosition.value === "bottom right"
      ) {
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
      }
    } else {
      const rect = popoverRef.value.getBoundingClientRect();
      const isTooHigh = rect.top < MIN_DISTANCE_TO_BORDER;
      const isTooLow = rect.bottom > window.innerHeight - MIN_DISTANCE_TO_BORDER;

      if (isTooHigh || isTooLow) {
        isClipping.value = true;
        if (isTooHigh) {
          scrolledOut.value = "top";
          clippingStyles.value = `left: ${rect.left}px; top: 1rem;`;
        } else if (isTooLow) {
          scrolledOut.value = "bottom";
          clippingStyles.value = `left: ${rect.left}px; bottom: 1rem;`;
        }
      }
    }
  };
  const disableClipping = computed(() => {
    return !clipping.value || !isVisible.value;
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
