<script lang="ts" setup>
import { computed, useTemplateRef } from "vue";
import { useDensity } from "../../composables/density.js";
import { useAutofocus } from "../../composables/useAutoFocus.js";
import { useErrorClass } from "../../composables/useErrorClass.js";
import { getFormMessages, useFormElementError } from "../../composables/useFormElementError.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
import { useRootAttrs } from "../../utils/attrs.js";
import { useForwardProps } from "../../utils/props.js";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxFormElement from "../OnyxFormElement/OnyxFormElement.vue";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxTimepickerProps } from "./types.js";

const props = withDefaults(
  defineProps<
    Omit<OnyxTimepickerProps, "type"> & {
      /**
       * Defines the granularity of the time input in seconds.
       */
      step?: number;
    }
  >(),
  {
    required: false,
    readonly: false,
    loading: false,
    skeleton: SKELETON_INJECTED_SYMBOL,
    disabled: FORM_INJECTED_SYMBOL,
    showError: FORM_INJECTED_SYMBOL,
    step: 0,
  },
);

const emit = defineEmits<{
  /**
   * Dependent on `type` the string is:
   * - "HH:MM:SS"
   */
  "update:modelValue": [value?: string];
  /**
   * Emitted when the validity state of the input changes.
   */
  validityChange: [validity: ValidityState];
}>();

defineOptions({ inheritAttrs: false });
const { rootAttrs, restAttrs } = useRootAttrs();
const { vCustomValidity, errorMessages } = useFormElementError({ props, emit });
const successMessages = computed(() => getFormMessages(props.success));
const messages = computed(() => getFormMessages(props.message));
const { densityClass } = useDensity(props);
const { disabled, showError } = useFormContext(props);
const skeleton = useSkeletonContext(props);
const errorClass = useErrorClass(showError);
const formElementProps = useForwardProps(props, OnyxFormElement);

/**
 * Current value (with getter and setter) that can be used as "v-model" for the native input.
 */
const modelValue = useVModel({
  props,
  emit,
  key: "modelValue",
});
const value = computed({
  get: () => {
    return modelValue.value;
  },
  set: (value) => {
    modelValue.value = String(value);
  },
});

defineSlots<{
  /**
   * Icon content.
   */
  icon(): unknown;
}>();
useAutofocus(useTemplateRef("inputRef"), props);
</script>

<template>
  <div
    v-if="skeleton"
    :class="['onyx-component', 'onyx-timepicker-input-skeleton', densityClass]"
    v-bind="rootAttrs"
  >
    <OnyxSkeleton v-if="!props.hideLabel" class="onyx-timepicker-input-skeleton__label" />
    <OnyxSkeleton class="onyx-timepicker-input-skeleton__input" />
  </div>

  <div
    v-else
    :class="['onyx-component', 'onyx-timepicker-input', densityClass, errorClass]"
    v-bind="rootAttrs"
  >
    <OnyxFormElement
      v-bind="formElementProps"
      :label="props.label"
      :error-messages="errorMessages"
      :success-messages="successMessages"
      :message="messages"
    >
      <template #default="{ id: inputId }">
        <div class="onyx-timepicker-input__wrapper">
          <OnyxLoadingIndicator
            v-if="props.loading"
            class="onyx-timepicker-input__loading"
            type="circle"
          />
          <input
            :id="inputId"
            ref="inputRef"
            v-model="value"
            v-custom-validity
            type="time"
            class="onyx-timepicker-input__native"
            :class="{ 'onyx-timepicker-input__native--success': successMessages }"
            :required="props.required"
            :autofocus="props.autofocus"
            :name="props.name"
            :readonly="props.readonly"
            :disabled="disabled || props.loading"
            :aria-label="props.hideLabel ? props.label : undefined"
            :title="props.hideLabel ? props.label : undefined"
            :step="props.step"
            v-bind="restAttrs"
          />
          <slot name="icon"></slot>
        </div>
      </template>
    </OnyxFormElement>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";
@use "../../styles/mixins/input.scss";

.onyx-timepicker-input,
.onyx-timepicker-input-skeleton {
  @include layers.component() {
    --onyx-timepicker-padding-vertical: var(--onyx-density-xs);
  }
}

.onyx-timepicker-input-skeleton {
  @include layers.component() {
    @include input.define-skeleton-styles(
      $height: calc(1lh + 2 * var(--onyx-timepicker-padding-vertical))
    );
  }
}

.onyx-timepicker-input {
  @include layers.component() {
    @include input.define-shared-styles(
      $base-selector: ".onyx-timepicker-input",
      $vertical-padding: var(--onyx-timepicker-padding-vertical)
    );

    &__native {
      &::-webkit-calendar-picker-indicator {
        cursor: pointer;
      }
    }
  }
}
</style>
