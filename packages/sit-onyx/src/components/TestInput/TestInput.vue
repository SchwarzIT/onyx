<script lang="ts" setup>
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    /** The current input value */
    modelValue?: string;
    /** Label to show next to the input */
    label?: string;
    required?: boolean;
  }>(),
  {
    modelValue: "",
    label: "",
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
  <label class="input">
    <span class="input__label" :class="{ 'input__label--required': props.required }">
      {{ props.label }}
    </span>
    <input v-model="value" :required="props.required" @change="handleChange" />
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
}
</style>
