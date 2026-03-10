<script lang="ts" setup generic="TSelection extends OnyxCalendarSelectionMode = 'single'">
import { iconCalendar } from "@sit-onyx/icons";
import { computed, useTemplateRef } from "vue";
import { useAutofocus } from "../../composables/useAutoFocus.js";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import { useRootAttrs } from "../../utils/attrs.js";
import { useForwardProps } from "../../utils/props.js";
import OnyxCalendar from "../OnyxCalendar/OnyxCalendar.vue";

import type {
  DateRange,
  OnyxCalendarSelectionMode,
  OnyxCalendarValueBySelection,
} from "../OnyxCalendar/types.js";
import OnyxFormElementV2 from "../OnyxFormElementV2/OnyxFormElementV2.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import type { OnyxDatePickerV2Props } from "./types.js";

const props = withDefaults(defineProps<OnyxDatePickerV2Props<TSelection>>(), {
  modelValue: undefined,
  required: false,
  readonly: false,
  loading: false,
  disabled: false,
  skeleton: false,
  showCalendarWeeks: false,
  weekStartDay: "Monday",
  selectionMode: "single" as TSelection,
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

const slots = defineSlots<{
  bottomBar(): unknown;
}>();

defineOptions({ inheritAttrs: false });
const { rootAttrs, restAttrs } = useRootAttrs();
const { locale } = injectI18n();

const modelValue = useVModel({ props, emit, key: "modelValue" });
const popoverOpen = useVModel({ props, emit, key: "open" });

const handleDateSelect = (date: OnyxCalendarValueBySelection<TSelection>) => {
  modelValue.value = date as typeof modelValue.value;

  if (props.selectionMode === "single") {
    popoverOpen.value = false;
  }
};

const formatToISODate = (val: unknown) => {
  if (!val) return "";
  const d = val instanceof Date ? val : new Date(val as string);
  if (Number.isNaN(d.getTime())) return "";

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const handleManualInput = (type: "start" | "end", e: Event) => {
  const target = e.target as HTMLInputElement;
  const newVal = target?.value;

  if (!newVal) return;
  const date = new Date(newVal);
  if (Number.isNaN(date.getTime())) return;

  const currentValue = modelValue.value as DateRange | undefined;

  let nextValue: DateRange;

  if (!currentValue || typeof currentValue !== "object" || Array.isArray(currentValue)) {
    nextValue = { start: date, end: date };
  } else {
    nextValue = {
      ...currentValue,
      [type]: date,
    };
  }

  modelValue.value = nextValue as unknown as typeof modelValue.value;
};

const dateOption: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
};

const formattedDate = computed(() => {
  const value = modelValue.value;
  if (!value) return "";

  const toDate = (val: unknown) => {
    if (val instanceof Date) return val;
    if (typeof val === "string" || typeof val === "number") {
      const date = new Date(val);
      return Number.isNaN(date.getTime()) ? null : date;
    }
    return null;
  };

  if (props.selectionMode === "single") {
    const date = toDate(value);
    return date ? date.toLocaleDateString(locale.value, dateOption) : "";
  }

  if (props.selectionMode === "multiple" && Array.isArray(value)) {
    return value
      .map((v) => toDate(v))
      .filter((d): d is Date => d !== null)
      .map((d) => d.toLocaleDateString(locale.value, dateOption))
      .join(", ");
  }

  if (props.selectionMode === "range" && typeof value === "object" && !Array.isArray(value)) {
    const rangeValue = value as { start?: unknown; end?: unknown };
    const start = toDate(rangeValue.start);
    if (!start) return "";

    const startStr = start.toLocaleDateString(locale.value, dateOption);
    const end = toDate(rangeValue.end);

    if (!end) return startStr;
    return `${startStr} - ${end.toLocaleDateString(locale.value, dateOption)}`;
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
      :popover-config="{
        open: popoverOpen,
        keepFocusEffect: true,
        closeOnOutsideClick: true,
        fitParent: !props.multiView,
      }"
      @update:popover-open="popoverOpen = $event"
    >
      <template #default="inputProps">
        <div class="onyx-datepicker-v2__wrapper">
          <OnyxLoadingIndicator
            v-if="props.loading"
            class="onyx-datepicker-v2__loading"
            type="circle"
          />
          <input
            v-bind="{ ...inputProps, ...restAttrs }"
            ref="inputRef"
            class="onyx-datepicker-v2__native-input"
            :value="formattedDate"
          />
        </div>
      </template>
      <template #trailingIcons>
        <OnyxIcon :icon="iconCalendar" />
      </template>
      <template #popover>
        <div class="onyx-datepicker-v2__calendar-wrapper">
          <OnyxCalendar
            :class="{ 'onyx-calendar--multi-view': props.multiView }"
            v-bind="calendarProps"
            size="small"
            :model-value="modelValue"
            :selection-mode="props.selectionMode"
            @update:model-value="handleDateSelect as any"
          />
          <OnyxCalendar
            v-if="props.selectionMode === 'range' && props.multiView"
            :class="{ 'onyx-calendar--multi-view': props.multiView }"
            v-bind="calendarProps"
            size="small"
            :model-value="modelValue as any"
            :selection-mode="props.selectionMode"
            @update:model-value="handleDateSelect as any"
          />
        </div>

        <div
          v-if="props.selectionMode === 'range' && props.showInputFields"
          class="onyx-datepicker-v2__range-input-wrapper"
        >
          <OnyxFormElementV2 :label="{ label: 'start', hidden: true }">
            <template #default="inputProps">
              <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
              <input
                v-bind="{ ...inputProps }"
                type="date"
                :value="formatToISODate((modelValue as any)?.start)"
                @change="(e) => handleManualInput('start', e)"
              />
            </template>
          </OnyxFormElementV2>
          <OnyxFormElementV2 :label="{ label: 'end', hidden: true }">
            <template #default="inputProps">
              <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
              <input
                v-bind="{ ...inputProps }"
                type="date"
                :value="formatToISODate((modelValue as any)?.end)"
                @change="(e) => handleManualInput('end', e)"
              />
            </template>
          </OnyxFormElementV2>
        </div>

        <div v-if="slots.bottomBar" class="onyx-datepicker-v2__bottom-bar">
          <slot name="bottomBar"></slot>
        </div>
      </template>
    </OnyxFormElementV2>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-datepicker-v2 {
  @include layers.component() {
    &__wrapper {
      position: relative;
      width: 100%;
    }

    &__loading {
      position: absolute;
      top: 50%;
      right: var(--onyx-density-sm);
      transform: translateY(-50%);
    }
  }
  &__bottom-bar {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    gap: var(--onyx-density-xs);
    padding: var(--onyx-density-xs) var(--onyx-density-xl);
  }

  &__calendar-wrapper {
    display: flex;
    width: 100%;
  }
  &__native-input {
    cursor: pointer;
    caret-color: transparent;
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
    &--multi-view {
      width: 18rem;
    }
  }
  .onyx-form-element-v2__input-container--show-focus .onyx-form-element-v2__icons--trailing {
    color: var(--onyx-form-element-v2-border-color-focus);
  }

  &__range-input-wrapper {
    width: 100%;

    padding: var(--onyx-density-md);
    display: flex;
    gap: var(--onyx-density-lg);
    input[type="date"]::-webkit-calendar-picker-indicator {
      display: none;
      -webkit-appearance: none;
    }
  }
  :has(.onyx-datepicker-v2__bottom-bar) .onyx-calendar,
  :has(.onyx-datepicker-v2__range-input-wrapper) .onyx-calendar {
    &__body table,
    &__picker-grid {
      border-radius: 0;
    }
  }
}
</style>
