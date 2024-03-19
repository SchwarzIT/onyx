<script lang="ts" setup generic="TValue extends SelectionOptionValue">
import type { TargetEvent } from "@/types/dom";
import { createId } from "@sit-onyx/headless";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxRadioButton from "../OnyxRadioButton/OnyxRadioButton.vue";
import type { SelectionOption, SelectionOptionValue } from "../OnyxRadioButton/types";
import type { OnyxRadioButtonGroupProps } from "./types";
import { useDensity } from "../../composables/density";
import { useRequired } from "../../composables/required";

type ChangeEvent = TargetEvent<HTMLInputElement>;

const props = withDefaults(defineProps<OnyxRadioButtonGroupProps<TValue>>(), {
  name: () => createId("radio-button-group-name"), // the name must be globally unique
  direction: "vertical",
  headline: "",
  required: false,
  disabled: false,
  errorMessage: "",
});

const { densityClass } = useDensity(props);
const { requiredMarkerClass, requiredTypeClass } = useRequired(props);

const emit = defineEmits<{
  "update:modelValue": [selected: SelectionOption<TValue>];
}>();

const handleChange = (event: ChangeEvent) =>
  emit("update:modelValue", props.options.find(({ id }) => event.target.value === id)!);
</script>

<template>
  <fieldset
    :class="['onyx-radio-button-group', densityClass, requiredTypeClass]"
    :disabled="props.disabled"
    @change="handleChange($event as ChangeEvent)"
  >
    <legend v-if="props.headline" class="onyx-radio-button-group__headline">
      <OnyxHeadline is="h3" :class="requiredMarkerClass">
        {{ props.headline }}
      </OnyxHeadline>
    </legend>

    <div
      class="onyx-radio-button-group__content"
      :class="{ 'onyx-radio-button-group__content--horizontal': props.direction === 'horizontal' }"
    >
      <template v-if="props.skeleton === undefined">
        <OnyxRadioButton
          v-for="option in props.options"
          :key="option.id.toString()"
          v-bind="option"
          :name="props.name"
          :error-message="props.errorMessage"
          :selected="option.id === props.modelValue?.id"
          :required="props.required"
        />
      </template>

      <template v-else>
        <OnyxRadioButton
          v-for="i in props.skeleton"
          :id="`skeleton-${i}`"
          :key="i"
          label="Skeleton ${i}"
          :name="props.name"
          skeleton
        />
      </template>
    </div>
  </fieldset>
</template>

<style lang="scss">
.onyx-radio-button-group {
  margin: 0;
  padding: 0;
  border: none;
  max-width: max-content;
  min-width: unset;

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
