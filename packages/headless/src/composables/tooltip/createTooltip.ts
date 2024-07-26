import { computed, toRef, toValue, type MaybeRefOrGetter, type Ref } from "vue";
import { createId } from "../..";
import { createBuilder } from "../../utils/builder";
import { useDismissible } from "../helpers/useDismissible";

export type CreateTooltipOptions = {
  /**
   * Number of milliseconds to use as debounce when showing/hiding the tooltip.
   */
  debounce: MaybeRefOrGetter<number>;
  isVisible?: Ref<boolean>;
};

export const TOOLTIP_TRIGGERS = ["hover", "click"] as const;
export type TooltipTrigger = (typeof TOOLTIP_TRIGGERS)[number];

export const createTooltip = createBuilder(({ debounce, isVisible }: CreateTooltipOptions) => {
  const tooltipId = createId("tooltip");
  const _isVisible = toRef(isVisible ?? false);
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
      }, toValue(debounce));
    },
  });

  const hoverEvents = {
    onMouseover: () => (debouncedVisible.value = true),
    onMouseout: () => (debouncedVisible.value = false),
    onFocusin: () => (_isVisible.value = true),
    onFocusout: () => (_isVisible.value = false),
  };

  useDismissible({ isExpanded: _isVisible });

  return {
    elements: {
      trigger: {
        "aria-describedby": tooltipId,
        ...hoverEvents,
      },
      tooltip: {
        role: "tooltip",
        id: tooltipId,
        tabindex: "-1",
        ...hoverEvents,
      },
    },
    state: {
      isVisible: _isVisible,
    },
  };
});
