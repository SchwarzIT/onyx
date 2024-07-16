import { computed, ref, toValue, type MaybeRefOrGetter } from "vue";
import { createId } from "../..";
import { createBuilder } from "../../utils/builder";
import { useDismissible } from "../helpers/useDismissible";

export type CreateTooltipOptions = {
  /**
   * Number of milliseconds to use as debounce when showing/hiding the tooltip.
   */
  debounce: MaybeRefOrGetter<number>;
};

export const TOOLTIP_TRIGGERS = ["hover", "click"] as const;
export type TooltipTrigger = (typeof TOOLTIP_TRIGGERS)[number];

export const createTooltip = createBuilder(({ debounce }: CreateTooltipOptions) => {
  const tooltipId = createId("tooltip");
  const isVisible = ref(false);
  let timeout: ReturnType<typeof setTimeout> | undefined;

  /**
   * Debounced visible state that will only be toggled after a given timeout.
   */
  const debouncedVisible = computed({
    get: () => isVisible.value,
    set: (newValue) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        isVisible.value = newValue;
      }, toValue(debounce));
    },
  });

  const hoverEvents = {
    onMouseover: () => (debouncedVisible.value = true),
    onMouseout: () => (debouncedVisible.value = false),
    onFocusin: () => (isVisible.value = true),
    onFocusout: () => (isVisible.value = false),
  };

  useDismissible({ isExpanded: isVisible });

  return {
    elements: {
      trigger: computed(() => ({
        "aria-describedby": tooltipId,
        ...hoverEvents,
      })),
      tooltip: computed(() => ({
        role: "tooltip",
        id: tooltipId,
        tabindex: "-1",
        ...hoverEvents,
      })),
    },
    state: {
      isVisible,
    },
  };
});
