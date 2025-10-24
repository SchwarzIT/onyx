<script setup lang="ts" generic="TSliderMode extends SliderMode = 'single'">
import { createSlider } from "@sit-onyx/headless";
import { iconMinusSmall, iconPlusSmall } from "@sit-onyx/icons";
import { computed, toRefs, watch } from "vue";
import { useDensity } from "../../composables/density.js";
import { getFormMessages, useCustomValidity } from "../../composables/useCustomValidity.js";
import { useErrorClass } from "../../composables/useErrorClass.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
import { applyLimits } from "../../utils/numbers.js";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxFormElement from "../OnyxFormElement/OnyxFormElement.vue";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import OnyxTooltip from "../OnyxTooltip/OnyxTooltip.vue";
import OnyxVisuallyHidden from "../OnyxVisuallyHidden/OnyxVisuallyHidden.vue";
import type { OnyxSliderProps, SliderMode, SliderValue } from "./types.js";

/**
 * Adjusting the position for marks with proper edge offset to prevent overflow because of rounding.
 * For marks at 0% and 100%, applies a 0.25rem offset to keep them within bounds.
 */
const adjustMarkPosition = (percentage: number): string => {
  if (percentage <= 0) {
    return "calc(0.25rem)";
  }
  if (percentage >= 100) {
    return "calc(100% - 0.25rem)";
  }
  return `${percentage}%`;
};

const props = withDefaults(defineProps<OnyxSliderProps<TSliderMode>>(), {
  min: 0,
  max: 100,
  step: 1,
  shiftStep: (props) => {
    const min = props.min ?? 0;
    const max = props.max ?? 100;
    const step = props.step ?? 1;

    // Round to the nearest step multiple to ensure it aligns with step boundaries
    const stepMultiple = Math.max(1, Math.round(((max - min) * 0.1) / step));

    return stepMultiple * step;
  },
  marks: false,
  orientation: "horizontal",
  disabled: FORM_INJECTED_SYMBOL,
  showError: FORM_INJECTED_SYMBOL,
  skeleton: SKELETON_INJECTED_SYMBOL,
  mode: () => "single" as TSliderMode,
});

const emit = defineEmits<{
  /**
   * Emitted when the validity state of the slider changes.
   */
  validityChange: [validity: ValidityState];
  /**
   * Emitted when the slider changes
   */
  "update:modelValue": [value: SliderValue<TSliderMode>];
}>();

const modelValue = useVModel({
  props,
  emit,
  key: "modelValue",
});

const { vCustomValidity, errorMessages } = useCustomValidity({ props, emit });
const messages = computed(() => getFormMessages(props.message));

const { densityClass } = useDensity(props);

const { disabled, showError } = useFormContext(props);
const errorClass = useErrorClass(showError);
const skeleton = useSkeletonContext(props);

const handleChange = (values: SliderValue<TSliderMode>) => {
  emit("update:modelValue", values);
};

const handleDecreaseByIcon = () => {
  if (disabled.value) return;

  if (props.mode === "single") {
    const currentValue = Number(modelValue.value ?? props.min);
    const stepValue = props.shiftStep ?? props.step ?? 1;
    const newValue = Math.max(currentValue - stepValue, props.min);
    handleChange(newValue as SliderValue<TSliderMode>);
  }
};

const handleIncreaseByIcon = () => {
  if (disabled.value) return;

  if (props.mode === "single") {
    const currentValue = Number(modelValue.value ?? props.min);
    const stepValue = props.shiftStep ?? props.step ?? 1;
    const newValue = Math.min(currentValue + stepValue, props.max);
    handleChange(newValue as SliderValue<TSliderMode>);
  }
};

const { min, max, step, marks, orientation, label, discrete, shiftStep } = toRefs(props);

const thumbs = computed(() =>
  Array.isArray(modelValue.value) ? modelValue.value : [modelValue.value],
);

const {
  elements: { root, rail, track, thumbContainer, thumbInput, mark, markLabel },
  state: { focusedThumbIndex, activeThumbIndex, marksList },
  internals: { isMarkActive, valueToPercent, axis, normalizeValues },
} = createSlider({
  value: modelValue,
  min,
  max,
  step,
  label,
  marks,
  orientation,
  discrete,
  disabled,
  shiftStep,
  onChange: handleChange,
});

// Normalize values when min, max, step changes
watch(
  () => [props.min, props.max, props.step, props.mode],
  () => {
    const normalized = normalizeValues.value(
      props.mode === "range" ? [Number(modelValue.value)] : modelValue.value,
    );

    handleChange((props.mode === "range" ? normalized : normalized[0]) as SliderValue<TSliderMode>);
  },
);

const isValueControl = computed(() => props.control === "value");
/**
 * Icon control works only when there is a single thumb.
 */
const isIconControl = computed(() => props.control === "icon" && props.mode === "single");
</script>

<template>
  <div
    v-if="skeleton"
    :class="[
      'onyx-component',
      'onyx-slider-skeleton',
      densityClass,
      {
        'onyx-slider-skeleton--vertical': props.orientation === 'vertical',
      },
    ]"
  >
    <OnyxSkeleton v-if="!props.hideLabel" class="onyx-slider-skeleton__label" />
    <OnyxSkeleton class="onyx-slider-skeleton__block" />
  </div>

  <div
    v-else
    class="onyx-component onyx-slider"
    :class="[
      {
        'onyx-slider--vertical': props.orientation === 'vertical',
        'onyx-slider--disabled': disabled,
        'onyx-slider--is-active': activeThumbIndex !== -1,
      },
      densityClass,
      errorClass,
    ]"
  >
    <OnyxFormElement
      v-bind="props"
      class="onyx-slider__form-element"
      :message="messages"
      :error-messages="errorMessages"
    >
      <template #default="{ id: inputId }">
        <div class="onyx-slider__container">
          <div
            v-if="isValueControl"
            class="onyx-slider__value-control-container"
            role="img"
            tabindex="-1"
          >
            {{ min }}
          </div>

          <div v-if="isIconControl" class="onyx-slider__icon-control-container">
            <OnyxIconButton
              :disabled="disabled || Number(modelValue ?? props.min) <= props.min"
              :label="props.label || inputId"
              color="neutral"
              :icon="iconMinusSmall"
              tabindex="0"
              @click="handleDecreaseByIcon"
            />
          </div>

          <!-- Explicit passive touchstart: v-bind="root" doesn’t support { passive: true } -->
          <span class="onyx-slider__root" v-bind="root" @touchstart.passive="root.onTouchstart">
            <span class="onyx-slider__rail" v-bind="rail"></span>
            <span class="onyx-slider__track" v-bind="track"></span>

            <template v-for="markItem in marksList" :key="markItem.value">
              <span
                class="onyx-slider__mark"
                :class="{ 'onyx-slider__mark--active': isMarkActive(markItem.value) }"
                v-bind="mark({ value: markItem.value, label: markItem.label })"
                :style="{
                  [axis.position]: `${adjustMarkPosition(applyLimits(valueToPercent(markItem.value), 0, 100))}`,
                }"
              ></span>
              <span
                v-if="markItem.label"
                class="onyx-slider__mark-label"
                v-bind="markLabel({ value: markItem.value })"
              >
                {{ markItem.label }}
              </span>
            </template>

            <span
              v-for="(value, index) in thumbs"
              :key="index"
              v-bind="thumbContainer({ value, index })"
              class="onyx-slider__thumb"
              :class="{
                'is-focus': focusedThumbIndex === index,
                'is-active': activeThumbIndex === index,
              }"
            >
              <OnyxTooltip
                :open="!props.disableTooltip && activeThumbIndex === index"
                :text="String(value)"
                :position="props.orientation === 'vertical' ? 'right' : 'bottom'"
                alignment="auto"
                class="onyx-slider__thumb-tooltip"
              >
                <template #default="{ trigger }">
                  <span v-bind="trigger">
                    <OnyxVisuallyHidden>
                      <input
                        v-custom-validity
                        class="onyx-slider__native"
                        v-bind="thumbInput({ value, index })"
                        :disabled="disabled"
                        :aria-label="props.label || inputId"
                        :autofocus="props.autofocus && index === 0"
                      />
                    </OnyxVisuallyHidden>
                  </span>
                </template>
              </OnyxTooltip>
            </span>
          </span>

          <div
            v-if="isValueControl"
            class="onyx-slider__value-control-container"
            role="img"
            tabindex="-1"
          >
            {{ max }}
          </div>

          <div v-if="isIconControl" class="onyx-slider__icon-control-container">
            <OnyxIconButton
              :disabled="disabled || Number(modelValue ?? props.min) >= props.max"
              label="Increase"
              color="neutral"
              :icon="iconPlusSmall"
              tabindex="0"
              @click="handleIncreaseByIcon"
            />
          </div>
        </div>
      </template>
    </OnyxFormElement>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";
@use "../../styles/mixins/density.scss";
@use "../../styles/mixins/input.scss";

.onyx-slider,
.onyx-slider-skeleton {
  --onyx-slider-padding-vertical: var(--onyx-density-xs);

  // Colors
  --onyx-slider-rail-color: var(--onyx-color-base-neutral-200);
  --onyx-slider-track-color: var(--onyx-color-base-neutral-600);
  --onyx-slider-thumb-color: var(--onyx-color-base-neutral-600);
  --onyx-slider-thumb-border-color: var(--onyx-color-base-neutral-800);
  --onyx-slider-mark-color: var(--onyx-color-base-neutral-400);
  --onyx-slider-mark-active-color: var(--onyx-color-base-neutral-600);
  --onyx-slider-mark-label-color: var(--onyx-color-text-icons-neutral-medium);
  --onyx-slider-value-control-color: var(--onyx-color-text-icons-neutral-intense);

  // Density-based spacing
  --onyx-slider-root-padding: var(--onyx-density-sm);
  --onyx-slider-mark-label-offset: var(--onyx-density-xl);
  --onyx-slider-vertical-mark-label-offset: var(--onyx-density-xl);

  // Interactive state colors
  --onyx-slider-rail-color-interactive: var(--onyx-color-base-neutral-200);
  --onyx-slider-track-color-interactive: var(--onyx-color-base-primary-500);
  --onyx-slider-thumb-color-interactive: var(--onyx-color-base-primary-500);
  --onyx-slider-thumb-border-color-interactive: var(--onyx-color-base-primary-500);
  --onyx-slider-mark-active-color-interactive: var(--onyx-color-base-primary-500);

  // Disabled state colors
  --onyx-slider-track-color-disabled: var(--onyx-color-base-neutral-300);
  --onyx-slider-thumb-color-disabled: var(--onyx-color-base-neutral-300);
  --onyx-slider-thumb-border-color-disabled: var(--onyx-color-base-neutral-300);
  --onyx-slider-mark-color-disabled: var(--onyx-color-base-neutral-300);
  --onyx-slider-mark-active-color-disabled: var(--onyx-color-base-neutral-300);
  --onyx-slider-mark-label-color-disabled: var(--onyx-color-text-icons-neutral-soft);
}

.onyx-slider {
  @include layers.component() {
    @include input.define-shared-styles(
      $base-selector: ".onyx-slider",
      $vertical-padding: var(--onyx-slider-padding-vertical)
    );

    &__thumb-tooltip {
      pointer-events: none;
      left: -0.625rem;
      top: 0.625rem;
    }

    &__container {
      display: flex;
      align-items: center;
      gap: var(--onyx-density-sm);

      &:has(.onyx-slider__mark) {
        padding-bottom: var(--onyx-slider-mark-label-offset);
      }
    }

    &__root {
      position: relative;
      display: inline-block;
      width: 100%;
      height: 0.5rem;
      padding: var(--onyx-slider-root-padding) 0;
      user-select: none;
      cursor: pointer;
    }

    &__value-control-container {
      color: var(--onyx-slider-value-control-color);
      font-size: var(--onyx-font-size-md);
      font-family: var(--onyx-font-family-paragraph);
      line-height: var(--onyx-font-line-height-sm);
      user-select: none;
      width: 1.5rem;
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__icon-control-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.5rem;
      height: 1.5rem;
    }

    &--vertical {
      height: 100%;

      .onyx-slider__thumb-tooltip {
        pointer-events: none;
        left: 0.375rem;
      }

      .onyx-slider__form-element {
        height: 100%;
      }

      .onyx-slider__container {
        flex-direction: column-reverse;
        height: 100%;
      }

      .onyx-slider__root {
        width: 0.5rem;
        height: 100%;
        padding: 0 var(--onyx-slider-root-padding);
      }

      .onyx-slider__rail {
        left: 50%;
        right: auto;
        top: 0;
        bottom: 0;
        width: 0.5rem;
        height: auto;
        transform: translateX(-50%);
      }

      .onyx-slider__track {
        left: 50%;
        top: auto;
        width: 0.5rem;
        height: auto;
        transform: translateX(-50%);
      }

      .onyx-slider__thumb {
        left: 50%;
        top: unset;
        transform: translate(-50%, 50%);
      }

      .onyx-slider__mark {
        left: 50%;
        top: unset;
        transform: translateX(-50%) translateY(50%);
      }

      .onyx-slider__mark-label {
        left: var(--onyx-slider-vertical-mark-label-offset);
        top: auto;
        transform: translateY(50%);
      }
    }

    &__rail {
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      height: 0.5rem;
      transform: translateY(-50%);
      background-color: var(--onyx-slider-rail-color);
      border-radius: var(--onyx-radius-sm);
    }

    &__track {
      position: absolute;
      top: 50%;
      height: 0.5rem;
      transform: translateY(-50%);
      background-color: var(--onyx-slider-track-color);
      border-radius: var(--onyx-radius-sm);
    }

    &__thumb {
      position: absolute;
      top: 50%;
      width: 1.25rem;
      height: 1.25rem;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background-color: var(--onyx-slider-thumb-color);
      border: 0.25rem solid var(--onyx-slider-thumb-border-color);
      display: flex;
      align-items: center;
      justify-content: center;

      &::after {
        content: "";
        position: absolute;
        display: none;
        pointer-events: none;
        top: 50%;
        left: 50%;
        width: 1.75rem;
        height: 1.75rem;
        transform: translate(-50%, -50%);
        background-color: transparent;
        border-radius: 50%;
        border: 0.25rem solid var(--onyx-color-component-focus-primary);
      }

      &.is-focus,
      &.is-active {
        &::after {
          display: block;
        }
      }
    }

    &__mark {
      position: absolute;
      top: 50%;
      width: 0.375rem;
      height: 0.375rem;
      transform: translateX(-50%) translateY(-50%);
      border-radius: 50%;
      background-color: var(--onyx-slider-mark-color);

      &--active {
        background-color: var(--onyx-slider-mark-active-color);
      }
    }

    &__mark-label {
      color: var(--onyx-slider-mark-label-color);
      font-size: var(--onyx-font-size-sm);
      font-family: var(--onyx-font-family-paragraph);
      line-height: var(--onyx-font-line-height-sm);
      position: absolute;
      white-space: nowrap;
      top: var(--onyx-slider-mark-label-offset);
      transform: translateX(-50%);
    }

    &__root:hover:not(&--disabled),
    &:focus-within,
    &--is-active {
      .onyx-slider {
        &__rail {
          background-color: var(--onyx-slider-rail-color-interactive);
        }

        &__track {
          background-color: var(--onyx-slider-track-color-interactive);
        }

        &__thumb {
          background-color: var(--onyx-slider-thumb-color-interactive);
          border-color: var(--onyx-slider-thumb-border-color-interactive);
        }

        &__mark {
          &--active {
            background-color: var(--onyx-slider-mark-active-color-interactive);
          }
        }
      }
    }

    &--disabled {
      .onyx-slider {
        &__root {
          cursor: default;
          pointer-events: none;
        }

        &__track {
          background-color: var(--onyx-slider-track-color-disabled);
        }

        &__thumb {
          background-color: var(--onyx-slider-thumb-color-disabled);
          border-color: var(--onyx-slider-thumb-border-color-disabled);
        }

        &__mark {
          background-color: var(--onyx-slider-mark-color-disabled);
          &--active {
            background-color: var(--onyx-slider-mark-active-color-disabled);
          }
        }

        &__mark-label {
          color: var(--onyx-slider-mark-label-color-disabled);
        }
      }
    }
  }
}

.onyx-slider-skeleton {
  $height: calc(1lh + 2 * var(--onyx-slider-padding-vertical));
  $adjustment: var(--skeleton-label-density-adjustment, 0rem);
  display: flex;
  flex-direction: column;
  gap: calc(var(--onyx-density-3xs) + $adjustment);
  line-height: var(--onyx-font-line-height-md);

  &__label {
    width: var(--onyx-density-3xl);
    height: calc(1.25rem - $adjustment);
  }

  &__block {
    width: 17rem;
    max-width: 100%;
    height: $height;
  }

  &--vertical {
    height: 12rem;

    .onyx-slider-skeleton__block {
      width: $height;
      height: 17rem;
      max-height: 100%;
    }
  }

  @include density.compact {
    // the skeleton gap would be 0 in compact density so we shrink the label size a bit and increase the gap so it does not look off
    --skeleton-label-density-adjustment: var(--onyx-spacing-5xs);
  }
}
</style>
