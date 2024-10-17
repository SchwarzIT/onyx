<script lang="ts" setup>
import minus from "@sit-onyx/icons/minus.svg?raw";
import plus from "@sit-onyx/icons/plus.svg?raw";
import { computed, ref } from "vue";
import { useDensity } from "../../composables/density";
import { useCustomValidity } from "../../composables/useCustomValidity";
import { injectI18n } from "../../i18n";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core";
import OnyxFormElement from "../OnyxFormElement/OnyxFormElement.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxStepperProps } from "./types";
const props = withDefaults(defineProps<OnyxStepperProps>(), {
  step: 1,
  stripStep: false,
  disabled: FORM_INJECTED_SYMBOL,
  readonly: false,
  loading: false,
  skeleton: false,
});
const { t } = injectI18n();
const inputRef = ref<HTMLInputElement>();
const emit = defineEmits<{
  /** Emitted when the input value changes. */
  "update:modelValue": [value?: number];
  /**
   * Emitted when the validity state of the input changes.
   */
  validityChange: [validity: ValidityState];
}>();
const { disabled } = useFormContext(props);
const { densityClass } = useDensity(props);
const { vCustomValidity, errorMessages } = useCustomValidity({ props, emit });
/**
 * Used to detect user interaction to simulate the behavior of :user-invalid for the native input
 * because the native browser :user-invalid does not trigger when the value is changed via Arrow up/down or increase/decrease buttons
 */
const wasTouched = ref(false);
/**
 * Current value (with getter and setter) that can be used as "v-model" for the native input.
 */
const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
const displayValue = ref<number | string | undefined>();

const updateValue = (newValue: number) => {
  if (props.precision !== undefined) {
    const formattedValue = newValue.toFixed(props.precision);
    displayValue.value = formattedValue;
    value.value = parseFloat(formattedValue);
  } else {
    displayValue.value = newValue;
    value.value = newValue;
  }
};

const handleClick = (direction: "stepUp" | "stepDown") => {
  if (!inputRef.value) return;
  if (props.stripStep) {
    inputRef.value[direction]();
    const newValue = inputRef.value.valueAsNumber;
    updateValue(newValue);
  } else {
    const currentValue = inputRef.value.valueAsNumber || 0;
    const stepValue = direction === "stepUp" ? props.step : -props.step;
    const newValue = currentValue + stepValue;
    updateValue(newValue);
  }
};
const handleChange = () => {
  if (inputRef.value) {
    const numberValue = parseFloat(inputRef.value.value);
    if (!isNaN(numberValue)) {
      updateValue(numberValue);
    } else {
      value.value = undefined;
      displayValue.value = undefined;
    }
    wasTouched.value = true;
  }
};

const incrementLabel = computed(() => t.value("stepper.increment", { stepSize: props.step }));
const decrementLabel = computed(() => t.value("stepper.decrement", { stepSize: props.step }));
</script>
<template>
  <div v-if="props.skeleton" :class="['onyx-stepper-skeleton', densityClass]">
    <OnyxSkeleton v-if="!props.hideLabel" class="onyx-stepper-skeleton__label" />
    <OnyxSkeleton class="onyx-stepper-skeleton__input" />
  </div>
  <div v-else :class="['onyx-stepper', densityClass]">
    <OnyxFormElement v-bind="props" :error-messages="errorMessages">
      <div class="onyx-stepper__wrapper">
        <button
          type="button"
          class="onyx-stepper__counter"
          :disabled="(props.min && props.min === value) || disabled || readonly || props.loading"
          :aria-label="decrementLabel"
          @click="handleClick('stepDown')"
        >
          <OnyxIcon :icon="minus" />
        </button>
        <OnyxLoadingIndicator v-if="props.loading" class="onyx-stepper__loading" type="circle" />
        <input
          v-else
          ref="inputRef"
          v-model.number="displayValue"
          v-custom-validity
          class="onyx-stepper__native"
          :class="{ 'onyx-stepper__native--force-invalid': errorMessages && wasTouched }"
          type="number"
          :aria-label="props.label"
          :autofocus="props.autofocus"
          :disabled="disabled || props.loading"
          :min="props.min"
          :max="props.max"
          :name="props.name"
          :placeholder="props.placeholder"
          :readonly="props.readonly"
          :required="props.required"
          :step="props.stripStep ? props.step : 'any'"
          :title="props.hideLabel ? props.label : undefined"
          @change="handleChange"
        />
        <button
          type="button"
          class="onyx-stepper__counter"
          :disabled="(props.max && props.max === value) || disabled || readonly || props.loading"
          :aria-label="incrementLabel"
          @click="handleClick('stepUp')"
        >
          <OnyxIcon :icon="plus" />
        </button>
      </div>
    </OnyxFormElement>
  </div>
</template>
<style lang="scss">
@use "../../styles/mixins/layers";
@use "../../styles/mixins/input.scss";
.onyx-stepper,
.onyx-stepper-skeleton {
  --onyx-stepper-padding-vertical: var(--onyx-density-xs);
}
.onyx-stepper-skeleton {
  @include input.define-skeleton-styles(
    $height: calc(1lh + 2 * var(--onyx-stepper-padding-vertical))
  );
}
.onyx-stepper {
  @include layers.component() {
    @include input.define-shared-styles(
      $base-selector: ".onyx-stepper",
      $vertical-padding: var(--onyx-stepper-padding-vertical)
    );
    &__wrapper {
      gap: 0;
      padding: 0;
      justify-content: space-between;
    }
    &__counter {
      border: none;
      height: 100%;
      background-color: transparent;
      color: inherit;
      display: inline-flex;
      align-items: center;
      padding: var(--onyx-stepper-padding-vertical);
      border-radius: 0 var(--onyx-radius-sm) var(--onyx-radius-sm) 0;
      outline: none;
      &:enabled {
        cursor: pointer;
        &:hover,
        &:focus-visible {
          color: var(--onyx-color-text-icons-primary-intense);
        }
        &:focus-visible {
          outline: none;
          background-color: var(--onyx-color-base-primary-100);
        }
        &:active {
          background-color: var(--onyx-color-base-primary-100);
        }
        &:first-child {
          border-radius: var(--onyx-radius-sm) 0 0 var(--onyx-radius-sm);
        }
      }
      &:disabled {
        color: var(--onyx-color-text-icons-neutral-soft);
      }
    }
    &__native {
      -moz-appearance: textfield;
      text-align: center;
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
}
</style>
