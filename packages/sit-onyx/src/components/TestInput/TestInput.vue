<script lang="ts" setup>
import { computed, ref } from "vue";

const props = withDefaults(
  defineProps<{
    /** The current input value */
    modelValue?: string;
    /** Label to show next to the input */
    label?: string;
    required?: boolean;
    minlength?: number;
    maxlength?: number;
    min?: number;
    max?: number;
    type?: string;
    pattern?: string;
  }>(),
  {
    modelValue: "",
    label: "",
    minlength: undefined,
    maxlength: undefined,
    min: undefined,
    max: undefined,
    type: "text",
    pattern: undefined,
  },
);

const emit = defineEmits<{
  /** Emitted when input value changes */
  "update:modelValue": [value: string];
  /** Emitted on blur when the input value changes */
  change: [value: string];
}>();

const isTouched = ref(false);

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
    <input v-model="value" v-bind="props" @change="handleChange" @blur="isTouched = true" />
    <p>Model value: {{ value }}</p>
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
