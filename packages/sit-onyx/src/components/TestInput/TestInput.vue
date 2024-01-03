<script lang="ts" setup>
import { computed, ref } from "vue";

/** equivalent to Pick<HTMLInputElement,
 * "required" | "minLength" | "maxLength" | "min" | "max" | "type" | "pattern" | "title"
 * >;
 */
type NativeInputProps = Partial<{
  required: boolean;
  pattern: string;
  type: string;
  max: number | string;
  maxLength: number;
  min: number | string;
  minLength: number;
  title: string;
}>;
export type TestInputProps = {
  /** The current input value */
  modelValue?: string;
  /** Label to show next to the input */
  label?: string;
} & NativeInputProps;

const props = withDefaults(defineProps<TestInputProps>(), {
  modelValue: "",
  label: "",
  type: "text",
});

const emit = defineEmits<{
  /** Emitted when input value changes */
  "update:modelValue": [value: string];
  /** Emitted on blur when the input value changes */
  change: [value: string];
}>();

const isTouched = ref(false);

const coreElement = ref<HTMLInputElement | null>(null);

const isValid = computed<boolean>(() => {
  return coreElement.value?.validity.valid || false;
});

const errorMessage = computed<string>(() => {
  if (coreElement.value && !isValid.value) {
    return coreElement.value.validationMessage;
  }
  return "";
});

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("change", target.value);
};
</script>

<template>
  <label class="input" :class="{ 'input--touched': isTouched }">
    <span class="input__label" :class="{ 'input__label--required': props.required }">
      {{ props.label }}
      <!-- 
        <span aria-label="required">*</span> 
        should we use the above instead of the "after"?
        see https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#full_example
      -->
    </span>
    <input
      v-bind="props"
      ref="coreElement"
      v-model="value"
      @click="console.log(coreElement?.validity)"
      @change="handleChange"
      @blur="isTouched = true"
    />
    <p v-if="isTouched && !isValid" class="input__error">{{ errorMessage }}</p>
    <p class="input__info">Model value: "{{ value }}", is valid: {{ isValid }}</p>
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
