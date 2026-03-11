<script lang="ts" setup generic="TSelection extends OnyxCalendarSelectionMode = 'single'">
import { iconCalendar } from "@sit-onyx/icons";
import { computed, useTemplateRef } from "vue";
import { useAutofocus } from "../../composables/useAutoFocus.js";
import { SKELETON_INJECTED_SYMBOL } from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import { mergeVueProps, useRootAttrs } from "../../utils/attrs.js";
import { isValidDate } from "../../utils/date.js";
import { useForwardProps } from "../../utils/props.js";
import OnyxCalendar from "../OnyxCalendar/OnyxCalendar.vue";
import type {
  OnyxCalendarSelectionMode,
  OnyxCalendarValueBySelection,
} from "../OnyxCalendar/types.js";
import type { DateValue } from "../OnyxDatePicker/types.js";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxFormElementV2 from "../OnyxFormElementV2/OnyxFormElementV2.vue";
import type { FormElementV2PopoverOptions } from "../OnyxFormElementV2/types.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
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
  selectionMode: () => "single" as TSelection,
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

const popoverOptions = computed<FormElementV2PopoverOptions | undefined>(() => {
  if (props.multiView) return { fitParent: false, ...props.popoverOptions };
  return props.popoverOptions;
});
</script>

<template>
  <OnyxFormElementV2
    v-bind="mergeVueProps(rootAttrs, formElementProps)"
    v-model:open="popoverOpen"
    class="onyx-date-picker-v2"
    :label="props.label"
    :popover-options
  >
    <template #default="inputProps">
      <input
        v-bind="mergeVueProps(inputProps, restAttrs)"
        ref="inputRef"
        :disabled="disabled || props.loading"
        class="onyx-date-picker-v2__native-input onyx-truncation-ellipsis"
        :value="formattedDate"
      />
    </template>

    <template #trailingIcons>
      <OnyxIcon :icon="iconCalendar" />
    </template>

    <template #popover>
      <div class="onyx-date-picker-v2__calendar-wrapper">
        <OnyxCalendar
          :class="{ 'onyx-date-picker-v2--multi-view': props.multiView }"
          v-bind="calendarProps"
          :disabled="false"
          size="small"
          :selection-mode="props.selectionMode"
          @update:model-value="handleDateSelect"
        />
        <OnyxCalendar
          v-if="props.selectionMode === 'range' && props.multiView"
          class="onyx-date-picker-v2--multi-view"
          v-bind="calendarProps"
          :disabled="false"
          size="small"
          :selection-mode="props.selectionMode"
          @update:model-value="handleDateSelect"
        />
      </div>
    </template>
  </OnyxFormElementV2>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-date-picker-v2 {
  @include layers.component() {
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

    :has(.onyx-date-picker-v2__range-input-wrapper) .onyx-calendar,
    .onyx-date-picker-v2--multi-view .onyx-calendar {
      &__body table,
      &__picker-grid {
        border-radius: 0;
      }
    }
  }
}
</style>
