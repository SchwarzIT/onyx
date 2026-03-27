<script lang="ts" setup>
import { computed, useTemplateRef, watch } from "vue";
import { injectI18n } from "../../i18n/index.js";
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
}>();

const { t } = injectI18n();

const value = computed({
  get: () => {
    if (!props.modelValue) return {};
    const { hours, minutes, seconds } = parseTimeString(props.showSeconds, props.modelValue);
    const displayHours = props.showAmPm ? hours % 12 || 12 : hours;

    // prevent showing "00" everywhere when the segments are empty
    return {
      hours: displayHours || undefined,
      minutes: minutes || undefined,
      seconds: seconds || undefined,
    };
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

const handleInput = (segment: keyof typeof value.value, event: InputEvent) => {
  const target = event.target as HTMLInputElement | null;
  if (!target) return;

  const newValue = target.valueAsNumber || undefined;
  value.value = { ...value.value, [segment]: newValue };

  // automatically jump to next segment

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
        @input="handleInput('hours', $event)"
        @keydown="handleKeydown"
      />

      <OnyxStepper
        ref="minutes"
        :model-value="value.minutes"
        :label="t('timePicker.labels.minute')"
        :placeholder="t('timePicker.placeholder.minute')"
        :format-number
        hide-label
        hide-buttons
        @input="handleInput('minutes', $event)"
        @keydown="handleKeydown"
      />

      <OnyxStepper
        v-if="props.showSeconds"
        ref="seconds"
        :model-value="value.seconds"
        :label="t('timePicker.labels.second')"
        :placeholder="t('timePicker.placeholder.second')"
        :format-number
        hide-label
        hide-buttons
        @input="handleInput('seconds', $event)"
        @keydown="handleKeydown"
      />

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
  }
}
</style>
