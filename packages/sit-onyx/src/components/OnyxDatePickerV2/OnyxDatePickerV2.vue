<script lang="ts">
/**
 * @experimental
 * @deprecated This component is still under active development and its API might change in patch releases.
 */
export default {};
</script>

<script lang="ts" setup generic="TSelection extends OnyxCalendarSelectionMode">
import { iconCalendar, iconXSmall } from "@sit-onyx/icons";
import { computed, useTemplateRef, type HTMLAttributes } from "vue";
import { useAutofocus } from "../../composables/useAutoFocus.js";
import { useFormElementError } from "../../composables/useFormElementError.js";
import { SKELETON_INJECTED_SYMBOL } from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import { mergeVueProps, useRootAttrs } from "../../utils/attrs.js";
import { isValidDate } from "../../utils/date.js";
import { useForwardProps } from "../../utils/props.js";
import OnyxCalendar from "../OnyxCalendar/OnyxCalendar.vue";
import type {
  DateRange,
  OnyxCalendarProps,
  OnyxCalendarSelectionMode,
  OnyxCalendarValueBySelection,
} from "../OnyxCalendar/types.js";
import type { DateValue } from "../OnyxDatePicker/types.js";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxFormElementAction from "../OnyxFormElementAction/OnyxFormElementAction.vue";
import OnyxFormElementV2 from "../OnyxFormElementV2/OnyxFormElementV2.vue";
import type {
  FormElementV2PopoverOptions,
  FormElementV2Tooltip,
} from "../OnyxFormElementV2/types.js";
import type { OnyxDatePickerV2Props } from "./types.js";

const props = withDefaults(defineProps<OnyxDatePickerV2Props<TSelection>>(), {
  modelValue: undefined,
  open: undefined,
  required: false,
  readonly: false,
  loading: false,
  disabled: FORM_INJECTED_SYMBOL,
  requiredMarker: FORM_INJECTED_SYMBOL,
  reserveMessageSpace: FORM_INJECTED_SYMBOL,
  showError: FORM_INJECTED_SYMBOL,
  skeleton: SKELETON_INJECTED_SYMBOL,
  showCalendarWeeks: false,
  weekStartDay: "Monday",
  disabledDays: undefined,
  selectionMode: () => "single" as TSelection,
});

const emit = defineEmits<{
  /**
   * Emitted when the validity state of the input changes.
   */
  validityChange: [validity: ValidityState];
  /**
   * Emitted when the current value changes.
   */
  "update:modelValue": [value?: OnyxCalendarValueBySelection<TSelection>];
  /**
   * Emitted when the viewed Month changes
   */
  "update:viewMonth": [newDate: Date];
  /**
   * Emitted when the popover open state changes
   */
  "update:open": [open: boolean];
}>();

const error = computed(() => props.error);
const { vCustomValidity, errorMessages } = useFormElementError({ props, emit, error });
const formElementV2Props = useForwardProps(props, OnyxFormElementV2);
defineOptions({ inheritAttrs: false });
const { rootAttrs, restAttrs } = useRootAttrs();
const { t, d } = injectI18n();

const formElementError = computed<FormElementV2Tooltip | undefined>(() => {
  if (!errorMessages.value || errorMessages.value.hidden) return;
  return {
    label: errorMessages.value.shortMessage,
    tooltipText: errorMessages.value.longMessage,
  };
});

const modelValue = useVModel({ props, emit, key: "modelValue" });
const viewMonth = useVModel({
  key: "viewMonth",
  props,
  emit,
  default: () => new Date(),
});

const popoverOpen = useVModel({ props, emit, key: "open", default: false });
const { disabled } = useFormContext(props);

const handleDateSelect = (date: OnyxCalendarValueBySelection<TSelection>) => {
  modelValue.value = date as typeof modelValue.value;

  if (
    props.selectionMode === "single" ||
    (props.selectionMode === "range" && "end" in date && date.end)
  ) {
    popoverOpen.value = false;
  }
};

const dateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};

const formattedDate = computed(() => {
  const value = modelValue.value;
  if (!value) return "";

  const toDate = (val: unknown) => {
    const date = new Date(val as DateValue);
    return isValidDate(date) ? date : null;
  };

  if (props.selectionMode === "single") {
    const date = toDate(value);
    return date ? d.value(date, dateOptions) : "";
  }

  if (props.selectionMode === "multiple" && Array.isArray(value)) {
    return value
      .map((v) => toDate(v))
      .filter((time): time is Date => time !== null)
      .map((time) => d.value(time, dateOptions))
      .join(", ");
  }

  if (props.selectionMode === "range" && typeof value === "object" && !Array.isArray(value)) {
    const rangeValue = value as Partial<DateRange>;
    const start = toDate(rangeValue.start);
    if (!start) return "";

    const startStr = d.value(start, dateOptions);
    const end = toDate(rangeValue.end);

    if (!end) return startStr;
    return `${startStr} - ${d.value(end, dateOptions)}`;
  }

  return "";
});

const calendarForwardProps = useForwardProps(props, OnyxCalendar);

const calendarProps = computed(() => {
  return {
    ...calendarForwardProps.value,
    viewMonth: undefined, // is handled via v-model separately
    class: [
      "onyx-date-picker-v2__calendar",
      { "onyx-date-picker-v2__calendar--multi-view": props.multiView },
    ],
    disabled: props.disabledDays,
    size: "small",
    "onUpdate:model-value": handleDateSelect,
  } satisfies Partial<OnyxCalendarProps<TSelection>> & HTMLAttributes;
});

const input = useTemplateRef("inputRef");
useAutofocus(input, props);

const popoverOptions = computed<FormElementV2PopoverOptions | undefined>(() => {
  const options: FormElementV2PopoverOptions = { label: t.value("datePicker.popoverLabel") };
  if (props.multiView) options.fitParent = false;
  if (disabled.value || props.readonly) options.disabled = true;
  return { ...options, ...props.popoverOptions };
});

const handleClearValue = () => {
  const selectionMode = props.selectionMode as OnyxCalendarSelectionMode;
  if (selectionMode === "multiple") {
    modelValue.value = [] as unknown as typeof modelValue.value;
  } else {
    modelValue.value = undefined;
  }
};

defineExpose({ input });
</script>

<template>
  <OnyxFormElementV2
    v-bind="mergeVueProps(rootAttrs, formElementV2Props)"
    v-model:open="popoverOpen"
    class="onyx-date-picker-v2"
    :label="props.label"
    :error="formElementError"
    :popover-options
  >
    <template #default="inputProps">
      <input
        v-bind="mergeVueProps(inputProps, restAttrs)"
        ref="inputRef"
        v-custom-validity
        :value="formattedDate"
        :disabled="disabled || props.loading"
        :readonly="props.readonly"
        :placeholder="props.placeholder"
        :autofocus="props.autofocus"
        :name="props.name"
        :required="props.required"
      />
    </template>

    <template #trailingIcons>
      <OnyxFormElementAction
        v-if="modelValue && !props.hideClearIcon"
        :label="t('input.clear')"
        :icon="iconXSmall"
        show-on-focus
        @click="handleClearValue"
      />

      <OnyxFormElementAction
        :label="t('select.toggleDropDown')"
        :icon="iconCalendar"
        :disabled="disabled || props.readonly || props.loading"
        highlighted="auto"
        @click="popoverOpen = !popoverOpen"
      />
    </template>

    <template #popover>
      <div class="onyx-date-picker-v2__calendar-wrapper">
        <OnyxCalendar v-bind="calendarProps" v-model:view-month="viewMonth" />
        <OnyxCalendar
          v-if="props.selectionMode === 'range' && props.multiView"
          v-bind="calendarProps"
        />
      </div>
    </template>
  </OnyxFormElementV2>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-date-picker-v2 {
  @include layers.component() {
    --onyx-date-picker-v2-calendar-border-radius: var(--onyx-radius-md);

    &__calendar-wrapper {
      display: flex;
      width: 100%;
    }

    &__calendar {
      --onyx-calendar-border-radius: 0 0 var(--onyx-date-picker-v2-calendar-border-radius)
        var(--onyx-date-picker-v2-calendar-border-radius);
      width: 100%;
      gap: 0;

      .onyx-calendar__header {
        padding: var(--onyx-density-xs);
      }

      &--multi-view {
        width: 18rem;

        &:first-child {
          --onyx-calendar-border-radius: 0 0 0 var(--onyx-date-picker-v2-calendar-border-radius);
        }

        &:last-child {
          --onyx-calendar-border-radius: 0 0 var(--onyx-date-picker-v2-calendar-border-radius) 0;
        }
      }
    }
  }
}
</style>
