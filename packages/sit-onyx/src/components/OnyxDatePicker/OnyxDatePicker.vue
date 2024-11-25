<script lang="ts" setup>
import { computed, ref, watchEffect, type ComponentInstance } from "vue";
import { SKELETON_INJECTED_SYMBOL } from "../../composables/useSkeletonState";
import { isValidDate } from "../../utils/time";
import { FORM_INJECTED_SYMBOL } from "../OnyxForm/OnyxForm.core";
import OnyxInput from "../OnyxInput/OnyxInput.vue";
import type { InputType } from "../OnyxInput/types";
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

const inputRef = ref<ComponentInstance<typeof OnyxInput>>();

const nativeHTMLType = computed(() => {
  const type = props.type === "datetime" ? "datetime-local" : props.type;
  // casting is intended here since the "InputType" type is restricted by the "OnyxInput"
  // component to only include types that make sense for text, but it is still passed through
  // to the native <input> element so we can also use date types here
  return type as InputType;
});

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
    return `${dateString}T${padStart(date.getHours())}:${padStart(date.getMinutes())}`;
  };
});

/**
 * Pad starts the given number with leading zeros if needed to make it 2 digits long.
 */
const padStart = (value: number) => value.toString().padStart(2, "0");

// sync additional props with native HTML input element
watchEffect(() => {
  if (!inputRef.value?.inputRef) return;
  inputRef.value.inputRef.min = getNormalizedDate.value(props.min) ?? "";
  inputRef.value.inputRef.max = getNormalizedDate.value(props.max) ?? "";
});

const handleValueChange = (inputValue: string) => {
  const newDate = new Date(inputValue);
  emit("update:modelValue", isValidDate(newDate) ? newDate.toISOString() : undefined);
};
</script>

<template>
  <!-- key is needed to keep current value when switching between date and datetime type -->
  <OnyxInput
    ref="inputRef"
    :key="props.type"
    class="onyx-datepicker"
    v-bind="props"
    :model-value="getNormalizedDate(props.modelValue)"
    :type="nativeHTMLType"
    @update:model-value="handleValueChange"
    @validity-change="emit('validityChange', $event)"
  />
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-datepicker {
  @include layers.component() {
    ::-webkit-calendar-picker-indicator {
      cursor: pointer;
    }
  }
}
</style>
