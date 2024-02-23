<script lang="ts" setup>
import { computed } from "vue";

type Options = Record<string, boolean | string>;

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
    <template v-for="(value, label) of options" :key="label">
      <label v-if="typeof value === 'boolean'">
        <input type="checkbox" :checked="value" @change="options[label] = !value" />
        <span
          class="label"
          :class="{ 'label--highlighted': highlightLabel === label, 'label--checked': value }"
        >
          {{ label }}
        </span>
      </label>
      <em v-else class="title">{{ value }}</em>
    </template>
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

.title {
  margin-top: 8px;
}
</style>
