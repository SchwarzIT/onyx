<script lang="ts" setup>
import { iconClock } from "@sit-onyx/icons";
import { computed } from "vue";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import { useForwardProps } from "../../utils/props.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxSelect from "../OnyxSelect/OnyxSelect.vue";
import type { SelectOption } from "../OnyxSelect/types.js";
import type { OnyxTimepickerProps, TimepickerType } from "./types.js";

const props = withDefaults(defineProps<OnyxTimepickerProps<TimepickerType>>(), {
  type: "select" as TimepickerType,
});

const emit = defineEmits<{
  "update:modelValue": [value?: string];
}>();

const modelValue = useVModel({ props, emit, key: "modelValue" });

const { t } = injectI18n();

const placeholderText = computed(() => {
  const parts = [];
  parts.push(t.value("timepicker.placeholder.hour"));
  parts.push(t.value("timepicker.placeholder.minute"));
  if (props.showSeconds) {
    parts.push(t.value("timepicker.placeholder.second"));
  }
  return parts.join(":");
});

const timeOptions = computed<SelectOption<string>[]>(() => {
  if (props.type !== "select") {
    return [];
  }

  if (props.options?.customTimes) {
    return props.options.customTimes;
  }

  const config = props.options || {};
  const stepSizeInSeconds = config.stepSize ?? 1800;

  const defaultTime = props.showSeconds ? "00:00:00" : "00:00";
  const defaultEndTime = props.showSeconds ? "23:59:59" : "23:59";

  const startTime = props.min ?? defaultTime;
  const endTime = props.max ?? defaultEndTime;

  const startParts = startTime.split(":").map(Number);
  const endParts = endTime.split(":").map(Number);

  if (startParts.some(isNaN) || endParts.some(isNaN)) {
    return [];
  }

  const startHour = startParts[0] ?? 0;
  const startMinute = startParts[1] ?? 0;
  const startSecond = startParts[2] ?? 0;

  const endHour = endParts[0] ?? 0;
  const endMinute = endParts[1] ?? 0;
  const endSecond = endParts[2] ?? 0;

  let currentTimeInSeconds = startHour * 3600 + startMinute * 60 + startSecond;
  const endTimeInSeconds = endHour * 3600 + endMinute * 60 + endSecond;

  const options: SelectOption<string>[] = [];

  while (currentTimeInSeconds <= endTimeInSeconds) {
    const hours = Math.floor(currentTimeInSeconds / 3600) % 24;
    const remainingSecondsFromHour = currentTimeInSeconds % 3600;
    const minutes = Math.floor(remainingSecondsFromHour / 60);
    const seconds = remainingSecondsFromHour % 60;

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");

    let timeString = `${formattedHours}:${formattedMinutes}`;

    if (props.showSeconds) {
      const formattedSeconds = String(seconds).padStart(2, "0");
      timeString += `:${formattedSeconds}`;
    }

    options.push({
      value: timeString,
      label: timeString,
    });

    currentTimeInSeconds += stepSizeInSeconds;
  }

  return options;
});

const inputProps = useForwardProps(props, OnyxSelect);
</script>

<template>
  <OnyxSelect
    v-bind="inputProps"
    v-model="modelValue"
    :label="props.label"
    class="onyx-timepicker"
    :list-label="t('timepicker.labels.listLabel')"
    :options="timeOptions"
    :placeholder="placeholderText"
    :list-description="props.infoLabel"
  >
    <template #toggleIcon>
      <OnyxIcon :class="['onyx-timepicker__icon', { filled: modelValue }]" :icon="iconClock" />
    </template>
  </OnyxSelect>
</template>
