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

const slots = defineSlots<{
  bottomBar(): unknown;
}>();

defineOptions({ inheritAttrs: false });
const { rootAttrs, restAttrs } = useRootAttrs();
const { d } = injectI18n();

const modelValue = useVModel({ props, emit, key: "modelValue" });
const popoverOpen = useVModel({ props, emit, key: "open" });

const handleDateSelect = (date: OnyxCalendarValueBySelection<TSelection>) => {
  modelValue.value = date as typeof modelValue.value;

  if (props.selectionMode === "single") {
    popoverOpen.value = false;
  }
};

const dateOption: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
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

    return date ? d.value(date, dateOption) : "";
  }

  if (props.selectionMode === "multiple" && Array.isArray(value)) {
    return value
      .map((v) => toDate(v))
      .filter((time): time is Date => time !== null)
      .map((time) => d.value(time, dateOption))
      .join(", ");
  }

  if (props.selectionMode === "range" && typeof value === "object" && !Array.isArray(value)) {
    const rangeValue = value as { start?: unknown; end?: unknown };
    const start = toDate(rangeValue.start);
    if (!start) return "";

    const startStr = d.value(start, dateOption);
    const end = toDate(rangeValue.end);

    if (!end) return startStr;
    return `${startStr} - ${d.value(end, dateOption)}`;
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
        fitParent: props.fitParent,
        alignment: props.alignment,
        position: props.position,
        sticky: props.sticky,
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

  :has(.onyx-datepicker-v2__bottom-bar) .onyx-calendar,
  :has(.onyx-datepicker-v2__range-input-wrapper) .onyx-calendar,
  .onyx-calendar--multi-view .onyx-calendar {
    &__body table,
    &__picker-grid {
      border-radius: 0;
    }
  }
}
</style>
