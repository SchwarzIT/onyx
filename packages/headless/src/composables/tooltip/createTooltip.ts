import { computed, ref, unref, watchEffect, type MaybeRef } from "vue";
import { createId } from "../..";
import { createBuilder } from "../../utils/builder";

export type CreateTooltipOptions = {
  trigger: MaybeRef<TooltipTrigger | boolean>;
  /**
   * Number of milliseconds to use as debounce when showing/hiding the tooltip
   * with openMode "hover".
   *
   * @default 0
   */
  debounce?: number;
};

export const TOOLTIP_TRIGGERS = ["hover", "click"] as const;
export type TooltipTrigger = (typeof TOOLTIP_TRIGGERS)[number];

export const createTooltip = createBuilder((options: CreateTooltipOptions) => {
  const tooltipId = createId("tooltip");
  const _isVisible = ref(false);
  let timeout: ReturnType<typeof setTimeout> | undefined;

  /**
   * Debounced visible state that will only be toggled after a given timeout.
   */
  const debouncedVisible = computed({
    get: () => _isVisible.value,
    set: (newValue) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        _isVisible.value = newValue;
      }, options.debounce ?? 0);
    },
  });

  /**
   * Whether the tooltip should be currently visible.
   * If openMode is set as boolean it will prefer it over the hover/click state.
   */
  const isVisible = computed(() => {
    const mode = unref(options.trigger);
    if (typeof mode === "boolean") return mode;
    return debouncedVisible.value;
  });

  /**
   * Toggles the tooltip if element is clicked.
   */
  const handleClick = () => {
    _isVisible.value = !_isVisible.value;
  };

  const hoverEvents = computed(() => {
    if (unref(options.trigger) !== "hover") return;
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

  /**
   * Registers keydown and click handlers when trigger is "click" to close
   * the tooltip.
   */
  watchEffect(() => {
    const trigger = unref(options.trigger);
    document.removeEventListener("keydown", handleDocumentKeydown);
    document.removeEventListener("click", handleDocumentClick);

    if (trigger === "click") {
      document.addEventListener("keydown", handleDocumentKeydown);
      document.addEventListener("click", handleDocumentClick);
    }
  });

  return {
    elements: {
      trigger: computed(() => ({
        "aria-describedby": tooltipId,
        onClick: unref(options.trigger) === "click" ? handleClick : undefined,
        ...hoverEvents.value,
      })),
      tooltip: computed(() => ({
        role: "tooltip",
        id: tooltipId,
        ...hoverEvents.value,
      })),
    },
    state: {
      isVisible,
    },
  };
});
