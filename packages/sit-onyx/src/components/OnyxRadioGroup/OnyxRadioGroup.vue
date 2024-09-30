<script lang="ts" setup generic="TValue extends SelectOptionValue">
import { useId } from "vue";
import { useDensity } from "../../composables/density";
import { useRequired } from "../../composables/required";
import type { SelectOptionValue } from "../../types";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxRadioButton from "../OnyxRadioButton/OnyxRadioButton.vue";
import type { OnyxRadioGroupProps } from "./types";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm";

const props = withDefaults(defineProps<OnyxRadioGroupProps<TValue>>(), {
  name: () => useId() ?? "", // the name must be globally unique
  direction: "vertical",
  required: false,
  disabled: FORM_INJECTED_SYMBOL,
  truncation: "ellipsis",
});

const { densityClass } = useDensity(props);
const { requiredMarkerClass, requiredTypeClass } = useRequired(props);
const { disabled } = useFormContext(props);

const emit = defineEmits<{
  "update:modelValue": [selected: TValue];
  /**
   * Emitted when the validity state changes.
   */
  validityChange: [validity: ValidityState];
}>();

const handleChange = (selected: boolean, value: TValue) => {
  if (!selected) return;
  emit("update:modelValue", value);
};
</script>

<template>
  <fieldset
    :class="['onyx-radio-button-group', densityClass, requiredTypeClass]"
    :disabled="disabled"
    role="radiogroup"
    :aria-label="props.label"
  >
    <legend v-if="!props.hideLabel" class="onyx-radio-button-group__headline">
      <OnyxHeadline is="h3" :class="requiredMarkerClass">
        {{ props.label }}
      </OnyxHeadline>
    </legend>

    <div
      class="onyx-radio-button-group__content"
      :class="{ 'onyx-radio-button-group__content--horizontal': props.direction === 'horizontal' }"
    >
      <template v-if="props.skeleton === undefined">
        <OnyxRadioButton
          v-for="(option, index) in props.options"
          :key="option.value.toString()"
          v-bind="option"
          :name="props.name"
          :custom-error="props.customError"
          :checked="option.value === props.modelValue"
          :required="props.required"
          :truncation="option.truncation ?? props.truncation"
          @validity-change="index === 0 && emit('validityChange', $event)"
          @change="handleChange($event, option.value)"
        />
      </template>

      <template v-else>
        <OnyxRadioButton
          v-for="i in props.skeleton"
          :id="`skeleton-${i}`"
          :key="i"
          :value="`skeleton-${i}`"
          label="Skeleton ${i}"
          :name="props.name"
          skeleton
        />
      </template>
    </div>
  </fieldset>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-radio-button-group {
  @include layers.component() {
    padding: 0;
    border: none;
    max-width: max-content;
    min-width: unset;

    &__label {
      margin-bottom: var(--onyx-density-xs);
    }

    &__content {
      display: flex;
      flex-direction: column;

      &--horizontal {
        flex-direction: row;
        flex-wrap: wrap;
        column-gap: var(--onyx-density-xl);
      }
    }
  }
}
</style>
