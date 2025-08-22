import { useGlobalEventListener } from "@sit-onyx/headless";
import {
  computed,
  nextTick,
  onMounted,
  ref,
  toValue,
  watch,
  type MaybeRef,
  type Ref,
  type ShallowRef,
} from "vue";
import { useResizeObserver } from "../../composables/useResizeObserver.js";
import type { PopoverPosition } from "./types.js";

export type UsePopoverAutoPositionOptions = {
  position: MaybeRef<PopoverPosition>;
  wrapperRef: Readonly<ShallowRef<HTMLElement | null>>;
  dialogRef: Readonly<ShallowRef<HTMLElement | null>>;
  open: Ref<boolean>;
};

export const usePopoverAutoPosition = (options: UsePopoverAutoPositionOptions) => {
  const autoPosition = ref<PopoverPosition>();
  const userPosition = computed(() => toValue(options.position));
  const position = computed(() => autoPosition.value ?? userPosition.value);

  const updatePosition = () => {
    const wrapper = toValue(options.wrapperRef);
    const dialog = toValue(options.dialogRef);
    if (!wrapper || !dialog) {
      autoPosition.value = undefined;
      return;
    }

    const dialogRect = dialog.getBoundingClientRect();
    const parentRect = findParentWithHiddenOverflow(wrapper)?.getBoundingClientRect();
    const visualViewport = window.visualViewport;

    // bounding box of the popovers visual parent of the
    // the popover is considered visible if it fully fits into this rect
    const parent = {
      top: parentRect?.top ?? visualViewport?.pageTop ?? 0,
      bottom: parentRect?.bottom ?? visualViewport?.height ?? 0,
      right: parentRect?.right ?? visualViewport?.width ?? 0,
      left: parentRect?.left ?? visualViewport?.pageLeft ?? 0,
    };

    const isOverflowing = {
      top: dialogRect.top < parent.top,
      bottom: dialogRect.bottom > parent.bottom,
      left: dialogRect.left < parent.left,
      right: dialogRect.right > parent.right,
    };

    let newPosition = userPosition.value;

    if (isOverflowing.top) {
      newPosition = newPosition.replace("top", "bottom") as PopoverPosition;
    }
    if (isOverflowing.bottom) {
      newPosition = newPosition.replace("bottom", "top") as PopoverPosition;
    }
    if (isOverflowing.left) {
      newPosition = newPosition
        .replace("span-left", "span-x-end")
        .replace("left", "right") as PopoverPosition;
    }
    if (isOverflowing.right) {
      newPosition = newPosition
        .replace("span-x-end", "span-left")
        .replace("right", "left") as PopoverPosition;
    }

    autoPosition.value = newPosition !== userPosition.value ? newPosition : undefined;
  };

  useGlobalEventListener({
    type: "resize",
    listener: updatePosition,
  });

  const { width } = useResizeObserver(options.wrapperRef);

  onMounted(() => {
    watch(
      [options.open, userPosition, width],
      async () => {
        await nextTick();
        updatePosition();
      },
      { immediate: true },
    );
  });

  return { position };
};

export const findParentWithHiddenOverflow = (element?: Element): Element | undefined => {
  /**
   * Recursively finds the first parent element with hidden overflow.
   */
  if (!element) return undefined;

  const style = getComputedStyle(element);
  if (style.overflow.includes("hidden")) {
    // if the element has hidden overflow, the popover would be cut off by this element so we need to use
    // this element as parent to calculate the open direction instead of the body.
    return element;
  }

  return element.parentElement ? findParentWithHiddenOverflow(element.parentElement) : undefined;
};
