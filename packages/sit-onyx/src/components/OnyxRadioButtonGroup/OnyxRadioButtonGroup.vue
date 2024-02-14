<script lang="ts" setup generic="T">
import type { TargetEvent } from "@/types/dom";
import OnyxRadioButton from "../OnyxRadioButton/OnyxRadioButton.vue";
import type { SelectionOption } from "../OnyxRadioButton/types";

type ChangeEvent = TargetEvent<HTMLInputElement>;

const props = defineProps<{
  /**
   * Name for the radio button group form element.
   * Warning: Never use a name for form elements twice!
   */
  name: string;
  modelValue?: SelectionOption<T>;
  label?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadonly?: boolean;
  isLoading?: boolean;
  errorMessage?: string;
  options: SelectionOption<T>[];
}>();

const emit = defineEmits<{
  "update:modelValue": [selected: SelectionOption<T>];
}>();

const handleChange = (event: ChangeEvent) =>
  emit("update:modelValue", props.options.find(({ id }) => event.target.value === id)!);
</script>

<!-- TODO: loading -->
<!-- TODO: check with @jannick if only selected element should be show as invalid -->
<template>
  <fieldset
    class="onyx-radio-button-group"
    :disabled="props.isDisabled"
    @change="handleChange($event as ChangeEvent)"
  >
    <legend v-if="props.label" class="onyx-radio-button-group__label">{{ props.label }}</legend>
    <OnyxRadioButton
      v-for="option in props.options"
      :id="option.id"
      :key="option.id"
      :name="props.name"
      :label="option.label"
      :value="option.value"
      :error-message="option.id === props.modelValue?.id ? props.errorMessage : ''"
      :selected="option.id === props.modelValue?.id"
      :is-disabled="option.isDisabled"
      :is-readonly="props.isReadonly || option.isReadonly"
      :is-loading="props.isLoading || option.isLoading"
    />
  </fieldset>
</template>
