<script lang="ts" setup generic="T">
import OnyxRadioButton from "../OnyxRadioButton/OnyxRadioButton.vue";
import type { SelectionOption } from "../OnyxRadioButton/types";

const props = defineProps<{
  /**
   * name for the radio buttons
   */
  name: string;
  modelValue?: SelectionOption<T>;
  label?: string;
  isDisabled?: boolean;
  isReadonly?: boolean;
  isLoading?: boolean;
  options: SelectionOption<T>[];
}>();

const emit = defineEmits<{
  "update:modelValue": [SelectionOption<T>];
}>();
</script>

<!-- TODO: loading -->
<!-- TODO: readonly -->
<template>
  <fieldset class="onyx-radio-button-group">
    <legend v-if="props.label" class="onyx-radio-button-group__legend">{{ props.label }}</legend>
    <OnyxRadioButton
      v-for="option in props.options"
      :id="option.id"
      :key="option.id"
      :name="props.name"
      :label="option.label"
      :value="option.value"
      :selected="option.id === props.modelValue?.id"
      :is-disabled="props.isDisabled || option.isDisabled"
      :is-readonly="props.isReadonly || option.isReadonly"
      :is-loading="props.isLoading || option.isLoading"
      @input="emit('update:modelValue', option)"
    />
  </fieldset>
</template>
