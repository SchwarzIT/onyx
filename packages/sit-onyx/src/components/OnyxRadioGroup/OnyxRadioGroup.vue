<script lang="ts" setup generic="TValue extends SelectOptionValue">
import { computed, useId, useTemplateRef } from "vue";
import { useDensity } from "../../composables/density";
import { useRequired } from "../../composables/required";
import { SKELETON_INJECTED_SYMBOL, useSkeletonContext } from "../../composables/useSkeletonState";
import { useVModel, type Nullable } from "../../composables/useVModel";
import type { SelectOptionValue } from "../../types";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxInfoTooltip from "../OnyxInfoTooltip/OnyxInfoTooltip.vue";
import OnyxRadioButton from "../OnyxRadioButton/OnyxRadioButton.vue";
import type { OnyxRadioGroupProps } from "./types";

type Props = OnyxRadioGroupProps<TValue>;
const props = withDefaults(defineProps<Props>(), {
  name: () => useId(), // the name must be globally unique
  direction: "vertical",
  required: false,
  requiredMarker: FORM_INJECTED_SYMBOL,
  disabled: FORM_INJECTED_SYMBOL,
  skeleton: SKELETON_INJECTED_SYMBOL,
  truncation: "ellipsis",
});

const { densityClass } = useDensity(props);
const { disabled, requiredMarker } = useFormContext(props);
const { requiredMarkerClass, requiredTypeClass } = useRequired(props, requiredMarker);
const skeleton = useSkeletonContext(props);

const emit = defineEmits<{
  /**
   * Emitted when the validity state changes.
   */
  validityChange: [validity: ValidityState];
  /**
   * Emitted when the selected radio button changes.
   */
  "update:modelValue": [selected?: Nullable<TValue>];
}>();
const modelValue = useVModel<TValue, "modelValue", Props, undefined>({
  props,
  emit,
  key: "modelValue",
});

const handleChange = (selected: boolean, value: TValue) => {
  if (!selected) return;
  modelValue.value = value;
};
const radiobuttons = useTemplateRef("radiobuttonsRef");

defineExpose({
  inputs: computed<HTMLInputElement[]>(() => {
    const array = Array.isArray(radiobuttons.value) ? radiobuttons.value : [radiobuttons.value];
    return array
      .flatMap((radiobutton) => radiobutton?.input)
      .filter((radiobutton) => !!radiobutton);
  }),
});
</script>

<template>
  <fieldset
    :class="['onyx-component', 'onyx-radio-group', densityClass, requiredTypeClass]"
    :disabled="disabled"
    role="radiogroup"
    :aria-label="props.label"
  >
    <legend v-if="!props.hideLabel" class="onyx-radio-group__label">
      <OnyxHeadline is="h3" :class="requiredMarkerClass">
        {{ props.label }}
      </OnyxHeadline>
      <OnyxInfoTooltip v-if="props.labelTooltip" open="hover" :text="props.labelTooltip" />
    </legend>

    <div
      class="onyx-radio-group__content"
      :class="{ 'onyx-radio-group__content--horizontal': props.direction === 'horizontal' }"
    >
      <template v-if="!skeleton">
        <OnyxRadioButton
          v-for="(option, index) in props.options"
          :key="option.value.toString()"
          v-bind="option"
          ref="radiobuttonsRef"
          :name="props.name"
          :custom-error="props.customError"
          :checked="option.value === modelValue"
          :required="props.required"
          :truncation="option.truncation ?? props.truncation"
          @validity-change="index === 0 && emit('validityChange', $event)"
          @change="handleChange($event, option.value)"
        />
      </template>

      <template v-else-if="typeof skeleton === 'number'">
        <OnyxRadioButton
          v-for="i in skeleton"
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

.onyx-radio-group {
  @include layers.component() {
    padding: 0;
    border: none;
    max-width: max-content;
    min-width: unset;

    &__label {
      display: flex;
      gap: var(--onyx-spacing-2xs);
      align-items: center;
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
