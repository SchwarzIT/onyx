<script lang="ts">
import enUS from "@/i18n/locales/en-US.json";

export const INPUT_TYPES = ["email", "number", "password", "search", "tel", "text", "url"] as const;
export type InputType = (typeof INPUT_TYPES)[number];

/**
 * Input types that have a translation for their validation error message.
 */
const TRANSLATED_INPUT_TYPES = Object.keys(
  enUS.validations.typeMismatch,
) as (keyof typeof enUS.validations.typeMismatch)[];
type TranslatedInputType = (typeof TRANSLATED_INPUT_TYPES)[number];
</script>

<script lang="ts" setup>
import { injectI18n } from "@/i18n";
import { getFirstInvalidType } from "@/utils/forms";
import { computed, ref, watch } from "vue";

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
   * If unset, a default error message is used that is provided by Onyx depending
   * on your current locale/language and validation.
   */
  errorMessage?: string;
  /** For validation: Whether a non-empty value is required */
  required?: boolean;
  /** For validation: The pattern that the value must match */
  pattern?: string;
  /** For validation: The expected type of the input's value */
  type?: InputType;
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

const isTouched = ref(false);
const inputElement = ref<HTMLInputElement | null>(null);
const validityState = ref(inputElement.value?.validity);

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const errorMessage = computed(() => {
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

watch([value, inputElement], () => {
  // update validity state when value changes
  if (!inputElement.value) return;
  validityState.value = inputElement.value.validity;
});

watch(
  validityState,
  (newValidity) => {
    if (!newValidity) return;
    emit("validityChange", newValidity);
  },
  { deep: true },
);

watch(
  [props.errorMessage, inputElement],
  () => {
    if (!inputElement.value) return;
    // by using setCustomValidity, the ValidityState will turn invalid
    // as long as it's not an empty string
    inputElement.value.setCustomValidity(props.errorMessage || "");
  },
  { deep: true },
);
</script>

<template>
  <label class="onyx-input" :class="{ 'onyx-input--touched': isTouched }">
    <span class="onyx-input__label" :class="{ 'onyx-input__label--required': props.required }">
      {{ props.label }}
    </span>
    <input
      v-bind="props"
      ref="inputElement"
      v-model="value"
      @change="handleChange"
      @blur="isTouched = true"
    />
    <p v-if="isTouched && !validityState?.valid" class="onyx-input__error" aria-live="polite">
      {{ errorMessage }}
    </p>
    <p class="onyx-input__info">Model value: "{{ value }}", is valid: {{ validityState?.valid }}</p>
  </label>
</template>

<style lang="scss" scoped>
.onyx-input {
  width: max-content;
  display: inline-block;
  font-family: var(--onyx-font-family);

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
  &__info {
    color: grey;
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
