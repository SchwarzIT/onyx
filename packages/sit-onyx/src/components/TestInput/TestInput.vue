<script lang="ts" setup>
import { computed } from "vue";

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
    type: undefined,
    pattern: undefined,
  },
);

const emit = defineEmits<{
  /** Emitted when input value changes */
  "update:modelValue": [value: string];
  /** Emitted on blur when the input value changes */
  change: [value: string];
}>();

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
  <label>
    <span class="input__label" :class="{ 'input__label--required': props.required }">
      {{ props.label }}
    </span>
    <input
      v-model="value"
      :required="props.required"
      :minlength="props.minlength"
      :maxlength="props.maxlength"
      :min="props.min"
      :max="props.max"
      :type="props.type"
      :pattern="props.pattern"
      @change="handleChange"
    />
    <p>Model value: {{ value }}</p>
  </label>
</template>

<style lang="scss" scoped>
.input {
  &__label {
    margin-right: 8px;

    &--required {
      &::after {
        content: "*";
        color: red;
      }
    }
  }
}
</style>
