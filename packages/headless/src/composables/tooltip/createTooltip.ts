import { computed, toRef, toValue, useId, type MaybeRefOrGetter, type Ref } from "vue";
import { createBuilder } from "../../utils/builder";
import { useDismissible } from "../helpers/useDismissible";

export type CreateTooltipOptions = {
  /**
   * Number of milliseconds to use as debounce when showing/hiding the tooltip.
   */
  debounce: MaybeRefOrGetter<number>;
  isVisible?: Ref<boolean>;
};

/**
 * Create a tooltip as described in https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tooltip_role
 * Its visibility is toggled on hover or focus.
 * A tooltip MUST be used to describe the associated trigger element. E.g. The usage with the ⓘ would be incorrect.
 * To provide contextual information use the `createToggletip`.
 */
export const createTooltip = createBuilder(({ debounce, isVisible }: CreateTooltipOptions) => {
  const tooltipId = useId();
  const triggerId = useId();
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
      /**
       * The element which controls the tooltip visibility on hover.
       */
      trigger: {
        "aria-describedby": tooltipId,
        ...hoverEvents,
        style: `--anchor-${triggerId}`,
      },
      /**
       * The element describing the tooltip.
       * Only simple, textual and non-focusable content is allowed.
       */
      tooltip: {
        popover: "manual",
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
