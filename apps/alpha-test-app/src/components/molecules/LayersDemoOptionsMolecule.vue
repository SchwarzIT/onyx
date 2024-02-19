<script lang="ts" setup>
import { computed } from "vue";

type Options = Record<string, boolean>;

const props = defineProps<{
  modelValue: Options;
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
      {{ label }}
    </label>
  </div>
</template>

<style lang="scss" scoped>
.options {
  display: flex;
  flex-direction: column;
}
</style>
