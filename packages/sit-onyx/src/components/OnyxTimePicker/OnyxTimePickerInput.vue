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
import type { OnyxTimePickerProps, TimePickerType } from "./types.js";

const props = withDefaults(
  defineProps<
    OnyxTimePickerProps<TimePickerType> & {
      /**
       * Defines the granularity of the time input in seconds.
       */
      step?: number;
      /**
       * Placeholder for the input
       */
      placeholder?: string;
    }
  >(),
  {
    required: false,
    readonly: false,
    loading: false,
    skeleton: SKELETON_INJECTED_SYMBOL,
    disabled: FORM_INJECTED_SYMBOL,
    showError: FORM_INJECTED_SYMBOL,
    requiredMarker: FORM_INJECTED_SYMBOL,
    reserveMessageSpace: FORM_INJECTED_SYMBOL,
    step: 0,
    placeholder: "",
  },
);

const emit = defineEmits<{
  /**
   * Dependent on `type` the string is:
   * - "HH:MM:SS"
   */
  "update:modelValue": [value?: string];
  /**
   * Emitted when the input changes focus.
   */
  "update:isFocused": [focused: boolean];
  /**
   * Emitted when the input is clicked or focused and enter is pressed.
   */
  toggleOpen: [event: MouseEvent | KeyboardEvent];
  /**
   * Emitted when the validity state of the input changes.
   */
  validityChange: [validity: ValidityState];
}>();

defineOptions({ inheritAttrs: false });
const { rootAttrs, restAttrs } = useRootAttrs();
const error = computed(() => props.error);

const { vCustomValidity, errorMessages } = useFormElementError({
  props,
  emit,
  error,
});
const successMessages = computed(() => getFormMessages(props.success));
const messages = computed(() => getFormMessages(props.message));
const { densityClass } = useDensity(props);
//TODO: Question: Why is it not working for showError = touched
const { disabled, showError } = useFormContext(props);
const skeleton = useSkeletonContext(props);
const errorClass = useErrorClass(computed(() => (props.type === "range" ? true : showError.value)));
const formElementProps = useForwardProps(props, OnyxFormElement);
/**
 * Ensures that the native input only receives "HH:MM" or "HH:MM:SS".
 */
const sanitizeForNativeInput = (val: string | undefined): string => {
  if (typeof val !== "string") return "";
  if (props.showSeconds) {
    const match = val.match(/^\d{2}:\d{2}(?::\d{2})?/);
    return match ? match[0] : "";
  }

  const match = val.match(/^\d{2}:\d{2}/);
  return match ? match[0] : "";
};

const modelValue = useVModel({
  props,
  emit,
  key: "modelValue",
});

const value = computed({
  get: () => {
    if (props.type !== "range" || !modelValue.value)
      return sanitizeForNativeInput(modelValue.value);
    return modelValue.value.replace("-", " - ");
  },
  set: (newValue) => {
    modelValue.value = String(newValue);
  },
});
const sanitizedMin = computed(() => sanitizeForNativeInput(props.min));
const sanitizedMax = computed(() => sanitizeForNativeInput(props.max));
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
    :class="['onyx-component', 'onyx-time-picker-input-skeleton', densityClass]"
    v-bind="rootAttrs"
  >
    <OnyxSkeleton v-if="!props.hideLabel" class="onyx-time-picker-input-skeleton__label" />
    <OnyxSkeleton class="onyx-time-picker-input-skeleton__input" />
  </div>

  <div
    v-else
    :class="['onyx-component', 'onyx-time-picker-input', densityClass, errorClass]"
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
        <div class="onyx-time-picker-input__wrapper">
          <OnyxLoadingIndicator
            v-if="props.loading"
            class="onyx-time-picker-input__loading"
            type="circle"
          />
          <input
            :id="inputId"
            ref="inputRef"
            v-model="value"
            v-custom-validity
            :type="props.type === 'range' ? 'text' : 'time'"
            class="onyx-time-picker-input__native"
            :class="{
              'onyx-time-picker-input__native--success': successMessages,
              'onyx-time-picker-input__native--readonly': props.readonly,
            }"
            :placeholder="props.placeholder"
            :required="props.required"
            :autofocus="props.autofocus"
            :name="props.name"
            :readonly="props.readonly"
            :disabled="disabled || props.loading"
            :aria-label="props.hideLabel ? props.label : undefined"
            :title="props.hideLabel ? props.label : undefined"
            :step="props.step"
            v-bind="restAttrs"
            :max="sanitizedMax"
            :min="sanitizedMin"
            @keydown.space.prevent
            @focus="emit('update:isFocused', true)"
            @blur="emit('update:isFocused', false)"
            @click="emit('toggleOpen', $event)"
            @paste="(e) => props.type === 'range' && e.preventDefault()"
            @keydown="
              (e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  emit('toggleOpen', e);
                  return;
                }

                const isNavigation = ['Tab', 'Escape', 'ArrowDown', 'ArrowUp'].includes(e.key);
                if (props.type === 'range' && !isNavigation) {
                  e.preventDefault();
                }
              }
            "
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

.onyx-time-picker-input,
.onyx-time-picker-input-skeleton {
  @include layers.component() {
    --onyx-time-picker-padding-vertical: var(--onyx-density-xs);
  }
}

.onyx-time-picker-input-skeleton {
  @include layers.component() {
    @include input.define-skeleton-styles(
      $height: calc(1lh + 2 * var(--onyx-time-picker-padding-vertical))
    );
  }
}

.onyx-time-picker-input {
  @include layers.component() {
    @include input.define-shared-styles(
      $base-selector: ".onyx-time-picker-input",
      $vertical-padding: var(--onyx-time-picker-padding-vertical)
    );

    &__native {
      &::-webkit-calendar-picker-indicator {
        cursor: pointer;
      }
      &[type="text"] {
        cursor: pointer;
        user-select: none;
        caret-color: transparent;

        &:focus {
          caret-color: transparent;
        }
      }
    }
  }
}
</style>
