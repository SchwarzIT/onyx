<script lang="ts" setup>
import calendar from "@sit-onyx/icons/calendar.svg?raw";
import { computed, ref } from "vue";
import { useDensity } from "../../composables/density";
import { getFormMessages, useCustomValidity } from "../../composables/useCustomValidity";
import { useErrorClass } from "../../composables/useErrorClass";
import { SKELETON_INJECTED_SYMBOL, useSkeletonContext } from "../../composables/useSkeletonState";
import { injectI18n } from "../../i18n";
import { isValidDate } from "../../utils/date";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core";
import OnyxFormElement from "../OnyxFormElement/OnyxFormElement.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { DateValue, OnyxDatePickerProps } from "./types";

const props = withDefaults(defineProps<OnyxDatePickerProps>(), {
  type: "date",
  required: false,
  readonly: false,
  loading: false,
  skeleton: SKELETON_INJECTED_SYMBOL,
  disabled: FORM_INJECTED_SYMBOL,
  showError: FORM_INJECTED_SYMBOL,
});

const emit = defineEmits<{
  /**
   * Emitted when the current value changes. Will be a ISO timestamp created by `new Date().toISOString()`.
   */
  "update:modelValue": [value?: string];
  /**
   * Emitted when the validity state of the input changes.
   */
  validityChange: [validity: ValidityState];
}>();

const { t } = injectI18n();
const { vCustomValidity, errorMessages } = useCustomValidity({ props, emit });
const successMessages = computed(() => getFormMessages(props.success));
const messages = computed(() => getFormMessages(props.message));
const { densityClass } = useDensity(props);
const { disabled, showError } = useFormContext(props);
const skeleton = useSkeletonContext(props);
const errorClass = useErrorClass(showError);

const inputRef = ref<HTMLInputElement>();

/**
 * Gets the normalized date based on the input type that can be passed to the native HTML `<input />`.
 * Will be checked to be a valid date.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#date_strings
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#local_date_and_time_strings
 */
const getNormalizedDate = computed(() => {
  return (value?: DateValue) => {
    const date = value != undefined ? new Date(value) : undefined;
    if (!isValidDate(date)) return;

    const dateString = date.toISOString().split("T")[0];
    if (props.type === "date") return dateString;

    // for datetime type, the hour must be in the users local timezone so just returning the string returned by `toISOString()` will be invalid
    // since the timezone offset is missing then
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${dateString}T${hours}:${minutes}`;
  };
});

const handleInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const newValue = input.valueAsDate;
  emit("update:modelValue", newValue?.toISOString());
};
</script>

<template>
  <div v-if="skeleton" :class="['onyx-datepicker-skeleton', densityClass]">
    <OnyxSkeleton v-if="!props.hideLabel" class="onyx-datepicker-skeleton__label" />
    <OnyxSkeleton class="onyx-datepicker-skeleton__input" />
  </div>

  <div v-else :class="['onyx-datepicker', densityClass, errorClass]">
    <OnyxFormElement
      v-bind="props"
      :error-messages="errorMessages"
      :success-messages="successMessages"
      :message="messages"
    >
      <template #default="{ id: inputId }">
        <div class="onyx-datepicker__wrapper">
          <OnyxLoadingIndicator
            v-if="props.loading"
            class="onyx-datepicker__loading"
            type="circle"
          />
          <!-- key is needed to keep current value when switching between date and datetime type -->
          <input
            :id="inputId"
            ref="inputRef"
            :key="props.type"
            v-custom-validity
            :value="getNormalizedDate(props.modelValue)"
            class="onyx-datepicker__native"
            :class="{ 'onyx-datepicker__native--success': successMessages }"
            :type="props.type"
            :required="props.required"
            :autofocus="props.autofocus"
            :name="props.name"
            :readonly="props.readonly"
            :disabled="disabled || props.loading"
            :aria-label="props.hideLabel ? props.label : undefined"
            :title="props.hideLabel ? props.label : undefined"
            @input="handleInput"
          />

          <button
            class="onyx-datepicker__button"
            type="button"
            :aria-label="t('datePicker.showPicker')"
            :title="t('datePicker.showPicker')"
            :disabled="disabled || props.readonly || props.loading"
            @click="inputRef?.showPicker"
          >
            <OnyxIcon :icon="calendar" />
          </button>
        </div>
      </template>
    </OnyxFormElement>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";
@use "../../styles/mixins/input.scss";
@use "../../styles/mixins/browsers.scss";

.onyx-datepicker,
.onyx-datepicker-skeleton {
  --onyx-datepicker-padding-vertical: var(--onyx-density-xs);
}

.onyx-datepicker-skeleton {
  @include input.define-skeleton-styles(
    $height: calc(1lh + 2 * var(--onyx-datepicker-padding-vertical))
  );
}

.onyx-datepicker {
  @include layers.component() {
    @include input.define-shared-styles(
      $base-selector: ".onyx-datepicker",
      $vertical-padding: var(--onyx-datepicker-padding-vertical)
    );

    // hide native browser calendar icon
    &__native {
      &::-webkit-calendar-picker-indicator {
        display: none;
      }
    }
  }
}

// for Firefox, there is currently no easy CSS property to hide the default
// calendar icon.
// As a workaround for now, we will create an ::after element that we are then placing
// over the native calendar icon to hide it
@include browsers.firefox() {
  .onyx-datepicker {
    &__wrapper {
      position: relative;

      &::after {
        $icon-size: 1.5rem;

        content: "";
        background-color: var(--background-color);
        display: block;
        height: 100%;
        width: $icon-size;
        position: absolute;
        top: 0;
        right: calc($icon-size + var(--gap) + var(--padding-inline));
      }
    }
  }
}
</style>
