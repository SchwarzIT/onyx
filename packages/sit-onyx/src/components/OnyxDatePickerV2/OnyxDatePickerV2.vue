<script lang="ts" setup generic="TSelection extends OnyxCalendarSelectionMode = 'single'">
import { iconCalendar } from "@sit-onyx/icons";
import { computed, useTemplateRef } from "vue";
import { useAutofocus } from "../../composables/useAutoFocus.js";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import { mergeVueProps, useRootAttrs } from "../../utils/attrs.js";
import { useForwardProps } from "../../utils/props.js";
import OnyxCalendar from "../OnyxCalendar/OnyxCalendar.vue";

import { isValidDate } from "../../utils/date.js";
import type {
  OnyxCalendarSelectionMode,
  OnyxCalendarValueBySelection,
} from "../OnyxCalendar/types.js";
import type { DateValue } from "../OnyxDatePicker/types.js";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxFormElementV2 from "../OnyxFormElementV2/OnyxFormElementV2.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import type { OnyxDatePickerV2Props } from "./types.js";

const props = withDefaults(defineProps<OnyxDatePickerV2Props<TSelection>>(), {
  modelValue: undefined,
  open: undefined,
  required: false,
  readonly: false,
  loading: false,
  disabled: FORM_INJECTED_SYMBOL,
  skeleton: false,
  showCalendarWeeks: false,
  weekStartDay: "Monday",
  selectionMode: () => "single" as TSelection,
  fitParent: true,
});
const emit = defineEmits<{
  /**
   * Emitted when the current value changes.
   */
  "update:modelValue": [value?: OnyxCalendarValueBySelection<TSelection>];
  /**
   * Emitted when the popover open state changes
   */
  "update:open": [open: boolean];
}>();

defineOptions({ inheritAttrs: false });
const { disabled } = useFormContext(props);
const { rootAttrs, restAttrs } = useRootAttrs();
const { d } = injectI18n();

const modelValue = useVModel({ props, emit, key: "modelValue" });
const popoverOpen = useVModel({ props, emit, key: "open", default: false });

const handleDateSelect = (date: OnyxCalendarValueBySelection<TSelection>) => {
  modelValue.value = date as typeof modelValue.value;

  if (props.selectionMode === "single") {
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
    const rangeValue = value as { start?: unknown; end?: unknown };
    const start = toDate(rangeValue.start);
    if (!start) return "";

    const startStr = d.value(start, dateOptions);
    const end = toDate(rangeValue.end);

    if (!end) return startStr;
    return `${startStr} - ${d.value(end, dateOptions)}`;
  }

  return "";
});

const formElementProps = useForwardProps(props, OnyxFormElementV2);
const calendarProps = useForwardProps(props, OnyxCalendar);

const input = useTemplateRef("inputRef");
defineExpose({ input });
useAutofocus(input, props);
</script>

<template>
  <div class="onyx-component onyx-datepicker-v2" v-bind="rootAttrs">
    <OnyxFormElementV2
      v-bind="formElementProps"
      :label="props.label"
      :popover-options="{
        open: popoverOpen,
        fitParent: props.fitParent,
        alignment: props.alignment,
        position: props.position,
      }"
      @update:open="popoverOpen = $event"
    >
      <template #leadingIcons>
        <OnyxLoadingIndicator
          v-if="props.loading"
          class="onyx-datepicker-v2__loading"
          type="circle"
        />
      </template>
      <template #default="inputProps">
        <input
          v-bind="mergeVueProps(inputProps, restAttrs)"
          ref="inputRef"
          :disabled="disabled || props.loading"
          class="onyx-datepicker-v2__native-input onyx-truncation-ellipsis"
          :value="formattedDate"
        />
      </template>
      <template #trailingIcons>
        <OnyxIcon :icon="iconCalendar" />
      </template>
      <template #popover>
        <div class="onyx-datepicker-v2__calendar-wrapper">
          <OnyxCalendar
            :class="{ 'onyx-datepicker-v2--multi-view': props.multiView }"
            v-bind="calendarProps"
            :disabled="false"
            size="small"
            :selection-mode="props.selectionMode"
            @update:model-value="handleDateSelect"
          />
          <OnyxCalendar
            v-if="props.selectionMode === 'range' && props.multiView"
            class="onyx-datepicker-v2--multi-view"
            v-bind="calendarProps"
            :disabled="false"
            size="small"
            :selection-mode="props.selectionMode"
            @update:model-value="handleDateSelect"
          />
        </div>
      </template>
    </OnyxFormElementV2>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-datepicker-v2 {
  @include layers.component() {
    &__loading {
      color: var(--onyx-color-text-icons-primary-intense);
    }
  }
  &__calendar-wrapper {
    display: flex;
    width: 100%;
  }

  .onyx-basic-popover__dialog {
    max-width: initial;
  }
  .onyx-calendar {
    width: 100%;
    gap: 0;
    &__body table,
    &__picker-grid {
      border-radius: 0 0 var(--onyx-radius-md) var(--onyx-radius-md);
    }
    &__header {
      padding: var(--onyx-density-xs);
    }
  }
  &--multi-view.onyx-calendar {
    width: 18rem;
  }
  &:has(.onyx-basic-popover__dialog:popover-open) .onyx-form-element-v2__icons--trailing {
    color: var(--onyx-form-element-v2-border-color-focus);
  }

  :has(.onyx-datepicker-v2__range-input-wrapper) .onyx-calendar,
  .onyx-datepicker-v2--multi-view .onyx-calendar {
    &__body table,
    &__picker-grid {
      border-radius: 0;
    }
  }
}
</style>
