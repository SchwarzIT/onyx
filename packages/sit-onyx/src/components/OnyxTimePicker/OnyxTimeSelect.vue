<script lang="ts" setup>
import { iconClock } from "@sit-onyx/icons";
import { computed } from "vue";
import type { CustomMessageType } from "../../composables/useFormElementError.js";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import { useForwardProps } from "../../utils/props.js";
import OnyxFormElementAction from "../OnyxFormElementAction/OnyxFormElementAction.vue";
import type {
  FormElementV2LabelOptions,
  FormElementV2Tooltip,
} from "../OnyxFormElementV2/types.js";
import OnyxSelect from "../OnyxSelect/OnyxSelect.vue";
import type { SelectOption } from "../OnyxSelect/types.js";
import type { OnyxTimePickerProps, TimePickerType } from "./types.js";
type Props = OnyxTimePickerProps<TimePickerType>;

const props = withDefaults(defineProps<Props>(), {
  type: "select" as TimePickerType,
  open: undefined,
});

const emit = defineEmits<{
  /**
   * Emitted when modelValue changes
   */
  "update:modelValue": [value?: string];
  /**
   * Emitted when the open state changes
   */
  "update:open": [open: boolean];
}>();

const modelValue = useVModel<Props, "modelValue", string | undefined>({
  props,
  emit,
  key: "modelValue",
});
const open = useVModel({
  props,
  emit,
  key: "open",
  default: false,
});

const { t } = injectI18n();

const placeholderText = computed(() => {
  const parts = [];
  parts.push(t.value("timePicker.placeholder.hour"), t.value("timePicker.placeholder.minute"));
  if (props.showSeconds) {
    parts.push(t.value("timePicker.placeholder.second"));
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

const labelOptions = computed<FormElementV2LabelOptions>(() => {
  if (typeof props.label === "string") return { label: props.label };
  return props.label;
});

const mapToCustomMessage = (
  value?: string | FormElementV2Tooltip,
): CustomMessageType | undefined => {
  if (!value) return;
  if (typeof value === "string") return value;
  return { shortMessage: value.label, longMessage: value.tooltipText };
};
</script>

<template>
  <OnyxSelect
    v-bind="inputProps"
    v-model="modelValue"
    v-model:open="open"
    :message="mapToCustomMessage(props.message)"
    :success="mapToCustomMessage(props.success)"
    :label="labelOptions.label"
    :hide-label="labelOptions.hidden"
    :label-tooltip="labelOptions.tooltipText"
    class="onyx-time-picker"
    :list-label="t('timePicker.labels.listLabel')"
    :options="timeOptions"
    :placeholder="placeholderText"
    :list-description="props.infoLabel"
  >
    <template #toggleIcon>
      <OnyxFormElementAction
        :label="t('select.toggleDropDown')"
        :icon="iconClock"
        :disabled="disabled || props.readonly || props.loading"
        highlight-on-focus
        @click="open = !open"
      />
    </template>
  </OnyxSelect>
</template>
