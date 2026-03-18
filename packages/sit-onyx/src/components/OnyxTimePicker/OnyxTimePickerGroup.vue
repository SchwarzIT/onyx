<script lang="ts" setup>
import { computed, ref, useTemplateRef, watch, type Ref } from "vue";
import { injectI18n } from "../../i18n/index.js";
import type { AutofocusProp } from "../../types/components.js";
import OnyxStepper from "../OnyxStepper/OnyxStepper.vue";
import TimeSuffixToggle, { type ToggleOption } from "./TimeSuffixToggle.vue";
import type { OnyxTimePickerProps } from "./types.js";

type Segment = "hour" | "minute" | "second";

type InputRef = {
  input: { focus: () => void; select: () => void } & HTMLInputElement;
};

const props = defineProps<
  Pick<
    OnyxTimePickerProps,
    "modelValue" | "disabled" | "loading" | "readonly" | "showSeconds" | "showAmPm"
  > &
    AutofocusProp
>();

const emit = defineEmits<{
  "update:modelValue": [value?: string];
  "jump-segment": [currentSegment: Segment, direction: 1 | -1];
}>();

const { t } = injectI18n();

const hourInputRef = useTemplateRef<InputRef>("hourInputTemplateRef");
const minuteInputRef = useTemplateRef<InputRef>("minuteInputTemplateRef");
const secondInputRef = useTemplateRef<InputRef>("secondInputTemplateRef");

const timeSuffix = ref("am");

watch(
  () => props.modelValue,
  (newVal) => {
    if (!props.showAmPm || !newVal) return;

    const hourString = newVal.split(":")[0];
    if (!hourString) return;

    const h = Number.parseInt(hourString, 10);
    if (!Number.isNaN(h)) {
      const expectedSuffix = h >= 12 ? "pm" : "am";
      if (timeSuffix.value !== expectedSuffix) {
        timeSuffix.value = expectedSuffix;
      }
    }
  },
  { immediate: true },
);

watch(timeSuffix, (newSuffix) => {
  if (!props.modelValue || !props.showAmPm) return;

  const parts = props.modelValue.split(":");
  if (!parts || !parts[0]) return;
  let h = Number.parseInt(parts[0], 10);
  let changed = false;

  if (newSuffix === "pm" && h < 12) {
    h += 12;
    changed = true;
  } else if (newSuffix === "am" && h >= 12) {
    h -= 12;
    changed = true;
  }

  if (changed) {
    parts[0] = h.toString().padStart(2, "0");
    updateModelValue(parts);
  }
});

const isSegmentVisible = computed(() => {
  return (segmentName: Segment) => {
    if (segmentName === "second") return props.showSeconds;
    return true;
  };
});

const timeParts = computed<string[]>(() => {
  const parts = props.modelValue?.split(":") ?? [];
  return [parts[0] ?? "00", parts[1] ?? "00", parts[2] ?? "00"];
});

const updateModelValue = (newParts: string[]) => {
  const finalParts = [newParts[0]!, newParts[1]!];
  if (props.showSeconds) finalParts.push(newParts[2]!);
  emit("update:modelValue", finalParts.join(":"));
};

const createSegmentComputed = (index: 0 | 1 | 2, segmentName: Segment) =>
  computed<number | null>({
    get: () => {
      if (!isSegmentVisible.value(segmentName) || !props.modelValue) return null;
      let val = Number.parseInt(timeParts.value[index] ?? "00");

      if (segmentName === "hour" && props.showAmPm) {
        val = val % 12;
        if (val === 0) val = 12;
      }

      return val;
    },
    set: (newValue: number | null | undefined) => {
      if (!isSegmentVisible.value(segmentName)) return;

      const numericValue = newValue ?? 0;
      const parts = [...timeParts.value];

      let segmentMax = 59;
      let segmentMin = 0;

      if (segmentName === "hour") {
        segmentMax = props.showAmPm ? 12 : 23;
        segmentMin = props.showAmPm ? 1 : 0;
      }

      let clampedValue = Math.min(Math.max(numericValue, segmentMin), segmentMax);

      if (segmentName === "hour" && props.showAmPm) {
        if (timeSuffix.value === "pm" && clampedValue < 12) {
          clampedValue += 12;
        } else if (timeSuffix.value === "am" && clampedValue === 12) {
          clampedValue = 0;
        }
      }

      parts[index] = String(clampedValue).padStart(2, "0");
      updateModelValue(parts);
    },
  });

const hour = createSegmentComputed(0, "hour");
const minute = createSegmentComputed(1, "minute");
const second = createSegmentComputed(2, "second");

const getSegmentRef = (segment: Segment): Ref<InputRef | null> => {
  switch (segment) {
    case "hour":
      return hourInputRef;
    case "minute":
      return minuteInputRef;
    case "second":
      return secondInputRef;
  }
};

const handleSegmentFocus = (refElement: InputRef | null) => {
  if (!refElement) return;
  refElement.input?.focus();
  refElement.input?.select();
};

const handleArrowOrEnterNavigation = (currentSegment: Segment, e: KeyboardEvent) => {
  emit("jump-segment", currentSegment, e.key === "ArrowRight" || e.key === "Enter" ? 1 : -1);
};

const handleDigitInput = async (currentSegment: Segment, e: KeyboardEvent) => {
  const digit = e.key;
  if (digit < "0" || digit > "9") return;

  const ref = getSegmentRef(currentSegment).value;
  if (!ref) return;

  // Jump immediately if the first digit is greater than the max possible first digit
  // e.g. for hours, if the user types "3", it can only be "03", so we can jump.
  const maxFirstDigit = currentSegment === "hour" ? (props.showAmPm ? 1 : 2) : 5;

  if (Number.parseInt(digit, 10) > maxFirstDigit) {
    setTimeout(() => emit("jump-segment", currentSegment, 1), 0);
    return;
  }

  setTimeout(() => {
    // Jump if the input has 2 digits
    const valueString = ref.input.value;
    if (valueString.length >= 2) emit("jump-segment", currentSegment, 1);
  }, 0);
};

defineExpose({ getSegmentRef, handleSegmentFocus });

const toggleOptions: [ToggleOption, ToggleOption] = [
  { label: t.value("timePicker.labels.am"), value: "am" },
  { label: t.value("timePicker.labels.pm"), value: "pm" },
];
</script>

<template>
  <div class="onyx-component onyx-time-picker__group">
    <OnyxStepper
      ref="hourInputTemplateRef"
      v-model="hour"
      :label="t('timePicker.labels.hour')"
      :placeholder="t('timePicker.placeholder.hour')"
      :disabled="props.disabled"
      :loading="props.loading"
      :readonly="props.readonly"
      :autofocus="props.autofocus"
      :format-number="(val) => String(val ?? 0).padStart(2, '0')"
      hide-label
      hide-clear-icon
      hide-success-icon
      hide-buttons
      @click="handleSegmentFocus(hourInputRef)"
      @keydown.arrow-left.prevent="handleArrowOrEnterNavigation('hour', $event)"
      @keydown.arrow-right.prevent="handleArrowOrEnterNavigation('hour', $event)"
      @keydown.enter.prevent="handleArrowOrEnterNavigation('hour', $event)"
      @keydown="handleDigitInput('hour', $event)"
    />

    <span class="onyx-time-picker__divider">:</span>

    <OnyxStepper
      ref="minuteInputTemplateRef"
      v-model="minute"
      :label="t('timePicker.labels.minute')"
      :placeholder="t('timePicker.placeholder.minute')"
      :disabled="props.disabled"
      :loading="props.loading"
      :readonly="props.readonly"
      :format-number="(val) => String(val ?? 0).padStart(2, '0')"
      hide-label
      hide-clear-icon
      hide-success-icon
      hide-buttons
      @click="handleSegmentFocus(minuteInputRef)"
      @keydown.arrow-left.prevent="handleArrowOrEnterNavigation('minute', $event)"
      @keydown.arrow-right.prevent="handleArrowOrEnterNavigation('minute', $event)"
      @keydown.enter.prevent="handleArrowOrEnterNavigation('minute', $event)"
      @keydown="handleDigitInput('minute', $event)"
    />

    <template v-if="props.showSeconds">
      <span class="onyx-time-picker__divider">:</span>
      <OnyxStepper
        ref="secondInputTemplateRef"
        v-model="second"
        :label="t('timePicker.labels.second')"
        :placeholder="t('timePicker.placeholder.second')"
        :disabled="props.disabled"
        :loading="props.loading"
        :readonly="props.readonly"
        :format-number="(val) => String(val ?? 0).padStart(2, '0')"
        hide-label
        hide-clear-icon
        hide-success-icon
        hide-buttons
        @click="handleSegmentFocus(secondInputRef)"
        @keydown.arrow-left.prevent="handleArrowOrEnterNavigation('second', $event)"
        @keydown.arrow-right.prevent="handleArrowOrEnterNavigation('second', $event)"
        @keydown.enter.prevent="handleArrowOrEnterNavigation('second', $event)"
        @keydown="handleDigitInput('second', $event)"
      />
    </template>

    <TimeSuffixToggle v-if="props.showAmPm" v-model="timeSuffix" :options="toggleOptions" />
  </div>
</template>
