<script lang="ts" setup>
import { computed, useTemplateRef, type Ref } from "vue";
import { injectI18n } from "../../i18n/index.js";
import OnyxStepper from "../OnyxStepper/OnyxStepper.vue";
import type { OnyxTimePickerProps } from "./types.js";

type Segment = "hour" | "minute" | "second";

type InputRef = {
  input: { focus: () => void; select: () => void } & HTMLInputElement;
};

const props =
  defineProps<
    Pick<OnyxTimePickerProps, "modelValue" | "disabled" | "loading" | "readonly" | "showSeconds">
  >();

const emit = defineEmits<{
  "update:modelValue": [value?: string];
  "jump-segment": [currentSegment: Segment, direction: 1 | -1];
}>();

const { t } = injectI18n();

const hourInputRef = useTemplateRef<InputRef>("hourInputTemplateRef");
const minuteInputRef = useTemplateRef<InputRef>("minuteInputTemplateRef");
const secondInputRef = useTemplateRef<InputRef>("secondInputTemplateRef");

const isSegmentVisible = (segmentName: Segment) => {
  if (segmentName === "second") return props.showSeconds;
  return true;
};

const timeParts = computed<string[]>(() => {
  const parts = props.modelValue?.split(":") ?? [];
  return [parts[0] ?? "00", parts[1] ?? "00", parts[2] ?? "00"];
});

const updateModelValue = (newParts: string[]) => {
  const finalParts: string[] = [];

  finalParts.push(newParts[0]!, newParts[1]!);

  if (props.showSeconds) {
    finalParts.push(newParts[2]!);
  }

  emit("update:modelValue", finalParts.join(":"));
};

const createSegmentComputed = (index: 0 | 1 | 2, segmentName: Segment) =>
  computed<number | null>({
    get: () => {
      if (!isSegmentVisible(segmentName) || !props.modelValue) return null;
      return Number.parseInt(timeParts.value[index] ?? "00");
    },
    set: (newValue: number | null) => {
      if (!isSegmentVisible(segmentName) || newValue === null) return;

      const parts = [...timeParts.value];
      const segmentMax = segmentName === "hour" ? 23 : 59;

      const clampedValue = Math.min(Math.max(newValue, 0), segmentMax);
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

const handleDigitInput = (currentSegment: Segment, e: KeyboardEvent) => {
  const digit = e.key;
  if (digit < "0" || digit > "9") return;

  const ref = getSegmentRef(currentSegment).value;
  if (!ref) return;

  // Jump immediately if the first digit is greater than the max possible first digit
  // e.g. for hours, if the user types "3", it can only be "03", so we can jump.
  const maxFirstDigit = currentSegment === "hour" ? 2 : 5;
  if (Number.parseInt(digit, 10) > maxFirstDigit) {
    setTimeout(() => emit("jump-segment", currentSegment, 1), 0);
    return;
  }

  setTimeout(() => {
    const valueString = ref.input.value;
    // Jump if the input has 2 digits
    if (valueString.length >= 2) emit("jump-segment", currentSegment, 1);
  }, 0);
};

defineExpose({ getSegmentRef, handleSegmentFocus });
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
  </div>
</template>
