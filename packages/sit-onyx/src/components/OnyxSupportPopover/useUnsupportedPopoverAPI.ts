import { computed, nextTick, onMounted, watch, type Ref } from "vue";
import { useAnchorPositionPolyfill } from "../../composables/useAnchorPositionPolyfill.js";
import {
  useResizeObserver,
  type VueTemplateRefElement,
} from "../../composables/useResizeObserver.js";
import type { PopoverPosition } from "./types.js";

export type UseUnsupportedPopoverAPIOptions = {
  /**
   * Whether the popover is open.
   */
  open: Ref<boolean>;
  /**
   * How to position the popover relative to the trigger element.
   */
  position: Ref<PopoverPosition>;
  /**
   * Template ref of the wrapper component around the popover + trigger.
   */
  wrapperRef: Ref<VueTemplateRefElement>;
  /**
   * Template ref of the dialog element that is toggled with the popover.
   */
  dialogRef: Ref<VueTemplateRefElement>;
};

/**
 * This composable is intended to be deleted once the Popover API is supported in all major browsers.
 */
export const useUnsupportedPopoverAPI = (options: UseUnsupportedPopoverAPIOptions) => {
  const {
    leftPosition,
    topPosition,
    updateAnchorPositionPolyfill,
    userAgentSupportsAnchorApi,
    fitParentWidth,
    fitParentHeight,
  } = useAnchorPositionPolyfill({
    positionedRef: options.dialogRef,
    targetRef: options.wrapperRef,
    position: options.position,
    offset: 8, // same as var(--onyx-support-popover-gap)
  });

  const { width, height } = useResizeObserver(options.wrapperRef);

  onMounted(() => {
    if (!userAgentSupportsAnchorApi.value) updateAnchorPositionPolyfill();
  });

  watch([options.open, options.position, width], async () => {
    await nextTick();
    if (!userAgentSupportsAnchorApi.value) updateAnchorPositionPolyfill();
  });

  const dialogAttributes = computed(() => {
    if (userAgentSupportsAnchorApi.value) return;

    return {
      style: {
        width: fitParentWidth.value ? `${width.value}px` : undefined,
        height: fitParentHeight.value ? `${height.value}px` : undefined,
        left: leftPosition.value,
        top: topPosition.value,
      },
      class: "onyx-support-popover__dialog--unsupported-popover-api",
    };
  });

  return { dialogAttributes };
};
