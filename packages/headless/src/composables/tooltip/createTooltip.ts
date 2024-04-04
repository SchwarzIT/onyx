import {
  computed,
  onBeforeMount,
  onBeforeUnmount,
  ref,
  unref,
  watchEffect,
  type MaybeRef,
} from "vue";
import { createId } from "../..";
import { createBuilder } from "../../utils/builder";

export type CreateTooltipOptions = {
  open: MaybeRef<TooltipOpen>;
};

export type TooltipOpen =
  | TooltipTrigger
  | boolean
  | {
      type: "hover";
      /**
       * Number of milliseconds to use as debounce when showing/hiding the tooltip
       */
      debounce: number;
    };

export const TOOLTIP_TRIGGERS = ["hover", "click"] as const;
export type TooltipTrigger = (typeof TOOLTIP_TRIGGERS)[number];

export const createTooltip = createBuilder((options: CreateTooltipOptions) => {
  const tooltipId = createId("tooltip");
  const _isVisible = ref(false);
  let timeout: ReturnType<typeof setTimeout> | undefined;

  const debounce = computed(() => {
    const open = unref(options.open);
    if (typeof open !== "object") return 200;
    return open.debounce;
  });

  const openType = computed(() => {
    const open = unref(options.open);
    if (typeof open !== "object") return open;
    return open.type;
  });

  /**
   * Debounced visible state that will only be toggled after a given timeout.
   */
  const debouncedVisible = computed({
    get: () => _isVisible.value,
    set: (newValue) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        _isVisible.value = newValue;
      }, debounce.value);
    },
  });

  /**
   * Whether the tooltip should be currently visible.
   * If openMode is set as boolean it will prefer it over the hover/click state.
   */
  const isVisible = computed(() => {
    if (typeof openType.value === "boolean") return openType.value;
    return debouncedVisible.value;
  });

  /**
   * Toggles the tooltip if element is clicked.
   */
  const handleClick = () => {
    _isVisible.value = !_isVisible.value;
  };

  const hoverEvents = computed(() => {
    if (openType.value !== "hover") return;
    return {
      onMouseover: () => (debouncedVisible.value = true),
      onMouseout: () => (debouncedVisible.value = false),
      onFocusin: () => (_isVisible.value = true),
      onFocusout: () => (_isVisible.value = false),
    };
  });

  /**
   * Closes the tooltip if Escape is pressed.
   */
  const handleDocumentKeydown = (event: KeyboardEvent) => {
    if (event.key !== "Escape") return;
    _isVisible.value = false;
  };

  /**
   * Document click handle that closes then tooltip when clicked outside.
   * Should only be called when trigger is "click".
   */
  const handleDocumentClick = (event: MouseEvent) => {
    const tooltipParent = document.getElementById(tooltipId)?.parentElement;
    if (!tooltipParent || !(event.target instanceof Node)) return;

    const isOutsideClick = !tooltipParent.contains(event.target);
    if (isOutsideClick) _isVisible.value = false;
  };

  // add global document event listeners only on/before mounted to also work in server side rendering
  onBeforeMount(() => {
    document.addEventListener("keydown", handleDocumentKeydown);

    /**
     * Registers keydown and click handlers when trigger is "click" to close
     * the tooltip.
     */
    watchEffect(() => {
      if (openType.value === "click") {
        document.addEventListener("click", handleDocumentClick);
      } else {
        document.removeEventListener("click", handleDocumentClick);
      }
    });
  });

  /**
   * Clean up global event listeners to prevent dangling events.
   */
  onBeforeUnmount(() => {
    document.addEventListener("keydown", handleDocumentKeydown);
    document.addEventListener("click", handleDocumentClick);
  });

  return {
    elements: {
      trigger: computed(() => ({
        "aria-describedby": tooltipId,
        onClick: openType.value === "click" ? handleClick : undefined,
        ...hoverEvents.value,
      })),
      tooltip: computed(() => ({
        role: "tooltip",
        id: tooltipId,
        tabindex: "-1",
        ...hoverEvents.value,
      })),
    },
    state: {
      isVisible,
    },
  };
});
