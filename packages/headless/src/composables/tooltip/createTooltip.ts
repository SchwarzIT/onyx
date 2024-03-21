import { computed, ref, unref, type MaybeRef } from "vue";
import { createId } from "../..";
import { createBuilder } from "../../utils/builder";

export type CreateTooltipOptions = {
  openMode: MaybeRef<TooltipOpenMode | boolean>;
  /**
   * Number of milliseconds to use as debounce when showing/hiding the tooltip
   * with openMode "hover".
   *
   * @default 200
   */
  debounce?: number;
};

export const TOOLTIP_OPEN_MODES = ["hover", "click"] as const;
export type TooltipOpenMode = (typeof TOOLTIP_OPEN_MODES)[number];

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
      }, options.debounce ?? 200);
    },
  });

  /**
   * Whether the tooltip should be currently visible.
   * If openMode is set as boolean it will prefer it over the hover/click state.
   */
  const isVisible = computed(() => {
    const mode = unref(options.openMode);
    if (typeof mode === "boolean") return mode;
    return debouncedVisible.value;
  });

  const handleClick = () => {
    _isVisible.value = !_isVisible.value;
  };

  const handleMouseOver = () => {
    debouncedVisible.value = true;
  };

  const handleMouseOut = () => {
    debouncedVisible.value = false;
  };

  const hoverEvents = computed(() => {
    const openMode = unref(options.openMode);
    if (openMode !== "hover") return;
    return {
      onMouseover: handleMouseOver,
      onMouseout: handleMouseOut,
    };
  });

  return {
    elements: {
      trigger: computed(() => {
        const openMode = unref(options.openMode);

        return {
          "aria-describedby": tooltipId,
          onClick: openMode === "click" ? handleClick : undefined,
          ...hoverEvents.value,
        };
      }),
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
