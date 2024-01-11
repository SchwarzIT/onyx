<script lang="ts">
export const INPUT_TYPES = ["email", "number", "password", "search", "tel", "text", "url"] as const;
</script>

<script lang="ts" setup>
import {
  useFormValidationMessage,
  type SupportedErrorLangs,
} from "@/composables/formValidationMessage";
import { computed, ref, watch } from "vue";

export type InputType = (typeof INPUT_TYPES)[number];

export type TestInputProps = {
  /**
   * The current input value
   * TODO: remove the "number" once we separated number inputs from the other types.
   */
  modelValue?: string | number;
  /** Label to show next to the input */
  label?: string;
  /**
   * Error message to show when the input is invalid.
   * @default Default message depending on the browser language and validation
   */
  errorMessage?: string;
  /**
   * Language to use for error messages.
   * If empty, the error message defaults to the browser language and validation
   */
  lang?: SupportedErrorLangs;
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
  /**
   * For validation:Expected minimal length of a string value. Warning: when the value is (pre)set by code,
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

const isTouched = ref(false);

const inputElement = ref<HTMLInputElement | null>(null);

const validityState = ref(inputElement.value?.validity);

const errorMessage = computed(() => {
  /* when the validity state is uninitialized or the form is valid, we don't show an error. */
  if (!validityState.value || validityState.value.valid) return "";
  /* a custom error message always is considered first */
  if (props.errorMessage) return props.errorMessage;

  const element = inputElement.value;
  /* when a language key is provided, we offer our own translations of the error messages
  to match the rest of the user's application */
  if (props.lang && element) return useFormValidationMessage(element.validity, props);
  /* we default to the browser's standard validation message that relies on the browser language */
  return element?.validationMessage || "";
});

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
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
</script>

<template>
  <label class="input" :class="{ 'input--touched': isTouched }">
    <span class="input__label" :class="{ 'input__label--required': props.required }">
      {{ props.label }}
    </span>
    <input
      v-bind="props"
      ref="inputElement"
      v-model="value"
      @change="handleChange"
      @blur="isTouched = true"
    />
    <p v-if="isTouched && !validityState?.valid" class="input__error" aria-live="polite">
      {{ errorMessage }}
    </p>
    <p class="input__info">Model value: "{{ value }}", is valid: {{ validityState?.valid }}</p>
  </label>
</template>

<style lang="scss" scoped>
.input {
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
