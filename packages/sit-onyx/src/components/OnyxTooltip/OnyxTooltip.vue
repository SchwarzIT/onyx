<script lang="ts" setup>
import { createToggletip, createTooltip, useGlobalEventListener } from "@sit-onyx/headless";
import {
  computed,
  nextTick,
  onMounted,
  ref,
  shallowRef,
  toValue,
  unref,
  useId,
  useTemplateRef,
  watch,
  watchEffect,
  type AriaAttributes,
  type MaybeRefOrGetter,
  type Ref,
  type VNode,
} from "vue";
import { useDensity } from "../../composables/density";
import { useOpenDirection } from "../../composables/useOpenDirection";
import { useWedgePosition } from "../../composables/useWedgePosition";
import { injectI18n } from "../../i18n";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxTooltipProps } from "./types";

type CreateToggletipOptions = {
  toggleLabel: MaybeRefOrGetter<string>;
  isVisible?: Ref<boolean>;
};

type CreateTooltipOptions = {
  /**
   * Number of milliseconds to use as debounce when showing/hiding the tooltip.
   */
  debounce: MaybeRefOrGetter<number>;
  isVisible?: Ref<boolean>;
};

const props = withDefaults(defineProps<OnyxTooltipProps>(), {
  color: "neutral",
  position: "auto",
  fitParent: false,
  open: "hover",
  alignment: "auto",
  alignsWithEdge: false,
});

defineSlots<{
  /**
   * Default slot where the parent content is placed that controls the open/close state of the tooltip.
   *
   * **Accessibility**: You must ensure that the trigger attributes are bound to a button when the `open` prop is not `hover`!
   */

  //TODO: fix the attribute type
  default(params: { trigger: AriaAttributes }): VNode;
  /**
   * Optional slot to place custom content for the tooltip text.
   *
   * **Accessibility**: You must ensure that the tooltip content is NOT focusable/interactive.
   */
  tooltip?(): unknown;
}>();

const { densityClass } = useDensity(props);

const { t } = injectI18n();

//TODO: can be removed after anchor is implemented in all common browers
const supportsAnchor = ref(false);
const handlePositioningWithoutAnchorSupport = () => {
  const wedgeSize = 8;
  if (!supportsAnchor.value && tooltipRef.value && tooltipWrapperRef.value) {
    const tooltip = tooltipRef.value;
    const wrapper = tooltipWrapperRef.value;

    const wrapperRect = wrapper.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    let top = 0;
    let left = 0;
    if (alignment.value !== "center" && props.alignsWithEdge) {
      tooltipRef.value.style.transform = "none";
    } else {
      tooltipRef.value.style.transform = "";
    }

    const alignmentPositioning =
      props.alignsWithEdge && alignment.value !== "center"
        ? alignment.value === "left" || props.fitParent
          ? wrapperRect.left
          : wrapperRect.right - tooltipRect.width
        : wrapperRect.left + wrapperRect.width / 2 - tooltipRect.width / 2;
    switch (toolTipPosition.value) {
      case "top":
        top = wrapperRect.top - tooltipRect.height;
        left = alignmentPositioning;
        break;

      case "top right":
        top = wrapperRect.top - tooltipRect.height;
        left = wrapperRect.right;
        break;

      case "top left":
        top = wrapperRect.top - tooltipRect.height;
        left = wrapperRect.left - tooltipRect.width;
        break;

      case "right":
        top = wrapperRect.top + wrapperRect.height / 2 - tooltipRect.height / 2;
        left = wrapperRect.right;
        break;

      case "bottom":
        top = wrapperRect.bottom;
        left = alignmentPositioning;
        break;

      case "bottom right":
        top = wrapperRect.bottom + wedgeSize;
        left = wrapperRect.right + wedgeSize;
        break;

      case "bottom left":
        top = wrapperRect.bottom + wedgeSize;
        left = wrapperRect.left - tooltipRect.width - wedgeSize;
        break;

      case "left":
        top = wrapperRect.top + wrapperRect.height / 2 - tooltipRect.height / 2;
        left = wrapperRect.left - tooltipRect.width;
        break;
    }

    tooltip.style.position = "absolute"; // wichtig
    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
  }
};
const checkAnchorSupport = () => {
  supportsAnchor.value = CSS.supports("anchor-name: --test");

  if (!supportsAnchor.value && tooltipRef.value) {
    handlePositioningWithoutAnchorSupport();
  }
};
watch(
  () => [props.alignment, props.alignsWithEdge, props.fitParent, props.position],
  () => {
    if (!supportsAnchor.value) {
      nextTick(() => handlePositioningWithoutAnchorSupport());
    }
  },
);

const _isVisible = ref(false);
const isVisible = computed({
  set: (newVal) => (_isVisible.value = newVal),
  get: () => (typeof props.open === "boolean" ? props.open : _isVisible.value),
});

const tooltipOptions = computed<CreateTooltipOptions>(() => ({
  debounce: 200,
  ...((typeof props.open === "object" && props.open.type === "hover" && props.open) || {}),
  isVisible,
}));

const toggletipOptions = computed<CreateToggletipOptions>(() => ({
  toggleLabel: t.value(`tooltip.${props.color}`),
  ...((typeof props.open === "object" && props.open.type === "click" && props.open) || {}),
  isVisible,
}));

const type = computed(() => {
  if (typeof props.open === "object") return props.open.type;
  if (typeof props.open === "string") return props.open;
  return "hover";
});
const toolTipPosition = computed(() =>
  props.position === "auto" ? openDirection.value : props.position,
);
const alignment = computed(() =>
  props.alignment === "auto" ? wedgePosition.value : props.alignment,
);

// classes for the tooltip | computed to prevent bugs
const tooltipClasses = computed(() => {
  return {
    "onyx-tooltip--danger": props.color === "danger",
    "onyx-tooltip--success": props.color === "success",
    "onyx-tooltip--fit-parent": props.fitParent,
    "onyx-tooltip--aligns-with-edge": props.alignsWithEdge,
    "onyx-tooltip--hidden": !isVisible.value,
    [`onyx-tooltip--position-${toolTipPosition.value.replace(" ", "-")}`]: true,
    [`onyx-tooltip--alignment-${alignment.value}`]: true,
  };
});

const positionAndAlignment = computed(() => {
  let returnPosition = toolTipPosition.value;
  if (
    (toolTipPosition.value === "top" || toolTipPosition.value === "bottom") &&
    props.alignsWithEdge
  ) {
    if (props.alignment === "left") {
      returnPosition = toolTipPosition.value + " " + "x-start";
    }
    if (props.alignment === "right") {
      returnPosition = toolTipPosition.value + " " + "x-end";
    }
  }
  return returnPosition;
});

const createPattern = () =>
  type.value === "hover"
    ? createTooltip(tooltipOptions.value)
    : createToggletip(toggletipOptions.value);

const ariaPattern = shallowRef(createPattern());
watch(type, () => (ariaPattern.value = createPattern()));

const tooltip = computed(() => ariaPattern.value?.elements.tooltip);
const trigger = computed(() => toValue<object>(ariaPattern.value?.elements.trigger));

const tooltipWrapperRef = useTemplateRef("tooltipWrapperRefEl");
const tooltipRef = useTemplateRef("tooltipRefEl");
const { openDirection, updateOpenDirection } = useOpenDirection(tooltipWrapperRef, "top");
const { wedgePosition, updateWedgePosition } = useWedgePosition(tooltipWrapperRef, tooltipRef);

// update open direction on resize to ensure the tooltip is always visible
const updateDirections = () => {
  updateOpenDirection();
  updateWedgePosition();
};

useGlobalEventListener({
  type: "resize",
  listener: () => updateDirections(),
});

const handleOpening = (open: boolean) => {
  if (open) {
    unref(tooltipRef)?.showPopover();
  } else {
    unref(tooltipRef)?.hidePopover();
  }
};

const tooltipWidth = ref("auto");
watchEffect(() => {
  tooltipWidth.value =
    props.fitParent && tooltipWrapperRef.value
      ? `${tooltipWrapperRef.value.clientWidth}px`
      : "max-content";
});

// initial update
onMounted(() => {
  handleOpening(isVisible.value);
  if (tooltipWrapperRef.value) {
    const resizeObserver = new ResizeObserver(() => {
      if (props.fitParent && tooltipWrapperRef.value) {
        tooltipWidth.value = `${tooltipWrapperRef.value.clientWidth}px`;
      }
    });
    resizeObserver.observe(tooltipWrapperRef.value);
  }
  updateDirections();
  checkAnchorSupport();
});
// update open direction when visibility changes to ensure the tooltip is always visible
watch(isVisible, async (newVal) => {
  await nextTick();
  handleOpening(newVal);
  updateDirections();
});

const id = useId();
const anchorName = computed(() => `--anchor-${id}`);
</script>

<template>
  <div
    ref="tooltipWrapperRefEl"
    :class="['onyx-component', 'onyx-tooltip-wrapper', densityClass]"
    :style="`anchor-name: ${anchorName}`"
  >
    <dialog
      ref="tooltipRefEl"
      v-bind="tooltip"
      :class="['onyx-tooltip', 'onyx-text--small', 'onyx-truncation-multiline', tooltipClasses]"
      :style="`positionArea: ${positionAndAlignment};
        positionAnchor: ${anchorName};
        width: ${tooltipWidth};`"
    >
      <div class="onyx-tooltip--content">
        <OnyxIcon v-if="props.icon" :icon="props.icon" size="16px" />
        <slot name="tooltip">{{ props.text }}</slot>
      </div>
    </dialog>

    <slot :trigger="trigger"></slot>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

$wedge-size: 0.5rem;

.onyx-tooltip {
  @include layers.component() {
    position: absolute;
    min-width: var(--onyx-spacing-3xl);
    width: max-content;
    max-width: 19rem;
    height: max-content;
    overflow: hidden;
    padding: 0;

    --background-color: var(--onyx-color-base-neutral-900);
    --color: var(--onyx-color-text-icons-neutral-inverted);

    &--danger {
      --background-color: var(--onyx-color-base-danger-200);
      --color: var(--onyx-color-text-icons-danger-bold);
    }

    &--success {
      --background-color: var(--onyx-color-base-success-200);
      --color: var(--onyx-color-text-icons-success-bold);
    }

    &:popover-open {
      border: none;
      outline: none;
      background: none;
    }
    &--content {
      position: relative;
      height: 100%;

      border-radius: var(--onyx-radius-sm);
      padding: var(--onyx-density-2xs) var(--onyx-density-sm);
      box-shadow: var(--onyx-shadow-medium-bottom);

      display: flex;
      justify-content: center;
      align-items: center;
      gap: var(--onyx-density-2xs);
      margin: 0 0 $wedge-size 0;

      background-color: var(--background-color);
      color: var(--color);
      font-family: var(--onyx-font-family);
      text-align: center;
      white-space: pre-line;

      &::after {
        content: " ";
        position: absolute;
        /* At the bottom of the tooltip */
        top: 100%;
        left: 50%;
        width: 0;
        height: 0;
        margin-left: -$wedge-size;
        border-width: $wedge-size;
        border-style: solid;
        border-color: var(--background-color) transparent transparent;
        white-space: normal;
      }
    }
    &--position-bottom {
      .onyx-tooltip--content {
        margin: $wedge-size 0 0 0;
        bottom: 0;
        top: 100%;

        &::after {
          top: -2 * $wedge-size;
          border-color: transparent transparent var(--background-color);
        }
      }
    }

    &--position-left {
      .onyx-tooltip--content {
        margin: 0 $wedge-size 0 0;

        &::after {
          right: 0;
          left: 100%;
          transform: translateX($wedge-size);
          top: 50%;
          margin-top: -$wedge-size;
          border-color: transparent transparent transparent var(--background-color);
        }
      }
    }

    &--position-right {
      .onyx-tooltip--content {
        margin: 0 0 0 $wedge-size;
        left: 0;
        right: 100%;

        &::after {
          left: 0;
          right: 100%;
          transform: translateX(-$wedge-size);

          top: 50%;
          margin-top: -$wedge-size;
          border-color: transparent var(--background-color) transparent transparent;
        }
      }
    }
    &--position-top-left,
    &--position-top-right,
    &--position-bottom-left,
    &--position-bottom-right {
      .onyx-tooltip--content {
        &::after {
          // TODO: add wedge
          display: none;
        }
      }
    }
    &--alignment-left {
      // only apply for top and bottom positions
      &.onyx-tooltip--position-top,
      &.onyx-tooltip--position-bottom {
        transform: translateX(calc(50% - 2 * $wedge-size));
        &.onyx-tooltip--aligns-with-edge {
          transform: translateX(100%);
        }
        .onyx-tooltip--content {
          &::after {
            left: 2 * $wedge-size;
          }
        }
      }
    }
    &--alignment-right {
      // only apply for top and bottom positions
      &.onyx-tooltip--position-top,
      &.onyx-tooltip--position-bottom {
        transform: translateX(calc(-50% + 2 * $wedge-size));

        &.onyx-tooltip--aligns-with-edge {
          transform: translateX(-100%);
        }
        .onyx-tooltip--content {
          &::after {
            left: calc(100% - 2 * $wedge-size);
          }
        }
      }
    }
  }
}

.onyx-tooltip-wrapper {
  @include layers.component() {
    position: relative;
    width: max-content;
    place-content: center;
  }
}
</style>
