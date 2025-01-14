<script lang="ts" setup>
import { createToggletip, createTooltip, useGlobalEventListener } from "@sit-onyx/headless";
import type { AriaAttributes, MaybeRefOrGetter, Ref, VNode } from "vue";
import { computed, nextTick, onMounted, ref, shallowRef, toValue, watch } from "vue";
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
// classes for the tooltip | computed to prevent bugs
const tooltipClasses = computed(() => {
  return {
    "onyx-tooltip--danger": props.color === "danger",
    "onyx-tooltip--success": props.color === "success",
    "onyx-tooltip--fit-parent": props.fitParent,
    "onyx-tooltip--aligns-with-edge": props.alignsWithEdge,
    "onyx-tooltip--hidden": !isVisible.value,
    [`onyx-tooltip--${openDirection.value}`]: props.position === "auto",
    [`onyx-tooltip--${props.position}`]: props.position !== "auto",
    [`onyx-tooltip--${wedgePosition.value}`]: props.alignment === "auto",
    [`onyx-tooltip--${props.alignment}`]: props.alignment !== "auto",
  };
});

const createPattern = () =>
  type.value === "hover"
    ? createTooltip(tooltipOptions.value)
    : createToggletip(toggletipOptions.value);

const ariaPattern = shallowRef(createPattern());
watch(type, () => (ariaPattern.value = createPattern()));

const tooltip = computed(() => ariaPattern.value?.elements.tooltip);
const trigger = computed(() => toValue<object>(ariaPattern.value?.elements.trigger));

const tooltipWrapperRef = ref<HTMLElement>();
const tooltipRef = ref<HTMLElement>();
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

// initial update
onMounted(() => updateDirections());
// update open direction when visibility changes to ensure the tooltip is always visible
watch(isVisible, async () => {
  await nextTick();
  updateOpenDirection();
  updateWedgePosition();
});
</script>

<template>
  <div ref="tooltipWrapperRef" :class="['onyx-component', 'onyx-tooltip-wrapper', densityClass]">
    <div
      ref="tooltipRef"
      v-bind="tooltip"
      :class="['onyx-tooltip', 'onyx-text--small', 'onyx-truncation-multiline', tooltipClasses]"
    >
      <OnyxIcon v-if="props.icon" :icon="props.icon" size="16px" />
      <slot name="tooltip">{{ props.text }}</slot>
    </div>

    <slot :trigger="trigger"></slot>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

$wedge-size: 0.5rem;

.onyx-tooltip {
  @include layers.component() {
    --background-color: var(--onyx-color-base-neutral-900);
    --color: var(--onyx-color-text-icons-neutral-inverted);

    border-radius: var(--onyx-radius-sm);
    padding: var(--onyx-density-2xs) var(--onyx-density-sm);
    box-shadow: var(--onyx-shadow-medium-bottom);
    z-index: var(--onyx-z-index-flyout);

    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--onyx-density-2xs);
    height: max-content;
    margin-bottom: $wedge-size;

    background-color: var(--background-color);
    color: var(--color);
    font-family: var(--onyx-font-family);
    text-align: center;
    white-space: pre-line;

    min-width: var(--onyx-spacing-3xl);
    width: max-content;
    max-width: 19rem;

    // positioning
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 100%;

    &--hidden {
      display: none;
    }

    &--fit-parent {
      width: 100%;
    }

    &--danger {
      --background-color: var(--onyx-color-base-danger-200);
      --color: var(--onyx-color-text-icons-danger-bold);
    }

    &--success {
      --background-color: var(--onyx-color-base-success-200);
      --color: var(--onyx-color-text-icons-success-bold);
    }

    &::after {
      content: " ";
      position: absolute;
      /* At the bottom of the tooltip */
      top: 100%;
      left: 50%;
      margin-left: -$wedge-size;
      border-width: $wedge-size;
      border-style: solid;
      border-color: var(--background-color) transparent transparent;
      white-space: normal;
    }

    &--bottom {
      margin-bottom: 0;
      margin-top: $wedge-size;
      bottom: 0;
      top: 100%;

      &::after {
        top: -2 * $wedge-size;
        border-color: transparent transparent var(--background-color);
      }
    }

    &--left {
      left: 50%;
      transform: translateX(-2 * $wedge-size);
      &.onyx-tooltip--aligns-with-edge {
        left: 0%;
        transform: none;
      }
      &::after {
        left: 2 * $wedge-size;
      }
    }

    &--right {
      left: 50%;
      transform: translateX(calc(-100% + 2 * $wedge-size));
      &.onyx-tooltip--aligns-with-edge {
        left: 100%;
        transform: translateX(-100%);
      }
      &::after {
        left: calc(100% - 2 * $wedge-size);
      }
    }
  }
}

.onyx-tooltip-wrapper {
  @include layers.component() {
    position: relative;
    width: max-content;
  }
}
</style>
