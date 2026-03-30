<script lang="ts" setup>
import { computed, useTemplateRef, watch } from "vue";
import { injectI18n } from "../../i18n/index.js";
import type { Nullable } from "../../types/utils.js";
import { applyLimits } from "../../utils/numbers.js";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxStepper from "../OnyxStepper/OnyxStepper.vue";
import TimeSuffixToggle, { type ToggleOption } from "./TimeSuffixToggle.vue";
import type { OnyxTimePickerProps } from "./types.js";
import { createTimeString, parseTimeString, useAmPmValue } from "./utils.js";

export type Segment = "hours" | "minutes" | "seconds";

type TimePickerGroupProps = Pick<OnyxTimePickerProps, "showSeconds" | "showAmPm"> & {
  /**
   * Group headline.
   */
  headline: string;
  /**
   * Current value.
   */
  modelValue?: string;
  /**
   * Which segment is currently focused.
   */
  focusedSegment?: Segment;
};

const props = defineProps<TimePickerGroupProps>();

const emit = defineEmits<{
  /**
   * Emitted when the current value changes.
   */
  "update:modelValue": [value?: string];
  /**
   * Emitted when the another segment should be focused.
   */
  jumpSegmentFocus: [direction: "next" | "previous"];
  /**
   * Emitted when the currently focused segment changes.
   */
  "update:focusedSegment": [segment: Segment];
}>();

const { t } = injectI18n();

const value = computed({
  get: () => {
    if (!props.modelValue) return {};
    const { hours, minutes, seconds } = parseTimeString(props.showSeconds, props.modelValue);
    const displayHours = props.showAmPm ? hours % 12 || 12 : hours;
    return { hours: displayHours, minutes: minutes, seconds: seconds };
  },
  set: (newValue) => {
    const newTime = createTimeString(
      newValue.hours ?? 0,
      newValue.minutes ?? 0,
      newValue.seconds ?? 0,
      props.showSeconds,
    );
    emit("update:modelValue", newTime);
  },
});

const handleInput = (segment: keyof typeof value.value, segmentValue?: Nullable<number>) => {
  const min = 0;
  const max = segment === "hours" ? 23 : 59;
  const newValue = applyLimits(segmentValue || 0, min, max);

  value.value = { ...value.value, [segment]: newValue };

  // Jump immediately if the first digit is greater than the max possible first digit
  // e.g. for hours, if the user types "3", it can only be "03", so we can jump.
  const maxFirstDigit = segment === "hours" ? (props.showAmPm ? 1 : 2) : 5;

  if (newValue && (newValue >= 10 || newValue > maxFirstDigit)) {
    emit("jumpSegmentFocus", "next");
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  const key = event.key;
  if (["ArrowRight", "Enter"].includes(key)) {
    emit("jumpSegmentFocus", "next");
  }
  if (key === "ArrowLeft") {
    emit("jumpSegmentFocus", "previous");
  }
};

const formatNumber = (value?: number) => {
  if (value == undefined) return "";
  return value.toString().padStart(2, "0");
};

const amPmOptions = computed<[ToggleOption, ToggleOption]>(() => {
  return [
    { label: t.value("timePicker.labels.am"), value: "am" },
    { label: t.value("timePicker.labels.pm"), value: "pm" },
  ];
});

const hours = useTemplateRef("hours");
const minutes = useTemplateRef("minutes");
const seconds = useTemplateRef("seconds");

watch(
  () => props.focusedSegment,
  (segment) => {
    if (segment === "hours") hours.value?.input?.focus();
    if (segment === "minutes") minutes.value?.input?.focus();
    if (segment === "seconds") seconds.value?.input?.focus();
  },
);

const { timeSuffix } = useAmPmValue(
  computed({
    get: () => props.modelValue,
    set: (newValue) => emit("update:modelValue", newValue),
  }),
  computed(() => props.showSeconds),
);
</script>

<template>
  <!-- eslint-disable-next-line sitOnyx/require-root-class -- only a support component -->
  <div class="onyx-time-picker__group">
    <OnyxHeadline is="h3">{{ props.headline }}</OnyxHeadline>

    <div class="onyx-time-picker__segments">
      <OnyxStepper
        ref="hours"
        :model-value="value.hours"
        :label="t('timePicker.labels.hour')"
        :placeholder="t('timePicker.placeholder.hour')"
        :autofocus="props.focusedSegment === 'hours'"
        :format-number
        hide-label
        hide-buttons
        @update:model-value="handleInput('hours', $event)"
        @input="handleInput('hours', $event.target?.valueAsNumber)"
        @keydown="handleKeydown"
        @focus="emit('update:focusedSegment', 'hours')"
      />

      <span class="onyx-time-picker__segment-separator">:</span>

      <OnyxStepper
        ref="minutes"
        :model-value="value.minutes"
        :label="t('timePicker.labels.minute')"
        :placeholder="t('timePicker.placeholder.minute')"
        :format-number
        hide-label
        hide-buttons
        @update:model-value="handleInput('minutes', $event)"
        @input="handleInput('minutes', $event.target?.valueAsNumber)"
        @keydown="handleKeydown"
        @focus="emit('update:focusedSegment', 'minutes')"
      />

      <template v-if="props.showSeconds">
        <span class="onyx-time-picker__segment-separator">:</span>

        <OnyxStepper
          ref="seconds"
          :model-value="value.seconds"
          :label="t('timePicker.labels.second')"
          :placeholder="t('timePicker.placeholder.second')"
          :format-number
          hide-label
          hide-buttons
          @update:model-value="handleInput('seconds', $event)"
          @input="handleInput('seconds', $event.target?.valueAsNumber)"
          @keydown="handleKeydown"
          @focus="emit('update:focusedSegment', 'seconds')"
        />
      </template>

      <TimeSuffixToggle v-if="props.showAmPm" v-model="timeSuffix" :options="amPmOptions" />
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-time-picker {
  @include layers.component() {
    &__group {
      display: flex;
      flex-direction: column;
      gap: var(--onyx-density-xs);
    }

    &__segments {
      width: 100%;
      display: flex;
      gap: var(--onyx-density-xs);
      align-items: center;
    }

    &__segment-separator {
      font-size: var(--onyx-font-size-xl);
      pointer-events: none;
      -webkit-user-select: none;
      user-select: none;
    }
  }
}
</style>
