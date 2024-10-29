<script lang="ts" setup>
import minus from "@sit-onyx/icons/minus.svg?raw";
import plus from "@sit-onyx/icons/plus.svg?raw";
import { computed, ref, watch } from "vue";
import { useDensity } from "../../composables/density";
import { useCustomValidity } from "../../composables/useCustomValidity";
import { useErrorClass } from "../../composables/useErrorClass";
import { SKELETON_INJECTED_SYMBOL, useSkeletonContext } from "../../composables/useSkeletonState";
import { injectI18n } from "../../i18n";
import { applyLimits, isDivisible, roundToPrecision } from "../../utils/numbers";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core";
import OnyxFormElement from "../OnyxFormElement/OnyxFormElement.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxStepperProps } from "./types";
const props = withDefaults(defineProps<OnyxStepperProps>(), {
  precision: 1,
  stripStep: false,
  readonly: false,
  loading: false,
  skeleton: SKELETON_INJECTED_SYMBOL,
  disabled: FORM_INJECTED_SYMBOL,
  showError: FORM_INJECTED_SYMBOL,
});
const { t } = injectI18n();
const inputRef = ref<HTMLInputElement>();
const emit = defineEmits<{
  /**
   * Emitted when the validity state of the input changes.
   */
  validityChange: [validity: ValidityState];
}>();
const { disabled, showError } = useFormContext(props);
const skeleton = useSkeletonContext(props);
const errorClass = useErrorClass(showError);
const { densityClass } = useDensity(props);
const { vCustomValidity, errorMessages } = useCustomValidity({ props, emit });
/**
 * Used to detect user interaction to simulate the behavior of :user-invalid for the native input
 * because the native browser :user-invalid does not trigger when the value is changed via Arrow up/down or increase/decrease buttons
 */
const wasTouched = ref(false);
const modelValue = defineModel<number>();
/**
 * Used for syncing the actual input value.
 * We use string to be able to control the number of decimal places.
 */
const inputValue = ref<string>();

const decimalPlaces = computed(() => {
  const precision = props.precision;
  const precisionStr = precision.toString();
  if (precisionStr.includes(".")) {
    return precisionStr.split(".")[1].length;
  }
  return -Math.floor(Math.log10(precision));
});

watch(
  modelValue,
  () => (inputValue.value = roundToPrecision(modelValue.value, decimalPlaces.value)),
  {
    immediate: true,
  },
);

// * stepSize must be precision or bigger
// * use precision as fallback
const determinedStepSize = computed(() =>
  Math.max(props.stepSize ?? props.precision, props.precision),
);

const handleClick = (direction: "stepUp" | "stepDown") => {
  if (!inputRef.value) return;
  wasTouched.value = true;
  const currentValue = modelValue.value || 0;
  const stepValue = (direction === "stepUp" ? 1 : -1) * determinedStepSize.value;
  const newValue = currentValue + stepValue;
  const roundedValue = Math.round(newValue / props.precision) * props.precision;

  modelValue.value = applyLimits(roundedValue, props.min, props.max);
};

const handleChange = () => {
  if (!inputRef.value) return;
  wasTouched.value = true;
  const newValue = parseFloat(inputValue.value ?? "");
  const rounded = parseFloat(roundToPrecision(newValue, decimalPlaces.value));
  // reset input
  inputValue.value = roundToPrecision(newValue, decimalPlaces.value);

  if (!newValue || isNaN(newValue)) {
    modelValue.value = undefined;
    return;
  }
  if (props.stripStep && !isDivisible(newValue, props.precision)) {
    inputValue.value = roundToPrecision(modelValue.value, decimalPlaces.value);
    return;
  }
  modelValue.value = rounded;
};

const incrementLabel = computed(() =>
  t.value("stepper.increment", { stepSize: determinedStepSize.value }),
);
const decrementLabel = computed(() =>
  t.value("stepper.decrement", { stepSize: determinedStepSize.value }),
);
</script>
<template>
  <div v-if="skeleton" :class="['onyx-stepper-skeleton', densityClass]">
    <OnyxSkeleton v-if="!props.hideLabel" class="onyx-stepper-skeleton__label" />
    <OnyxSkeleton class="onyx-stepper-skeleton__input" />
  </div>
  <div v-else :class="['onyx-stepper', densityClass, errorClass]">
    <OnyxFormElement v-bind="props" :error-messages="errorMessages">
      <div class="onyx-stepper__wrapper">
        <button
          type="button"
          class="onyx-stepper__counter"
          :disabled="
            disabled ||
            readonly ||
            props.loading ||
            (props.min !== undefined && modelValue !== undefined && modelValue <= props.min)
          "
          :aria-label="decrementLabel"
          tabindex="-1"
          @click="handleClick('stepDown')"
        >
          <OnyxIcon :icon="minus" />
        </button>
        <OnyxLoadingIndicator v-if="props.loading" class="onyx-stepper__loading" type="circle" />
        <input
          v-else
          ref="inputRef"
          v-model="inputValue"
          v-custom-validity
          class="onyx-stepper__native"
          :class="{ 'onyx-stepper__native--touched': wasTouched }"
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
          :step="props.precision"
          :title="props.hideLabel ? props.label : undefined"
          @change="handleChange"
          @keydown.up.prevent="handleClick('stepUp')"
          @keydown.down.prevent="handleClick('stepDown')"
        />
        <button
          type="button"
          class="onyx-stepper__counter"
          :disabled="
            disabled ||
            readonly ||
            props.loading ||
            (props.max !== undefined && modelValue !== undefined && modelValue >= props.max)
          "
          :aria-label="incrementLabel"
          tabindex="-1"
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
