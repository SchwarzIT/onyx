<script lang="ts" setup>
import { createToggletip, createTooltip } from "@sit-onyx/headless";
import {
  computed,
  shallowRef,
  toValue,
  watch,
  type AriaAttributes,
  type MaybeRefOrGetter,
  type Ref,
  type VNode,
} from "vue";
import { useDensity } from "../../composables/density.js";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import type { Nullable } from "../../types/utils.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxSupportPopover from "../OnyxSupportPopover/OnyxSupportPopover.vue";
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
  position: "bottom span-all",
  trigger: "hover",
  open: undefined,
});

const emit = defineEmits<{
  /**
   * Emitted when the open state of the tooltip changes.
   */
  "update:open": [open: Nullable<boolean>];
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

const createPattern = () =>
  triggerType.value === "hover"
    ? createTooltip(tooltipOptions.value)
    : createToggletip(toggletipOptions.value);

const ariaPattern = shallowRef(createPattern());
watch(triggerType, () => (ariaPattern.value = createPattern()));

const tooltip = computed(() => ({
  ...ariaPattern.value.elements.tooltip,
  popover: undefined,
  anchor: undefined,
}));
const triggerElementProps = computed(() => toValue<object>(ariaPattern.value?.elements.trigger));

// classes for the tooltip | computed to prevent bugs
const tooltipClasses = computed(() => {
  return {
    "onyx-tooltip--danger": props.color === "danger",
    "onyx-tooltip--success": props.color === "success",
    "onyx-tooltip--without-wedge": props.withoutWedge,
  };
});
</script>

<template>
  <OnyxSupportPopover
    v-model:open="isVisible"
    :class="['onyx-tooltip', densityClass, tooltipClasses]"
    label=""
    :position="props.position"
  >
    <template #trigger>
      <slot :trigger="triggerElementProps"></slot>
    </template>

    <!-- we are using inline "style" here since using v-bind causes hydration errors in Nuxt / SSR -->
    <div v-bind="tooltip" class="onyx-tooltip__content">
      <OnyxIcon v-if="props.icon" :icon="props.icon" size="16px" />
      <slot name="tooltip">{{ props.text }}</slot>
    </div>
  </OnyxSupportPopover>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

@mixin define-wedge {
  $wedge-size: 0.5rem;

  .onyx-tooltip__content {
    margin: 0 0 $wedge-size 0;

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

  .onyx-support-popover__dialog {
    overflow: hidden;
  }

  &:has(.onyx-support-popover__dialog--bottom) {
    .onyx-tooltip__content {
      margin: $wedge-size 0 0 0;

      &::after {
        top: -2 * $wedge-size;
        border-color: transparent transparent var(--background-color);
      }
    }
  }

  &:has(.onyx-support-popover__dialog--left) {
    .onyx-tooltip__content {
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

  &:has(.onyx-support-popover__dialog--right) {
    .onyx-tooltip__content {
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
}

.onyx-tooltip {
  @include layers.component() {
    --background-color: var(--onyx-color-base-neutral-900);
    --color: var(--onyx-color-text-icons-neutral-inverted);
    position: relative;
    width: max-content;
    place-content: center;

    &--danger {
      --background-color: var(--onyx-color-base-danger-200);
      --color: var(--onyx-color-text-icons-danger-bold);
    }

    &--success {
      --background-color: var(--onyx-color-base-success-200);
      --color: var(--onyx-color-text-icons-success-bold);
    }

    &__content {
      position: relative;

      border-radius: var(--onyx-radius-sm);
      padding: var(--onyx-density-2xs) var(--onyx-density-sm);

      display: flex;
      justify-content: center;
      align-items: center;
      gap: var(--onyx-density-2xs);

      background-color: var(--background-color);
      color: var(--color);
      text-align: center;
      white-space: pre-line;
    }

    &:not(&--without-wedge) {
      @include define-wedge();
    }
  }
}
</style>
