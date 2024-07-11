import { computed, onBeforeMount, onBeforeUnmount, ref, unref, type MaybeRef } from "vue";
import { createId } from "../..";
import { createBuilder } from "../../utils/builder";
import { useOutsideClick } from "../helpers/useOutsideClick";

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
  const rootRef = ref<HTMLElement>();
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

  // close tooltip on outside click
  useOutsideClick({
    element: rootRef,
    onOutsideClick: () => (_isVisible.value = false),
    disabled: computed(() => openType.value !== "click"),
  });

  // add global document event listeners only on/before mounted to also work in server side rendering
  onBeforeMount(() => {
    document.addEventListener("keydown", handleDocumentKeydown);
  });

  /**
   * Clean up global event listeners to prevent dangling events.
   */
  onBeforeUnmount(() => {
    document.removeEventListener("keydown", handleDocumentKeydown);
  });

  return {
    elements: {
      root: {
        ref: rootRef,
      },
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
