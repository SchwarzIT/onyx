<script lang="ts" setup generic="TValue extends SelectOptionValue">
import { computed, provide, reactive, ref, useId, useTemplateRef } from "vue";
import { useDensity } from "../../composables/density.js";
import { useRequired } from "../../composables/required.js";
import { useErrorClass } from "../../composables/useErrorClass.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
import type { Nullable, SelectOptionValue } from "../../types/index.js";
import { asArray } from "../../utils/objects.js";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxFormElementV2Bottom from "../OnyxFormElementV2/OnyxFormElementV2Bottom.vue";
import type { FormElementV2Tooltip } from "../OnyxFormElementV2/types.js";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxInfoTooltip from "../OnyxInfoTooltip/OnyxInfoTooltip.vue";
import OnyxRadioButton from "../OnyxRadioButton/OnyxRadioButton.vue";
import { RADIO_GROUP_INJECTION_KEY, type OnyxRadioGroupProps } from "./types.js";

type Props = OnyxRadioGroupProps<TValue>;
const props = withDefaults(defineProps<Props>(), {
  name: () => useId(), // the name must be globally unique
  orientation: "vertical",
  required: false,
  requiredMarker: FORM_INJECTED_SYMBOL,
  disabled: FORM_INJECTED_SYMBOL,
  skeleton: SKELETON_INJECTED_SYMBOL,
  showError: FORM_INJECTED_SYMBOL,
  reserveMessageSpace: FORM_INJECTED_SYMBOL,
  truncation: "ellipsis",
});

const { densityClass } = useDensity(props);
const { disabled, requiredMarker, showError, reserveMessageSpace } = useFormContext(props);
const errorClass = useErrorClass(showError);
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

const isRequired = computed(() =>
  Boolean(props.required || props.options?.some((option) => option.required)),
);

const requiredProps = reactive({
  required: isRequired,
});
const { requiredMarkerClass, requiredTypeClass } = useRequired(requiredProps, requiredMarker);

const childErrors = ref<Map<string, string | FormElementV2Tooltip>>(new Map());

provide(RADIO_GROUP_INJECTION_KEY, {
  reportError: (id, error) => {
    if (error) {
      childErrors.value.set(id, error);
    } else {
      childErrors.value.delete(id);
    }
  },
  unregister: (id) => {
    childErrors.value.delete(id);
  },
});

const groupError = computed<string | FormElementV2Tooltip | undefined>(() => {
  for (const error of childErrors.value.values()) {
    if (error) return error;
  }
  return undefined;
});

const modelValue = useVModel<Props, "modelValue">({
  props,
  emit,
  key: "modelValue",
});

const handleChange = (selected: boolean, value: TValue) => {
  if (!selected) return;
  modelValue.value = value;
};
const radioButtons = useTemplateRef("radiobuttons");

defineExpose({
  inputs: computed<HTMLInputElement[]>(() => {
    const array = asArray(radioButtons.value);
    return array
      .flatMap((radiobutton) => radiobutton?.input)
      .filter((radiobutton) => !!radiobutton);
  }),
});
</script>

<template>
  <fieldset
    :class="['onyx-component', 'onyx-radio-group', densityClass, requiredTypeClass, errorClass]"
    :disabled="disabled"
    role="radiogroup"
    :aria-label="props.label"
    :aria-invalid="groupError ? 'true' : undefined"
  >
    <legend v-if="!props.hideLabel" class="onyx-radio-group__label">
      <OnyxHeadline is="h3" :class="requiredMarkerClass">
        {{ props.label }}
      </OnyxHeadline>
      <OnyxInfoTooltip v-if="props.labelTooltip" trigger="hover" :text="props.labelTooltip" />
    </legend>

    <div
      class="onyx-radio-group__content"
      :class="{ 'onyx-radio-group__content--horizontal': props.orientation === 'horizontal' }"
    >
      <template v-if="!skeleton">
        <OnyxRadioButton
          v-for="(option, index) in props.options"
          :key="option.value.toString()"
          v-bind="option"
          ref="radiobuttons"
          :name="props.name"
          :error="option.error || props.error"
          :checked="option.value === modelValue"
          :required="isRequired"
          :disabled="disabled || option.disabled"
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
          label="Skeleton"
          :name="props.name"
          skeleton
        />
      </template>
    </div>

    <OnyxFormElementV2Bottom
      :label="props.label"
      :error="groupError"
      :message="props.message"
      :success="props.success"
      :reserve-message-space="reserveMessageSpace"
      show-error
    />
  </fieldset>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-radio-group {
  @include layers.component() {
    --onyx-form-element-v2-error-display: none;
    --onyx-form-element-v2-message-display: flex;

    padding: 0;
    border: none;
    width: max-content;
    max-width: 100%;
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

    .onyx-radio-button {
      .onyx-required-marker {
        display: none;
      }
    }

    &:not(.onyx-form-element--suppress-invalid) {
      &.onyx-form-element--immediate-invalid:has(
          .onyx-radio-button__selector:invalid,
          .onyx-radio-button__selector[aria-invalid="true"]
        ),
      &.onyx-form-element--touched-invalid:has(
          .onyx-radio-button__selector:user-invalid,
          .onyx-radio-button__selector[aria-invalid="true"]
        ) {
        --onyx-form-element-v2-error-display: flex;
        --onyx-form-element-v2-message-display: none;
      }
    }
  }
}
</style>
