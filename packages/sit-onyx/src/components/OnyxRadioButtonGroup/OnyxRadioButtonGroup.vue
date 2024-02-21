<script lang="ts" setup generic="TValue">
import type { TargetEvent } from "@/types/dom";
import OnyxRadioButton from "../OnyxRadioButton/OnyxRadioButton.vue";
import type { SelectionOption } from "../OnyxRadioButton/types";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import type { OnyxRadioButtonGroupProps } from "./types";
import { createId } from "@sit-onyx/headless";

type ChangeEvent = TargetEvent<HTMLInputElement>;

const props = withDefaults(defineProps<OnyxRadioButtonGroupProps<TValue>>(), {
  name: () => createId("radio-button-group-name"), // the name must be globally unique
  direction: "vertical",
});

const emit = defineEmits<{
  "update:modelValue": [selected: SelectionOption<TValue>];
}>();

const handleChange = (event: ChangeEvent) =>
  emit("update:modelValue", props.options.find(({ id }) => event.target.value === id)!);
</script>

<!-- TODO: check with @jannick if only selected element should be show as invalid -->
<template>
  <fieldset
    class="onyx-radio-button-group"
    :disabled="props.disabled"
    @change="handleChange($event as ChangeEvent)"
  >
    <legend v-if="props.headline" class="onyx-radio-button-group__headline">
      <OnyxHeadline is="h3">{{ props.headline }}</OnyxHeadline>
    </legend>

    <div
      class="onyx-radio-button-group__content"
      :class="{ 'onyx-radio-button-group__content--horizontal': props.direction === 'horizontal' }"
    >
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
      />
    </div>
  </fieldset>
</template>

<style lang="scss">
.onyx-radio-button-group {
  margin: 0;
  padding: 0;
  border: none;
  max-width: max-content;

  &__label {
    margin-bottom: var(--onyx-spacing-2xs);
  }

  &__content {
    display: flex;
    flex-direction: column;

    &--horizontal {
      flex-direction: row;
      flex-wrap: wrap;
      column-gap: var(--onyx-spacing-xl);
    }
  }
}
</style>
