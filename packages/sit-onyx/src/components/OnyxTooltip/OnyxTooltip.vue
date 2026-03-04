<script lang="ts" setup>
import { createToggletip, createTooltip, useGlobalEventListener } from "@sit-onyx/headless";
import {
  computed,
  onMounted,
  shallowRef,
  toRef,
  toValue,
  useId,
  useTemplateRef,
  watch,
  type AriaAttributes,
  type MaybeRefOrGetter,
  type Ref,
  type VNode,
} from "vue";
import { useDensity } from "../../composables/density.js";
import { useAnchorPositionPolyfill } from "../../composables/useAnchorPositionPolyfill.js";
import { useOpenAlignment } from "../../composables/useOpenAlignment.js";
import { useOpenDirection } from "../../composables/useOpenDirection.js";
import { useResizeObserver } from "../../composables/useResizeObserver.js";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxTooltipProps } from "./types.js";

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
  trigger: "hover",
  alignment: "auto",
  alignsWithEdge: false,
  open: undefined,
});

const emit = defineEmits<{
  /**
   * Emitted when the open state of the tooltip changes.
   */
  "update:open": [open: boolean];
}>();

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

const isVisible = useVModel({
  props,
  emit,
  key: "open",
  default: false,
});

const tooltipOptions = computed<CreateTooltipOptions>(() => ({
  debounce: 200,
  ...((typeof props.trigger === "object" && props.trigger.type === "hover" && props.trigger) || {}),
  isVisible,
}));

const toggletipOptions = computed<CreateToggletipOptions>(() => ({
  toggleLabel: t.value(`tooltip.${props.color}`),
  ...((typeof props.trigger === "object" && props.trigger.type === "click" && props.trigger) || {}),
  isVisible,
}));

const triggerType = computed(() => {
  if (typeof props.trigger === "object") return props.trigger.type;
  return props.trigger;
});
const toolTipPosition = computed(() =>
  props.position === "auto" ? openDirection.value : props.position,
);
const alignment = computed(() =>
  props.alignment === "auto" ? openAlignment.value : props.alignment,
);

const positionAndAlignment = computed(() => {
  if (
    (toolTipPosition.value === "top" || toolTipPosition.value === "bottom") &&
    props.alignsWithEdge
  ) {
    if (alignment.value === "left") {
      return `${toolTipPosition.value} x-start`;
    }
    if (alignment.value === "right") {
      return `${toolTipPosition.value} x-end`;
    }
  }
  if (toolTipPosition.value.includes(" ")) {
    return toolTipPosition.value;
  }
  return `${toolTipPosition.value} center`;
});

const createPattern = () =>
  triggerType.value === "hover"
    ? createTooltip(tooltipOptions.value)
    : createToggletip(toggletipOptions.value);

const ariaPattern = shallowRef(createPattern());
watch(triggerType, () => (ariaPattern.value = createPattern()));

const tooltip = computed(() => ariaPattern.value?.elements.tooltip);
const triggerElementProps = computed(() => toValue<object>(ariaPattern.value?.elements.trigger));

const alignsWithEdge = toRef(() => props.alignsWithEdge);
const fitParent = toRef(() => props.fitParent);

const tooltipWrapperRef = useTemplateRef("tooltipWrapperRefEl");
const tooltipRef = useTemplateRef("tooltipRefEl");
const { openDirection, updateOpenDirection } = useOpenDirection(tooltipWrapperRef, "top");
const { openAlignment, updateOpenAlignment } = useOpenAlignment(tooltipWrapperRef, tooltipRef);
const { leftPosition, topPosition, updateAnchorPositionPolyfill, useragentSupportsAnchorApi } =
  useAnchorPositionPolyfill({
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
    tooltipRef.value?.showPopover?.();
  } else {
    tooltipRef.value?.hidePopover?.();
  }
};

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
    "onyx-tooltip--dont-support-anchor": !useragentSupportsAnchorApi.value,
    "onyx-tooltip--without-wedge": props.withoutWedge,
  };
});

const { width } = useResizeObserver(tooltipWrapperRef);
const tooltipWidth = computed(() =>
  props.fitParent && tooltipWrapperRef.value ? `${width.value}px` : "max-content",
);

// initial update
onMounted(() => {
  handleOpening(isVisible.value);
  updateDirections();
});

// Setup polyfill
onMounted(() => {
  if (useragentSupportsAnchorApi.value) {
    return;
  }

  watch(
    [tooltipWidth, toolTipPosition, alignment, alignsWithEdge, isVisible],
    () => updateAnchorPositionPolyfill(),
    { flush: "post", immediate: true },
  );
});

// update open direction when visibility changes to ensure the tooltip is always visible
watch(
  isVisible,
  async (newVal) => {
    handleOpening(newVal);
    updateDirections();
  },
  { flush: "post" },
);

const anchorName = `--anchor-${useId()}`;

const tooltipStyles = computed(() => {
  if (useragentSupportsAnchorApi.value) {
    return {
      width: tooltipWidth.value,
      "position-anchor": anchorName,
      "position-area": positionAndAlignment.value,
    };
  }

  // fallback styles if browser does not support the Anchor API yet
  return {
    width: tooltipWidth.value,
    left: leftPosition.value,
    top: topPosition.value,
  };
});
</script>

<template>
  <div
    ref="tooltipWrapperRefEl"
    :class="['onyx-component', 'onyx-tooltip-wrapper', densityClass]"
    :style="`anchor-name: ${anchorName}`"
  >
    <!-- we are using inline "style" here since using v-bind causes hydration errors in Nuxt / SSR -->
    <div
      ref="tooltipRefEl"
      v-bind="tooltip"
      :class="['onyx-tooltip', 'onyx-text--small', 'onyx-truncation-multiline', tooltipClasses]"
      :style="tooltipStyles"
    >
      <div class="onyx-tooltip--content">
        <OnyxIcon v-if="props.icon" :icon="props.icon" size="16px" />
        <slot name="tooltip">{{ props.text }}</slot>
      </div>
    </div>

    <slot :trigger="triggerElementProps"></slot>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

$wedge-size: 0.5rem;

.onyx-tooltip {
  @include layers.component() {
    /**
     * CSS [length](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length) value that can be used to add an extra offset/margin the tooltip.
     */
    --offset: 0rem;

    position: fixed;
    min-width: var(--onyx-spacing-3xl);
    width: max-content;
    max-width: 19rem;
    height: max-content;
    overflow: hidden;
    padding: 0;

    --offset-with-wedge: calc(var(--offset) + #{$wedge-size});
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

      border-radius: var(--onyx-radius-sm);
      padding: var(--onyx-density-2xs) var(--onyx-density-sm);

      display: flex;
      justify-content: center;
      align-items: center;
      gap: var(--onyx-density-2xs);
      margin: 0 0 var(--offset-with-wedge) 0;

      background-color: var(--background-color);
      color: var(--color);
      font-family: var(--onyx-font-family-paragraph);
      text-align: center;
      white-space: pre-line;

      &::after {
        content: " ";
        position: absolute;
        /* At the bottom of the tooltip */
        top: 100%;
        left: 50%;
        width: 2 * $wedge-size;
        height: 2 * $wedge-size;
        margin-left: -$wedge-size;
        border-width: $wedge-size;
        border-style: solid;
        border-color: var(--background-color) transparent transparent;
        white-space: normal;
      }
    }
    &--position-bottom {
      .onyx-tooltip--content {
        margin: var(--offset-with-wedge) 0 0 0;

        &::after {
          top: -2 * $wedge-size;
          border-color: transparent transparent var(--background-color);
        }
      }
    }

    &--position-left {
      .onyx-tooltip--content {
        margin: 0 var(--offset-with-wedge) 0 0;

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
        margin: 0 0 0 var(--offset-with-wedge);

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
    &--without-wedge,
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
      margin: 0 var(--offset-with-wedge) var(--offset-with-wedge) 0;
    }
    &--position-top-right .onyx-tooltip--content {
      margin: 0 0 var(--offset-with-wedge) var(--offset-with-wedge);
    }
    &--position-bottom-left .onyx-tooltip--content {
      margin: var(--offset-with-wedge) var(--offset-with-wedge) 0 0;
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
    height: max-content;
    place-content: center;
  }
}
</style>
