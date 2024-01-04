<script lang="ts" setup>
import {
  useFormValidationMessage,
  type SupportedErrorLangs,
} from "@/composables/formValidationMessage";
import { computed, onMounted, ref, watch } from "vue";

type NativeInputProps = Partial<{
  required: boolean;
  pattern: string;
  // TODO: we probably want to have number inputs separated from the others in the future.
  type: "email" | "number" | "password" | "search" | "tel" | "text" | "url";
  max: number | string;
  maxLength: number;
  min: number | string;
  /** expected minimal length of a string value. Warning: when the value is (pre)set by code,
   * the input invalidity can not be detected by the browser, it will only show as invalid
   * as soon as a user interacts with the input (types something).
   */
  minLength: number;
}>;
export type TestInputProps = {
  /** The current input value
   * TODO: remove the "number" once we separated number inputs from the other types.
   */
  modelValue?: string | number;
  /** Label to show next to the input */
  label?: string;
  /** A custom error message that will be shown (only when the input is invalid) */
  customErrorMessage?: string;
  /** The selected language key */
  lang?: SupportedErrorLangs;
} & NativeInputProps;

const props = withDefaults(defineProps<TestInputProps>(), {
  modelValue: "",
  label: "",
  type: "text",
});

const emit = defineEmits<{
  /** Emitted when input value changes
   * TODO: remove the "number" once we separated number inputs from the other types.
   */
  "update:modelValue": [value: string | number];
  /** Emitted on blur when the input value changes */
  change: [value: string];
  /** Emitted whenever the validity state of the input changes */
  validityChange: [state: ValidityState];
}>();

const isTouched = ref(false);

const coreElement = ref<HTMLInputElement | null>(null);

const validityState = ref<ValidityState | undefined>(coreElement.value?.validity);

const errorMessage = computed(() => {
  /* when the validity state is uninitialized or the form is valid, we don't show an error. */
  if (!validityState.value || validityState.value.valid) return "";
  /* a custom error message always is considered first */
  if (props.customErrorMessage) return props.customErrorMessage;

  const element = coreElement.value;
  /* when a language key is provided, we offer our own translations of the error messages 
  to match the rest of the user's application */
  if (props.lang && element) return useFormValidationMessage(props.lang, element.validity);
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

onMounted(() => {
  /* element will always be truthy onMounted */
  const element = coreElement.value;
  if (element) {
    watch(
      value,
      () => {
        /* we need to destructure so that the emitter below fires properly. */
        validityState.value = { ...element.validity };
      },
      { immediate: true },
    );
    watch(
      validityState,
      () => {
        if (element.validity) {
          emit("validityChange", element.validity);
        }
      },
      { deep: true },
    );
  }
});
</script>

<template>
  <label class="input" :class="{ 'input--touched': isTouched }">
    <span class="input__label" :class="{ 'input__label--required': props.required }">
      {{ props.label }}
    </span>
    <input
      v-bind="props"
      ref="coreElement"
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
