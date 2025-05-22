<script lang="ts" setup>
import { createToggletip, createTooltip, useGlobalEventListener } from "@sit-onyx/headless";
import {
  computed,
  nextTick,
  onMounted,
  ref,
  shallowRef,
  toValue,
  useId,
  useTemplateRef,
  watch,
  type AriaAttributes,
  type MaybeRefOrGetter,
  type Ref,
  type VNode,
} from "vue";
import { useDensity } from "../../composables/density";
import {
  useAnchorPositionPolyfill,
  USERAGENT_SUPPORTS_ANCHOR_API,
  useWebkitPopoverKeyFix,
} from "../../composables/useAnchorPositionPolyfill";
import { useOpenAlignment } from "../../composables/useOpenAlignment";
import { useOpenDirection } from "../../composables/useOpenDirection";
import { useResizeObserver } from "../../composables/useResizeObserver";
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
  props.alignment === "auto" ? openAlignment.value : props.alignment,
);

// classes for the tooltip | computed to prevent bugs
const tooltipClasses = computed(() => {
  return {
    "onyx-tooltip--danger": props.color === "danger",
    "onyx-tooltip--success": props.color === "success",
    "onyx-tooltip--fit-parent": props.fitParent,
    "onyx-tooltip--aligns-with-edge": alignsWithEdge.value,
    "onyx-tooltip--hidden": !isVisible.value,
    [`onyx-tooltip--position-${toolTipPosition.value.replace(" ", "-")}`]: true,
    [`onyx-tooltip--alignment-${alignment.value}`]: true,
    "onyx-tooltip--dont-support-anchor": !USERAGENT_SUPPORTS_ANCHOR_API,
  };
});

const positionAndAlignment = computed(() => {
  let returnPosition = toolTipPosition.value;
  if (
    (toolTipPosition.value === "top" || toolTipPosition.value === "bottom") &&
    alignsWithEdge.value
  ) {
    if (alignment.value === "left") {
      returnPosition = toolTipPosition.value + " " + "x-start";
    }
    if (alignment.value === "right") {
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
const alignsWithEdge = computed(() => props.alignsWithEdge);
const fitParent = computed(() => props.fitParent);

const tooltipWrapperRef = useTemplateRef("tooltipWrapperRefEl");
const tooltipRef = useTemplateRef("tooltipRefEl");
const { openDirection, updateOpenDirection } = useOpenDirection(tooltipWrapperRef, "top");
const { openAlignment, updateOpenAlignment } = useOpenAlignment(tooltipWrapperRef, tooltipRef);
const { leftPosition, topPosition, updateAnchorPositionPolyfill } = useAnchorPositionPolyfill({
  positionedRef: tooltipRef,
  targetRef: tooltipWrapperRef,
  positionArea: toolTipPosition,
  alignment: alignment,
  alignsWithEdge: alignsWithEdge,
  fitParent: fitParent,
});

// update open direction on resize to ensure the tooltip is always visible
const updateDirections = () => {
  updateOpenDirection();
  updateOpenAlignment();
};

useGlobalEventListener({
  type: "resize",
  listener: () => updateDirections(),
});

const handleOpening = (open: boolean) => {
  if (open) {
    tooltipRef.value?.showPopover();
  } else {
    tooltipRef.value?.hidePopover();
  }
};

const { width } = useResizeObserver(tooltipWrapperRef);
const tooltipWidth = computed(() =>
  props.fitParent && tooltipWrapperRef.value ? `${width.value}px` : "max-content",
);

// initial update
onMounted(() => {
  handleOpening(isVisible.value);
  updateDirections();
  if (!USERAGENT_SUPPORTS_ANCHOR_API) updateAnchorPositionPolyfill();
});
// update open direction when visibility changes to ensure the tooltip is always visible
watch(isVisible, async (newVal) => {
  await nextTick();
  handleOpening(newVal);
  updateDirections();
  if (!USERAGENT_SUPPORTS_ANCHOR_API) updateAnchorPositionPolyfill();
});
watch([tooltipWidth, toolTipPosition, alignment, alignsWithEdge], async () => {
  if (!USERAGENT_SUPPORTS_ANCHOR_API) {
    await nextTick();
    updateAnchorPositionPolyfill();
  }
});

const id = useId();
const anchorName = computed(() => `--anchor-${id}`);

const { popoverKey } = useWebkitPopoverKeyFix(isVisible);
</script>

<template>
  <div
    ref="tooltipWrapperRefEl"
    :class="['onyx-component', 'onyx-tooltip-wrapper', densityClass]"
    :style="`anchor-name: ${anchorName}`"
  >
    <dialog
      v-if="isVisible"
      :key="popoverKey"
      ref="tooltipRefEl"
      v-bind="tooltip"
      :class="['onyx-tooltip', 'onyx-text--small', 'onyx-truncation-multiline', tooltipClasses]"
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
    position: fixed;
    min-width: var(--onyx-spacing-3xl);
    width: max-content;
    max-width: 19rem;
    height: max-content;
    overflow: hidden;
    padding: 0;
    width: v-bind("tooltipWidth");
    position-anchor: v-bind("anchorName");
    position-area: v-bind("positionAndAlignment");

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

    &--dont-support-anchor {
      left: v-bind(leftPosition);
      top: v-bind(topPosition);
    }

    &:popover-open {
      border: none;
      outline: none;
      background: none;
    }
    &--content {
      position: relative;

      border-radius: var(--onyx-radius-sm);
      padding: var(--onyx-density-2xs) var(--onyx-density-sm);

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
          display: none;
        }
      }
    }
    &--position-top-left .onyx-tooltip--content {
      margin: 0 $wedge-size $wedge-size 0;
    }
    &--position-top-right .onyx-tooltip--content {
      margin: 0 0 $wedge-size $wedge-size;
    }
    &--position-bottom-left .onyx-tooltip--content {
      margin: $wedge-size $wedge-size 0 0;
    }
    &--position-bottom-right .onyx-tooltip--content {
      margin: $wedge-size 0 0 $wedge-size;
    }
    &--alignment-left {
      // only apply for top and bottom positions
      &.onyx-tooltip--position-top,
      &.onyx-tooltip--position-bottom {
        transform: translateX(calc(50% - 2 * $wedge-size));
        &.onyx-tooltip--aligns-with-edge {
          transform: translateX(100%);
          &.onyx-tooltip--dont-support-anchor {
            transform: none;
          }
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
          &.onyx-tooltip--dont-support-anchor {
            transform: none;
          }
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
