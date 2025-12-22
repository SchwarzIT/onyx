<script setup lang="ts" generic="TSliderMode extends SliderMode">
import { createSlider } from "@sit-onyx/headless";
import { computed, toRef, toRefs } from "vue";
import { useDensity } from "../../composables/density.js";
import { useErrorClass } from "../../composables/useErrorClass.js";
import { getFormMessages, useFormElementError } from "../../composables/useFormElementError.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
import { useForwardProps } from "../../utils/props.js";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxFormElement from "../OnyxFormElement/OnyxFormElement.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import OnyxSliderControl from "../OnyxSliderControl/OnyxSliderControl.vue";
import OnyxTooltip from "../OnyxTooltip/OnyxTooltip.vue";
import OnyxVisuallyHidden from "../OnyxVisuallyHidden/OnyxVisuallyHidden.vue";
import type { OnyxSliderProps, SliderMode, SliderValue } from "./types.js";

type Props = OnyxSliderProps<TSliderMode>;

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  step: 1,
  disabled: FORM_INJECTED_SYMBOL,
  showError: FORM_INJECTED_SYMBOL,
  skeleton: SKELETON_INJECTED_SYMBOL,
  mode: () => "single" as TSliderMode,
});

const emit = defineEmits<{
  /**
   * Emitted when the current value changes.
   */
  "update:modelValue": [value: SliderValue<TSliderMode>];
  /**
   * Emitted when the validity state of the slider changes.
   */
  validityChange: [validity: ValidityState];
}>();

const modelValue = useVModel<Props, "modelValue", SliderValue<TSliderMode>>({
  props,
  emit,
  key: "modelValue",
});

const { vCustomValidity, errorMessages } = useFormElementError({ props, emit });
const formElementProps = useForwardProps(props, OnyxFormElement);
const messages = computed(() => getFormMessages(props.message));

const { densityClass } = useDensity(props);

const { disabled, showError } = useFormContext(props);
const errorClass = useErrorClass(showError);
const skeleton = useSkeletonContext(props);

const { min, max, step, label } = toRefs(props);

const {
  elements: { root, track, thumbContainer, thumbInput, mark, markLabel },
  state: { normalizedValue, marks },
  internals: { updateValue, focusThumb },
} = createSlider({
  value: modelValue,
  min,
  max,
  step,
  label,
  marks: toRef(props, "marks"),
  disabled,
  shiftStep: toRef(props, "shiftStep"),
  onChange: (newValue) => (modelValue.value = newValue),
});

const hasMarkLabels = computed(() => marks.value.some((mark) => !!mark.label));

const handleControlUpdate = (value: number, index: number, focus?: boolean) => {
  updateValue(value, index);
  if (focus) focusThumb(index);
};
</script>

<template>
  <div v-if="skeleton" :class="['onyx-component', 'onyx-slider-skeleton', densityClass]">
    <OnyxSkeleton v-if="!props.hideLabel" class="onyx-slider-skeleton__label" />
    <OnyxSkeleton class="onyx-slider-skeleton__block" />
  </div>

  <div v-else :class="['onyx-component', 'onyx-slider', densityClass, errorClass]">
    <OnyxFormElement
      :label="props.label"
      v-bind="formElementProps"
      class="onyx-slider__form-element"
      :message="messages"
      :error-messages="errorMessages"
    >
      <template #default="{ id: inputId }">
        <div class="onyx-slider__container">
          <OnyxSliderControl
            v-if="props.control === 'value'"
            control="value"
            :model-value="props.min"
          />
          <!-- @mousedown.prevent is needed to not loose the tooltip focus when holding down the mouse during a click -->
          <OnyxSliderControl
            v-else-if="props.control === 'icon' && props.mode === 'single'"
            control="icon"
            direction="decrease"
            :step="props.step"
            :model-value="normalizedValue[0]"
            :disabled="disabled || normalizedValue[0] <= props.min"
            @update:model-value="handleControlUpdate($event, 0, true)"
            @mousedown.prevent
          />
          <OnyxSliderControl
            v-else-if="props.control === 'input' && props.mode === 'range'"
            control="input"
            direction="increase"
            :model-value="normalizedValue[0]"
            :disabled
            :step="props.step"
            :min="props.min"
            :max="props.max"
            @update:model-value="handleControlUpdate($event, 0)"
          />

          <span class="onyx-slider__root" v-bind="root">
            <span class="onyx-slider__rail"></span>
            <span class="onyx-slider__track" v-bind="track"></span>

            <template v-for="markItem in marks" :key="markItem.value">
              <span
                class="onyx-slider__mark"
                v-bind="
                  mark({ value: markItem.value, label: markItem.label, positionOffset: '0.25rem' })
                "
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
              v-for="(value, index) in normalizedValue"
              :key="index"
              v-bind="thumbContainer({ value, index })"
              class="onyx-slider__thumb"
            >
              <OnyxTooltip
                :open="props.tooltip?.hidden ? false : undefined"
                :text="$props.tooltip?.formatter?.(value, index) ?? String(value)"
                :position="hasMarkLabels ? 'top' : 'bottom'"
                class="onyx-slider__thumb-tooltip"
              >
                <template #default="{ trigger }">
                  <span v-bind="trigger">
                    <OnyxVisuallyHidden>
                      <input
                        :id="index === 0 ? inputId : undefined"
                        v-custom-validity
                        class="onyx-slider__native"
                        :tabindex="props.control === 'input' ? -1 : undefined"
                        v-bind="thumbInput({ value, index })"
                        :disabled="disabled"
                        :aria-label="props.label"
                        :autofocus="props.autofocus && index === 0"
                      />
                    </OnyxVisuallyHidden>
                  </span>
                </template>
              </OnyxTooltip>
            </span>
          </span>

          <OnyxSliderControl
            v-if="props.control === 'value'"
            control="value"
            :model-value="props.max"
          />
          <OnyxSliderControl
            v-else-if="props.control === 'icon' && props.mode === 'single'"
            control="icon"
            direction="increase"
            :step="props.step"
            :model-value="normalizedValue[0]"
            :disabled="disabled || normalizedValue[0] >= props.max"
            @mousedown.prevent
            @update:model-value="handleControlUpdate($event, 0, true)"
          />
          <OnyxSliderControl
            v-else-if="props.control === 'input'"
            control="input"
            :direction="props.mode === 'range' ? 'decrease' : undefined"
            :model-value="normalizedValue[1] ?? normalizedValue[0]"
            :disabled
            :step="props.step"
            :min="props.min"
            :max="props.max"
            @update:model-value="handleControlUpdate($event, props.mode === 'range' ? 1 : 0)"
          />
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
  @include layers.component() {
    // Colors
    --onyx-slider-rail-background: var(--onyx-color-base-neutral-200);
    --onyx-slider-track-background: var(--onyx-color-base-neutral-600);
    --onyx-slider-thumb-background: var(--onyx-color-base-neutral-600);
    --onyx-slider-thumb-border-color: var(--onyx-color-base-neutral-800);
    --onyx-slider-mark-background: var(--onyx-color-base-neutral-400);
    --onyx-slider-mark-color: var(--onyx-color-text-icons-neutral-medium);

    // Spacings
    --onyx-slider-padding-vertical: var(--onyx-density-xs);
    --onyx-slider-root-padding: var(--onyx-density-sm);
    --onyx-slider-mark-label-offset: var(--onyx-density-xl);
    --onyx-slider-thumb-size: 1.25rem;

    // Interactive state colors
    --onyx-slider-rail-background-interactive: var(--onyx-color-base-neutral-200);
    --onyx-slider-track-background-interactive: var(--onyx-color-base-primary-500);
    --onyx-slider-thumb-background-interactive: var(--onyx-color-base-primary-500);
    --onyx-slider-thumb-border-color-interactive: var(--onyx-color-base-primary-500);

    // Disabled state colors
    --onyx-slider-background-disabled: var(--onyx-color-base-neutral-300);
    --onyx-slider-mark-color-disabled: var(--onyx-color-text-icons-neutral-soft);
  }
}

.onyx-slider {
  @include layers.component() {
    @include input.define-shared-styles(
      $base-selector: ".onyx-slider",
      $vertical-padding: var(--onyx-slider-padding-vertical)
    );

    $track-z-index: 1;

    &__thumb-tooltip {
      pointer-events: none;
      left: calc(-0.5 * var(--onyx-slider-thumb-size));

      &:has(.onyx-tooltip--position-bottom) {
        top: calc(0.5 * var(--onyx-slider-thumb-size));
      }

      &:has(.onyx-tooltip--position-top) {
        top: calc(-1.5 * var(--onyx-slider-thumb-size));
      }
    }

    &__container {
      display: flex;
      align-items: center;
      gap: var(--onyx-density-sm);
      color: var(--onyx-color-text-icons-neutral-intense);

      &:has(.onyx-slider__mark-label) {
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
      border-radius: var(--onyx-radius-sm);
    }

    &__control {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.5rem;
      height: 1.5rem;

      font-size: var(--onyx-font-size-md);
      font-family: var(--onyx-font-family-paragraph);
      line-height: var(--onyx-font-line-height-sm);
      user-select: none;
    }

    &__rail {
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      height: inherit;
      background-color: var(--onyx-slider-rail-background);
      border-radius: inherit;
    }

    &__track {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      height: inherit;
      background-color: var(--onyx-slider-track-background);
      border-radius: inherit;
      z-index: $track-z-index;
    }

    &__thumb {
      position: absolute;
      top: 50%;
      width: var(--onyx-slider-thumb-size);
      height: var(--onyx-slider-thumb-size);
      transform: translate(-50%, -50%);
      border-radius: var(--onyx-radius-full);
      background-color: var(--onyx-slider-thumb-background);
      border: 0.25rem solid var(--onyx-slider-thumb-border-color);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: $track-z-index + 1;

      &:has(.onyx-slider__native:enabled) {
        &:focus-within {
          outline: var(--onyx-outline-width) solid var(--onyx-color-component-focus-primary);
        }
      }
    }

    &__mark {
      position: absolute;
      top: 50%;
      width: 0.375rem;
      height: 0.375rem;
      transform: translate(-50%, -50%);
      border-radius: var(--onyx-radius-full);
      background-color: var(--onyx-slider-mark-background);
    }

    &__mark-label {
      color: var(--onyx-slider-mark-color);
      font-size: var(--onyx-font-size-sm);
      font-family: var(--onyx-font-family-paragraph);
      line-height: var(--onyx-font-line-height-sm);
      position: absolute;
      white-space: nowrap;
      top: var(--onyx-slider-mark-label-offset);
    }

    &:has(&__native:enabled) {
      .onyx-slider__root {
        cursor: pointer;
      }

      &:has(.onyx-slider__root:hover),
      &:has(.onyx-slider__root:focus-within) {
        .onyx-slider {
          &__rail {
            background-color: var(--onyx-slider-rail-background-interactive);
          }

          &__track {
            background-color: var(--onyx-slider-track-background-interactive);
          }

          &__thumb {
            background-color: var(--onyx-slider-thumb-background-interactive);
            border-color: var(--onyx-slider-thumb-border-color-interactive);
          }
        }
      }
    }

    &:has(&__native:disabled) {
      .onyx-slider {
        &__track {
          background-color: var(--onyx-slider-background-disabled);
        }

        &__thumb {
          background-color: var(--onyx-slider-background-disabled);
          border-color: var(--onyx-slider-background-disabled);
        }

        &__mark-label {
          color: var(--onyx-slider-mark-color-disabled);
        }
      }
    }
  }
}

.onyx-slider-skeleton {
  @include layers.component() {
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

    @include density.compact {
      // the skeleton gap would be 0 in compact density so we shrink the label size a bit and increase the gap so it does not look off
      --skeleton-label-density-adjustment: var(--onyx-spacing-5xs);
    }
  }
}
</style>
