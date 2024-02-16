<script lang="ts" setup generic="T">
import type { TargetEvent } from "@/types/dom";
import OnyxRadioButton from "../OnyxRadioButton/OnyxRadioButton.vue";
import type { SelectionOption } from "../OnyxRadioButton/types";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";

type ChangeEvent = TargetEvent<HTMLInputElement>;

const props = defineProps<{
  /**
   * Name for the radio button group form element.
   * Warning: Never use a name for form elements twice!
   */
  name: string;
  modelValue?: SelectionOption<T>;
  /**
   * Headline shown above the radio button group, which is also the fieldset legend.
   */
  headline?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
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
    :disabled="props.disabled"
    @change="handleChange($event as ChangeEvent)"
  >
    <legend v-if="props.headline" class="onyx-radio-button-group__label">
      <OnyxHeadline is="h3">{{ props.headline }}</OnyxHeadline>
    </legend>
    <OnyxRadioButton
      v-for="option in props.options"
      :id="option.id"
      :key="option.id"
      :name="props.name"
      :label="option.label"
      :value="option.value"
      :error-message="option.id === props.modelValue?.id ? props.errorMessage : ''"
      :selected="option.id === props.modelValue?.id"
      :disabled="option.disabled"
      :readonly="props.readonly || option.readonly"
      :loading="props.isLoading || option.loading"
    />
  </fieldset>
</template>
