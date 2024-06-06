<script lang="ts" setup>
import { injectI18n } from "../../i18n";
import { areObjectsFlatEqual } from "../../utils/objects";
import { getFirstInvalidType, transformValidityStateToObject } from "../../utils/validity";
import { computed, ref, toRefs, watch } from "vue";
import type { InputType } from "../OnyxInput/types";
import { TRANSLATED_INPUT_TYPES, type TranslatedInputType } from "./types";

export type TestInputProps = {
  /**
   * The current input value
   * TODO: remove the "number" once we separated number inputs from the other types.
   */
  modelValue?: string | number;
  /** Label to show next to the input */
  label?: string;
  /**
   * Error message to show when the input is invalid. Will only show up after the input was touched.
   * If unset, a default error message is used that is provided by onyx depending
   * on your current locale/language and validation.
   */
  errorMessage?: string;
  /** For validation: Whether a non-empty value is required */
  required?: boolean;
  /** For validation: The pattern that the value must match */
  pattern?: string;
  /** For validation: The expected type of the input's value */
  type?: InputType | "number";
  /** For validation: The upper limit of a number value */
  max?: number;
  /**
   * For validation: Expected maximal length of a string value. Warning: when the value is (pre)set by code,
   * the input invalidity can not be detected by the browser, it will only show as invalid
   * as soon as a user interacts with the input (types something).
   */
  maxLength?: number;
  /** For validation: The lower limit of a number value */
  min?: number;
  /** Step size of a number value */
  step?: number;
  /**
   * For validation: Expected minimal length of a string value. Warning: when the value is (pre)set by code,
   * the input invalidity can not be detected by the browser, it will only show as invalid
   * as soon as a user interacts with the input (types something).
   */
  minLength?: number;
};

const props = withDefaults(defineProps<TestInputProps>(), {
  modelValue: "",
  label: "",
  type: "text",
});

const emit = defineEmits<{
  /**
   * Emitted when input value changes
   * TODO: remove the "number" once we separated number inputs from the other types.
   */
  "update:modelValue": [value: string | number];
  /** Emitted on blur when the input value changes */
  change: [value: string];
  /** Emitted whenever the validity state of the input changes */
  validityChange: [state: ValidityState];
}>();

const { t } = injectI18n();

const { errorMessage } = toRefs(props);
const isTouched = ref(false);
const inputElement = ref<HTMLInputElement | null>(null);
const validityState = ref(inputElement.value?.validity);

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const displayedErrorMessage = computed(() => {
  if (!validityState.value || validityState.value.valid) return "";

  const errorType = getFirstInvalidType(validityState.value);
  // a custom error message always is considered first
  if (props.errorMessage || errorType === "customError") return props.errorMessage;
  if (!errorType) return "";

  // if the error is "typeMismatch", we will use an error message depending on the type property
  if (errorType === "typeMismatch") {
    const type = TRANSLATED_INPUT_TYPES.includes(props.type as TranslatedInputType)
      ? (props.type as TranslatedInputType)
      : "generic";
    return t.value(`validations.typeMismatch.${type}`, { value: value.value });
  }

  return t.value(`validations.${errorType}`, {
    value: value.value,
    n: value.value.toString().length,
    minLength: props.minLength,
    maxLength: props.maxLength,
    min: props.min,
    max: props.max,
    step: props.step,
  });
});

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("change", target.value);
};

watch([inputElement, errorMessage], () => {
  if (!inputElement.value) return;
  // by using setCustomValidity, the ValidityState will turn invalid
  // as long as it is not an empty string
  inputElement.value.setCustomValidity(props.errorMessage || "");
});

watch(
  [inputElement, value, errorMessage],
  () => {
    if (!inputElement.value) return;
    const newValidityState = transformValidityStateToObject(inputElement.value!.validity);
    //  only update + emit the validity state when it changed
    if (!validityState.value || !areObjectsFlatEqual(newValidityState, validityState.value)) {
      validityState.value = newValidityState;
      emit("validityChange", validityState.value);
    }
  },
  { immediate: true },
);
</script>

<template>
  <label class="onyx-test-input" :class="{ 'onyx-test-input--touched': isTouched }">
    <span
      class="onyx-test-input__label"
      :class="{ 'onyx-test-input__label--required': props.required }"
    >
      {{ props.label }}
    </span>
    <input
      v-bind="props"
      ref="inputElement"
      v-model="value"
      @change="handleChange"
      @blur="isTouched = true"
    />
    <p v-if="isTouched && !validityState?.valid" class="onyx-test-input__error" aria-live="polite">
      {{ displayedErrorMessage }}
    </p>
    <p class="onyx-test-input__info">
      Model value: "{{ value }}", is valid: {{ validityState?.valid }}
    </p>
  </label>
</template>

<style lang="scss">
.onyx-test-input {
  width: max-content;
  display: inline-block;
  font-family: var(--onyx-font-family);
  color: var(--onyx-color-text-icons-neutral-intense);

  &__label {
    margin-right: 8px;

    &--required {
      &::after {
        content: "*";
        color: red;
      }
    }
  }
  &__error {
    color: darkred;
    margin: 0;
  }

  &--touched {
    input:valid {
      border-bottom-color: green;
    }
    input:invalid {
      border-bottom-color: red;
    }
  }
}
</style>
