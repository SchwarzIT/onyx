<script lang="ts" setup>
import minus from "@sit-onyx/icons/minus.svg?raw";
import plus from "@sit-onyx/icons/plus.svg?raw";
import { computed, ref, useTemplateRef, watchEffect } from "vue";
import { useDensity } from "../../composables/density";
import { useAutofocus } from "../../composables/useAutoFocus";
import { getFormMessages, useCustomValidity } from "../../composables/useCustomValidity";
import { useErrorClass } from "../../composables/useErrorClass";
import { SKELETON_INJECTED_SYMBOL, useSkeletonContext } from "../../composables/useSkeletonState";
import { injectI18n } from "../../i18n";
import { useRootAttrs } from "../../utils/attrs";
import { applyLimits, roundToPrecision } from "../../utils/numbers";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core";
import OnyxFormElement from "../OnyxFormElement/OnyxFormElement.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxStepperProps } from "./types";

const props = withDefaults(defineProps<OnyxStepperProps>(), {
  stepSize: 1,
  readonly: false,
  loading: false,
  skeleton: SKELETON_INJECTED_SYMBOL,
  disabled: FORM_INJECTED_SYMBOL,
  showError: FORM_INJECTED_SYMBOL,
});

const emit = defineEmits<{
  /**
   * Emitted when the validity state of the input changes.
   */
  validityChange: [validity: ValidityState];
}>();

const { t } = injectI18n();
const input = useTemplateRef("inputRef");

const { disabled, showError } = useFormContext(props);
const skeleton = useSkeletonContext(props);
const errorClass = useErrorClass(showError);
const { densityClass } = useDensity(props);
const { vCustomValidity, errorMessages } = useCustomValidity({ props, emit });
const successMessages = computed(() => getFormMessages(props.success));
const messages = computed(() => getFormMessages(props.message));

defineOptions({ inheritAttrs: false });
const { rootAttrs, restAttrs } = useRootAttrs();

/**
 * Used to detect user interaction to simulate the behimport { useRootAttrs } from "../../utils/attrs";
avior of :user-invalid for the native input
 * because the native browser :user-invalid does not trigger when the value is changed via Arrow up/down or increase/decrease buttons
 */
const wasTouched = ref(false);
const modelValue = defineModel<number>();

/**
 * Used for syncing the actual input value.
 * We use string to be able to control the number of decimal places.
 */
const inputValue = ref<string>();

const getFormattedValue = computed(() => {
  return (value?: number) => {
    if (props.precision !== undefined && value !== undefined) {
      return roundToPrecision(value, props.precision);
    } else {
      return value?.toString() ?? "";
    }
  };
});

watchEffect(() => {
  inputValue.value = getFormattedValue.value(modelValue.value);
});

const handleClick = (direction: "stepUp" | "stepDown") => {
  wasTouched.value = true;
  const currentValue = modelValue.value || 0;
  const stepValue = (direction === "stepUp" ? 1 : -1) * props.stepSize;
  const newValue = parseFloat(getFormattedValue.value(currentValue + stepValue));
  modelValue.value = applyLimits(newValue, props.min, props.max);
};

const handleChange = () => {
  wasTouched.value = true;
  if (!inputValue.value) {
    modelValue.value = undefined;
    return;
  }

  inputValue.value = getFormattedValue.value(parseFloat(inputValue.value));
  modelValue.value = parseFloat(inputValue.value);
};

const incrementLabel = computed(() => t.value("stepper.increment", { stepSize: props.stepSize }));
const decrementLabel = computed(() => t.value("stepper.decrement", { stepSize: props.stepSize }));

defineExpose({ input });
useAutofocus(input, props);
</script>

<template>
  <div
    v-if="skeleton"
    :class="['onyx-component', 'onyx-stepper-skeleton', densityClass]"
    v-bind="rootAttrs"
  >
    <OnyxSkeleton v-if="!props.hideLabel" class="onyx-stepper-skeleton__label" />
    <OnyxSkeleton class="onyx-stepper-skeleton__input" />
  </div>
  <div
    v-else
    :class="['onyx-component', 'onyx-stepper', densityClass, errorClass]"
    v-bind="rootAttrs"
  >
    <OnyxFormElement
      v-bind="props"
      :message="messages"
      :success-messages="successMessages"
      :error-messages="errorMessages"
    >
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
          :step="props.validStepSize ?? 'any'"
          :title="props.hideLabel ? props.label : undefined"
          v-bind="restAttrs"
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
      color: var(--onyx-color-text-icons-neutral-medium);
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
