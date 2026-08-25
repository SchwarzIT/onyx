<script lang="ts">
/**
 * @deprecated Use the new `OnyxDatePickerV2` component which will replace the `OnyxDatePicker` in
 *   onyx version 2.
 */
export default {};
</script>

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
import { dateToISOString, type DateValue } from "../../utils/date.js";
import { useForwardProps } from "../../utils/props.js";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxFormElement from "../OnyxFormElement/OnyxFormElement.vue";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxDatePickerProps } from "./types.js";

const props = withDefaults(defineProps<OnyxDatePickerProps>(), {
  type: "date",
  required: false,
  readonly: false,
  loading: false,
  skeleton: SKELETON_INJECTED_SYMBOL,
  disabled: FORM_INJECTED_SYMBOL,
  showError: FORM_INJECTED_SYMBOL,
  requiredMarker: FORM_INJECTED_SYMBOL,
  reserveMessageSpace: FORM_INJECTED_SYMBOL,
});

const emit = defineEmits<{
  /**
   * Emitted when the current value changes. Is a date string based on
   * [ISO8601](https://en.wikipedia.org/wiki/ISO_8601).
   *
   * Dependent on `type` the string is either:
   *
   * - "date": date only string based, e.g. `"2011-10-31"`
   * - "datetime-local": Full datetime string in UTC timezone, `e.g. "2011-10-31T00:00:00.000Z"`
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
 * Gets the normalized date based on the input type that can be passed to the native HTML `<input
 * />`. Will be checked to be a valid date.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#date_strings
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#local_date_and_time_strings
 */
const getNormalizedDate = computed(() => {
  return (value?: DateValue | null) => {
    const date = value != undefined && value != null ? new Date(value) : undefined;
    return dateToISOString(date, props.type);
  };
});

/**
 * Whether the raw value coming from the native date input still has an incomplete (mid-typing)
 * year.
 *
 * A native `<input type="date|datetime-local">` fires an `input` event on *every* segment change
 * as soon as the entered segments form a *valid* date. While the user types the year digit by
 * digit (e.g. "2" → "20" → "202" → "2026"), the field briefly holds valid dates with a 1–3 digit
 * year. The setter below fed each of those through `dateToISOString`, which zero-pads the year and
 * wrote the result straight back into the input via `v-model`, overwriting the segment the user
 * was typing (the year "danced" 0002 → 0020 → 0202 → …). This made date entry unusable, most
 * visibly in locales the browser renders as `dd/mm/yyyy` (e.g. es-ES).
 *
 * The native input serialises its value as `YYYY-MM-DD` and ZERO-PADS the year while typing, so
 * the raw string is "0002-06-15", "0020-06-15", … — i.e. the year part is always 4 chars. We
 * therefore compare the NUMERIC year (< 1000), not the string length. A complete date, a value
 * picked from the calendar popup, or clearing the field all pass through unchanged.
 */
const hasIncompleteYear = (raw: string): boolean => {
  const yearPart = raw.split("-")[0];
  return /^\d+$/.test(yearPart) && Number(yearPart) < 1000;
};

/**
 * Current value (with getter and setter) that can be used as "v-model" for the native input.
 */
const modelValue = useVModel({
  props,
  emit,
  key: "modelValue",
});
const value = computed({
  get: () => getNormalizedDate.value(modelValue.value),
  set: (value) => {
    // Ignore intermediate values while the year is still being typed. Because `modelValue` stays
    // unchanged, the getter keeps returning the previous string and Vue performs no DOM writeback,
    // so the native input keeps the user's in-progress input untouched.
    if (value != null && value !== "" && hasIncompleteYear(value)) {
      return;
    }
    const newDate = new Date(value ?? "");
    // If the type is `datetime-local`, we always use UTC as a timezone to minimize edge-cases for our users.
    modelValue.value = dateToISOString(newDate, props.type === "date" ? "date" : "datetime-utc");
  },
});

const input = useTemplateRef("input");
defineExpose({ input });
useAutofocus(input, props);
</script>

<template>
  <div
    v-if="skeleton"
    :class="['onyx-component', 'onyx-datepicker-skeleton', densityClass]"
    v-bind="rootAttrs"
  >
    <OnyxSkeleton v-if="!props.hideLabel" class="onyx-datepicker-skeleton__label" />
    <OnyxSkeleton class="onyx-datepicker-skeleton__input" />
  </div>

  <div
    v-else
    :class="['onyx-component', 'onyx-datepicker', densityClass, errorClass]"
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
        <div class="onyx-datepicker__wrapper">
          <OnyxLoadingIndicator
            v-if="props.loading"
            class="onyx-datepicker__loading"
            type="circle"
          />
          <!-- key is needed to keep current value when switching between date and datetime type -->
          <input
            :id="inputId"
            :key="props.type"
            ref="input"
            v-model="value"
            v-custom-validity
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
            :min="getNormalizedDate(props.min)"
            :max="getNormalizedDate(props.max)"
            v-bind="restAttrs"
          />
        </div>
      </template>
    </OnyxFormElement>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";
@use "../../styles/mixins/input.scss";

.onyx-datepicker,
.onyx-datepicker-skeleton {
  @include layers.component() {
    --onyx-datepicker-padding-vertical: var(--onyx-density-xs);
  }
}

.onyx-datepicker-skeleton {
  @include layers.component() {
    @include input.define-skeleton-styles(
      $height: calc(1lh + 2 * var(--onyx-datepicker-padding-vertical))
    );
  }
}

.onyx-datepicker {
  @include layers.component() {
    @include input.define-shared-styles(
      $base-selector: ".onyx-datepicker",
      $vertical-padding: var(--onyx-datepicker-padding-vertical)
    );

    &__native {
      &::-webkit-calendar-picker-indicator {
        cursor: pointer;
      }
    }
  }
}
</style>
