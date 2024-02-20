<script lang="ts" setup>
import { computed } from "vue";

type Options = Record<string, boolean>;

const props = defineProps<{
  modelValue: Options;
  highlightLabel?: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: Options];
}>();

const options = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<template>
  <div class="options">
    Demo options
    <label v-for="(isChecked, label) of options" :key="label">
      <input type="checkbox" :checked="isChecked" @change="options[label] = !isChecked" />
      <span
        class="label"
        :class="{ 'label--highlighted': highlightLabel === label, 'label--checked': isChecked }"
      >
        {{ label }}
      </span>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.options {
  display: flex;
  flex-direction: column;
}

.label {
  color: rgb(96, 96, 96);
  &--checked {
    color: black;
  }
  &--highlighted {
    font-weight: bold;
    color: green;
  }
}
</style>
