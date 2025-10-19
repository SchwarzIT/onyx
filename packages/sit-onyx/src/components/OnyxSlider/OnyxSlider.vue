<script setup lang="ts">
import { createSlider } from "@sit-onyx/headless";
import { iconMinusSmall, iconPlusSmall } from "@sit-onyx/icons";
import { computed, toRefs } from "vue";
import { useDensity } from "../../composables/density.js";
import { getFormMessages, useCustomValidity } from "../../composables/useCustomValidity.js";
import { useErrorClass } from "../../composables/useErrorClass.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
import { useRootAttrs } from "../../utils/attrs.js";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxFormElement from "../OnyxFormElement/OnyxFormElement.vue";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import OnyxTooltip from "../OnyxTooltip/OnyxTooltip.vue";
import type { OnyxSliderProps } from "./types.js";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

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

const props = withDefaults(defineProps<OnyxSliderProps>(), {
  min: 0,
  max: 100,
  step: 1,
  shiftStep: 10,
  marks: false,
  modelValue: (props) => [props.min ?? 0] as number[],
  orientation: "horizontal",
  trackMode: "default",
  tooltipDisplay: "auto",
  disabled: FORM_INJECTED_SYMBOL,
  showError: FORM_INJECTED_SYMBOL,
  skeleton: SKELETON_INJECTED_SYMBOL,
});

const emit = defineEmits<{
  /**
   * Emitted when the validity state of the slider changes.
   */
  validityChange: [validity: ValidityState];
  /**
   * Emitted when the slider changes
   */
  "update:modelValue": [value: number[]];
  /**
   * Emitted when the slider is committed (e.g. on blur, or on pressing enter)
   */
  "update:committed": [value: number[]];
}>();

const modelValue = useVModel({
  props,
  emit,
  key: "modelValue",
  default: () => [props.min ?? 0] as number[],
});

const customError = computed(() => props.customError);
const { vCustomValidity, errorMessages } = useCustomValidity({ props, emit, customError });
const messages = computed(() => getFormMessages(props.message));

defineOptions({ inheritAttrs: false });

const { rootAttrs, restAttrs } = useRootAttrs();
const { densityClass } = useDensity(props);

const { disabled, showError } = useFormContext(props);
const errorClass = useErrorClass(showError);
const skeleton = useSkeletonContext(props);

const handleChange = (values: number[]) => {
  emit("update:modelValue", values);
};

const handleCommit = (values: number[]) => {
  emit("update:committed", values);
};

const handleDecreaseByIcon = () => {
  if (disabled.value) return;

  if (modelValue.value.length === 1) {
    const currentValue = modelValue.value[0] ?? props.min;
    const stepValue = props.shiftStep ?? props.step ?? 1;
    const newValue = Math.max(currentValue - stepValue, props.min);
    const newValues = [newValue];
    handleChange(newValues);
    handleCommit(newValues);
  }
};

const handleIncreaseByIcon = () => {
  if (disabled.value) return;

  if (modelValue.value.length === 1) {
    const currentValue = modelValue.value[0] ?? props.min;
    const stepValue = props.shiftStep ?? props.step ?? 1;
    const newValue = Math.min(currentValue + stepValue, props.max);
    const newValues = [newValue];
    handleChange(newValues);
    handleCommit(newValues);
  }
};

const { min, max, step, marks, orientation } = toRefs(props);

const {
  elements: { root, rail, track, thumbContainer, thumbInput, mark, markLabel },
  state: { focusedThumbIndex, activeThumbIndex, isDragging, marksList },
  internals: { isMarkActive, valueToPercent, axis },
} = createSlider({
  values: modelValue,
  min,
  max,
  step,
  marks,
  orientation,
  onChange: handleChange,
  onCommit: handleCommit,
});

const isValueControl = computed(() => props.control === "value");
/**
 * Icon control works only when there is a single thumb.
 */
const isIconControl = computed(() => props.control === "icon" && modelValue.value.length === 1);
</script>

<template>
  <div
    v-if="skeleton"
    v-bind="rootAttrs"
    :class="['onyx-component', 'onyx-slider-skeleton', densityClass]"
  >
    <div
      class="onyx-slider-skeleton__container"
      :class="{
        'onyx-slider-skeleton__container--vertical': props.orientation === 'vertical',
      }"
    >
      <OnyxSkeleton v-if="isValueControl" class="onyx-slider-skeleton__value-control" />
      <OnyxSkeleton v-if="isIconControl" class="onyx-slider-skeleton__icon-control" />
      <div class="onyx-slider-skeleton__root">
        <OnyxSkeleton class="onyx-slider-skeleton__track" />
      </div>
      <OnyxSkeleton v-if="isValueControl" class="onyx-slider-skeleton__value-control" />
      <OnyxSkeleton v-if="isIconControl" class="onyx-slider-skeleton__icon-control" />
    </div>
  </div>

  <div
    v-else
    v-bind="rootAttrs"
    class="onyx-component onyx-slider"
    :class="[
      {
        'onyx-slider--vertical': props.orientation === 'vertical',
        'onyx-slider--inverted': props.trackMode === 'inverted',
        'onyx-slider--disabled': disabled,
        'onyx-slider--is-dragging': isDragging,
        'onyx-slider--is-focused': focusedThumbIndex !== -1,
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
        <div
          class="onyx-slider__container"
          :class="{
            'onyx-slider__container--with-marks': marksList.length > 0,
          }"
        >
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
              :disabled="disabled || (modelValue[0] ?? props.min) <= props.min"
              :label="props.label || inputId"
              color="neutral"
              :icon="iconMinusSmall"
              tabindex="0"
              @click="handleDecreaseByIcon"
            />
          </div>

          <span class="onyx-slider__root" v-bind="root" @touchstart.passive="root.onTouchstart">
            <span class="onyx-slider__rail" v-bind="rail"></span>
            <span v-if="props.trackMode !== false" class="onyx-slider__track" v-bind="track"></span>

            <template v-for="markItem in marksList" :key="markItem.value">
              <span
                class="onyx-slider__mark"
                :class="{ 'onyx-slider__mark--active': isMarkActive(markItem.value) }"
                v-bind="mark({ value: markItem.value, label: markItem.label })"
                :style="{
                  [axis.position]: `${adjustMarkPosition(clamp(valueToPercent(markItem.value), 0, 100))}`,
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
              v-for="(value, index) in modelValue"
              :key="index"
              v-bind="thumbContainer({ value, index })"
              class="onyx-slider__thumb"
              :class="{
                'is-focus': focusedThumbIndex === index,
                'is-active': activeThumbIndex === index,
              }"
            >
              <OnyxTooltip
                :open="
                  props.tooltipDisplay === 'always' ||
                  (props.tooltipDisplay === 'auto' && activeThumbIndex === index)
                "
                :text="String(value)"
                :position="props.orientation === 'vertical' ? 'right' : 'bottom'"
                alignment="auto"
                class="onyx-slider__thumb-tooltip"
              >
                <template #default="{ trigger }">
                  <span v-bind="trigger">
                    <input
                      v-custom-validity
                      class="onyx-slider__native"
                      v-bind="{ ...thumbInput({ value, index }), ...restAttrs }"
                      :disabled="disabled"
                      :aria-label="props.label || inputId"
                      :autofocus="props.autofocus && index === 0"
                    />
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
              :disabled="disabled || (modelValue[0] ?? props.min) >= props.max"
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

  // Inverted mode colors
  --onyx-slider-rail-color-inverted: var(--onyx-color-base-neutral-600);
  --onyx-slider-track-color-inverted: var(--onyx-color-base-neutral-200);
  --onyx-slider-mark-color-inverted: var(--onyx-color-base-neutral-600);
  --onyx-slider-mark-active-color-inverted: var(--onyx-color-base-neutral-400);

  // Inverted interactive state colors
  --onyx-slider-rail-color-inverted-interactive: var(--onyx-color-base-primary-500);
  --onyx-slider-track-color-inverted-interactive: var(--onyx-color-base-neutral-200);
  --onyx-slider-mark-color-inverted-interactive: var(--onyx-color-base-primary-500);
  --onyx-slider-mark-active-color-inverted-interactive: var(--onyx-color-base-neutral-400);

  // Inverted disabled state colors
  --onyx-slider-rail-color-inverted-disabled: var(--onyx-color-base-neutral-300);
  --onyx-slider-track-color-inverted-disabled: var(--onyx-color-base-neutral-200);
  --onyx-slider-mark-color-inverted-disabled: var(--onyx-color-base-neutral-300);
  --onyx-slider-mark-active-color-inverted-disabled: var(--onyx-color-base-neutral-300);
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

      &--with-marks {
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
    &--is-dragging,
    &--is-focused,
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

    &--inverted {
      .onyx-slider__rail {
        background-color: var(--onyx-slider-rail-color-inverted);
      }
      .onyx-slider__track {
        background-color: var(--onyx-slider-track-color-inverted);
      }
      .onyx-slider__mark {
        background-color: var(--onyx-slider-mark-color-inverted);

        .onyx-slider__mark--active {
          background-color: var(--onyx-slider-mark-active-color-inverted);
        }
      }

      &.onyx-slider--is-active,
      &.onyx-slider--is-focused,
      &.onyx-slider--is-dragging,
      &:focus-within,
      .onyx-slider__root:hover:not(.onyx-slider--disabled) {
        .onyx-slider__rail {
          background-color: var(--onyx-slider-rail-color-inverted-interactive);
        }
        .onyx-slider__track {
          background-color: var(--onyx-slider-track-color-inverted-interactive);
        }
        .onyx-slider__mark {
          background-color: var(--onyx-slider-mark-color-inverted-interactive);
        }
        .onyx-slider__mark--active {
          background-color: var(--onyx-slider-mark-active-color-inverted-interactive);
        }
      }

      &.onyx-slider--disabled {
        .onyx-slider {
          &__rail {
            background-color: var(--onyx-slider-rail-color-inverted-disabled);
          }

          &__track {
            background-color: var(--onyx-slider-track-color-inverted-disabled);
          }

          &__mark {
            background-color: var(--onyx-slider-mark-color-inverted-disabled);
            &--active {
              background-color: var(--onyx-slider-mark-active-color-inverted-disabled);
            }
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
  @include layers.component() {
    display: flex;
    flex-direction: column;

    &__container {
      display: flex;
      align-items: center;
      gap: var(--onyx-density-sm);

      &--vertical {
        flex-direction: column-reverse;
        height: 12rem;
      }
    }

    &__value-control {
      width: 1.5rem;
      height: 1.5rem;
    }

    &__icon-control {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: var(--onyx-radius-sm);
    }

    &__root {
      position: relative;
      flex-grow: 1;
      height: 0.5rem;
      padding: var(--onyx-slider-root-padding) 0;

      .onyx-slider-skeleton__container--vertical & {
        width: 0.5rem;
        height: 100%;
        padding: 0 var(--onyx-slider-root-padding);
      }
    }

    &__track {
      position: absolute;
      top: 50%;
      left: 0;
      height: 0.5rem;
      transform: translateY(-50%);
      border-radius: var(--onyx-radius-sm);

      .onyx-slider-skeleton__container--vertical & {
        position: absolute;
        top: auto;
        bottom: 0;
        left: 50%;
        width: 0.5rem;
        height: 100%;
        transform: translateX(-50%);
      }
    }
  }
}
</style>
