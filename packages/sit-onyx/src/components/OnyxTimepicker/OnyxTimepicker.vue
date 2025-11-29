<script lang="ts" setup>
import { iconCircleInformation } from "@sit-onyx/icons";
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  useTemplateRef,
  watch,
  type Ref,
} from "vue";
import { SKELETON_INJECTED_SYMBOL } from "../../composables/useSkeletonState.js";
import { useTimepicker, type Segment } from "../../composables/useTimepicker.js";
import { injectI18n } from "../../i18n.js";
import OnyxBasicPopover from "../OnyxBasicPopover/OnyxBasicPopover.vue";
import { FORM_INJECTED_SYMBOL } from "../OnyxForm/OnyxForm.core";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxStepper from "../OnyxStepper/OnyxStepper.vue";
import OnyxTimepickerInput from "./OnyxTimepickerInput.vue";
import type { OnyxTimepickerProps } from "./types.js";

type InputRef = {
  input: { focus: () => void; select: () => void } & HTMLInputElement;
};

const props = withDefaults(defineProps<OnyxTimepickerProps>(), {
  segments: () => ({ hour: true, minute: true }),
  required: false,
  autocapitalize: "sentences",
  readonly: false,
  requiredMarker: FORM_INJECTED_SYMBOL,
  disabled: FORM_INJECTED_SYMBOL,
  showError: FORM_INJECTED_SYMBOL,
  skeleton: SKELETON_INJECTED_SYMBOL,
  disableManualResize: false,
});

const emit = defineEmits<{
  "update:modelValue": [value?: number];
}>();

const { t } = injectI18n();

const placeholderText = computed(() => {
  const parts = [];
  if (props.segments?.hour) {
    parts.push(t.value("timepicker.placeholder.hour"));
  }
  if (props.segments?.minute) {
    parts.push(t.value("timepicker.placeholder.minute"));
  }
  if (props.segments?.second) {
    parts.push(t.value("timepicker.placeholder.second"));
  }
  return parts.join(":");
});

const {
  hourInput,
  minuteInput,
  secondInput,
  timeString,
  availableSegments,
  getSegmentBoundaries,
  getSegmentModel,
} = useTimepicker(props);

const open = ref(false);
const hourInputRef = useTemplateRef<InputRef>("hourInputTemplateRef");
const minuteInputRef = useTemplateRef<InputRef>("minuteInputTemplateRef");
const secondInputRef = useTemplateRef<InputRef>("secondInputTemplateRef");
const rootRef = useTemplateRef("rootTemplateRef");

const getSegmentRef = (segment: Segment): Ref => {
  switch (segment) {
    case "hour":
      return hourInputRef;
    case "minute":
      return minuteInputRef;
    case "second":
      return secondInputRef;
  }
};

const jumpSegment = (currentSegment: Segment, direction: 1 | -1) => {
  const segments = availableSegments.value;
  const currentIndex = segments.indexOf(currentSegment);
  const nextIndex = currentIndex + direction;

  if (nextIndex >= 0 && nextIndex < segments.length) {
    const nextSegment = segments[nextIndex]!;
    handleSegmentFocus(getSegmentRef(nextSegment).value);
  } else if (direction === 1) {
    open.value = false;
  }
};

const handleInputChange = (currentSegment: Segment, e: KeyboardEvent) => {
  e.stopPropagation();
  const ref = getSegmentRef(currentSegment).value;
  const nativeInput = ref?.input as HTMLInputElement;

  const max = currentSegment === "hour" ? 23 : 59;
  const min = 0;
  const modelRef = getSegmentModel(currentSegment);

  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    const currentValue = modelRef.value ?? 0;
    let newValue;

    if (e.key === "ArrowUp") {
      newValue = currentValue < max ? currentValue + 1 : min;
    } else {
      newValue = currentValue > min ? currentValue - 1 : max;
    }
    setTimeout(() => {
      modelRef.value = newValue;
    }, 0);

    return;
  }
  if (e.key === "ArrowLeft") {
    e.preventDefault();
    jumpSegment(currentSegment, -1);
    return;
  }

  if (e.key === "ArrowRight" || e.key === "Enter" || e.key === "Tab") {
    e.preventDefault();
    jumpSegment(currentSegment, 1);
    return;
  }

  if (nativeInput && e.key >= "0" && e.key <= "9") {
    const currentValueLength = nativeInput.value.length;
    const modelRef = getSegmentModel(currentSegment);

    setTimeout(() => {
      const value = parseInt(nativeInput.value, 10);

      if (!isNaN(value) && nativeInput.value.length === 2) {
        if (value > max) {
          modelRef.value = max;
          jumpSegment(currentSegment, 1);
          return;
        }
      }

      const wasOneDigit = currentValueLength === 1;
      const wasSelectedAndOverwritten =
        currentValueLength === 2 && nativeInput.selectionEnd! - nativeInput.selectionStart! === 2;

      if ((wasOneDigit || wasSelectedAndOverwritten) && nativeInput.value.length === 2) {
        jumpSegment(currentSegment, 1);
      }
    }, 0);
  }
};

const lastCursorPosition = ref<number | null>(null);

const handleSegmentFocus = async (refElement: InputRef | null) => {
  if (!refElement) return;

  await nextTick();
  const nativeInput = refElement.input as HTMLInputElement;

  if (nativeInput) {
    setTimeout(() => {
      nativeInput.focus();
      nativeInput.select();
    }, 0);
  }
};

const jump = ref(false);
const handleInputFilter = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input) return;

  const filteredValue = input.value.replace(/[^0-9:]/g, "");

  if (input.value !== filteredValue) {
    input.value = filteredValue;
  }

  timeString.value = input.value;

  nextTick(() => {
    if (lastCursorPosition.value !== null) {
      const boundaries = getSegmentBoundaries(availableSegments.value);
      const maxTotalLength =
        boundaries && boundaries.length > 0 ? boundaries[boundaries.length - 1]!.end : 0;

      if (jump.value) {
        if (lastCursorPosition.value > maxTotalLength + 1) {
          open.value = false;
          input.blur();
          return;
        }
        input.setSelectionRange(lastCursorPosition.value - 2, lastCursorPosition.value);
      } else {
        input.setSelectionRange(lastCursorPosition.value, lastCursorPosition.value);
        lastCursorPosition.value += 3;
      }
      jump.value = !jump.value;
    }
  });
};
const isClicking = ref(false);
const handleSegmentClick = (event: MouseEvent) => {
  const input = event.target as HTMLInputElement;
  if (!input || isClicking.value) return;
  if (!open.value) {
    handleOpen();
    return;
  }
  const position = input.selectionStart ?? 0;
  const boundaries = getSegmentBoundaries(availableSegments.value);

  const clickedRange = boundaries.find((range) => position >= range.start && position <= range.end);

  if (clickedRange) {
    const { start, end } = clickedRange;
    lastCursorPosition.value = end;
    input.setSelectionRange(start, end);
    input.focus();
    jump.value = false;
  }
};

const handleInputKeyDown = (e: KeyboardEvent) => {
  const input = e.target as HTMLInputElement;
  const position = input.selectionStart ?? 0;
  const boundaries = getSegmentBoundaries(availableSegments.value);

  if (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "Enter") {
    e.preventDefault();

    let currentIndex = boundaries.findIndex(
      (range) => position >= range.start && position <= range.end,
    );

    if (currentIndex === -1 && position > 0) {
      currentIndex = boundaries.findIndex((range) => position === range.end + 1);
      if (currentIndex !== -1) {
        currentIndex = currentIndex < boundaries.length - 1 ? currentIndex : boundaries.length - 1;
      }
    }

    if (currentIndex === -1) {
      currentIndex = boundaries.findIndex((range) => position >= range.start);
      if (currentIndex === -1) currentIndex = 0;
    }

    let targetIndex = -1;

    if (e.key === "ArrowLeft") {
      targetIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
    } else {
      if (currentIndex < boundaries.length - 1) {
        targetIndex = currentIndex + 1;
      } else {
        open.value = false;
        input.blur();
        return;
      }
    }

    if (boundaries.length > 0 && targetIndex !== currentIndex) {
      const targetRange = boundaries[targetIndex];

      setTimeout(() => {
        input.setSelectionRange(targetRange!.start, targetRange!.end);
        input.focus();
      }, 0);

      lastCursorPosition.value = targetRange!.end;
      jump.value = false;
    }
  }
};

// open/close
const handleOpen = async () => {
  if (!open.value) {
    isClicking.value = true;
    setTimeout(() => {
      isClicking.value = false;
    }, 100);
    open.value = true;

    const firstSegment = availableSegments.value[0];
    if (firstSegment) {
      handleSegmentFocus(getSegmentRef(firstSegment).value);
    }
  }
};
const handleClickOutside = (event: MouseEvent) => {
  if (!open.value) return;
  const target = event.target as Node;
  if (rootRef.value?.contains(target)) {
    return;
  }
  const popoverContent = document.querySelector(".onyx-popover--open .onyx-popover__content");
  if (popoverContent?.contains(target)) {
    return;
  }
  open.value = false;
};

onMounted(() => {
  document.addEventListener("mousedown", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("mousedown", handleClickOutside);
});

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue === undefined || newValue === null) {
      hourInput.value = null;
      minuteInput.value = null;
      secondInput.value = null;
    } else {
      const value = newValue;
      const h = Math.floor(value / 3600);
      const m = Math.floor((value % 3600) / 60);
      const s = value % 60;

      hourInput.value = h;
      minuteInput.value = m;
      secondInput.value = s;
    }
  },
  { immediate: true },
);

watch(
  [hourInput, minuteInput, secondInput],
  () => {
    const h = hourInput.value ?? null;
    const m = minuteInput.value ?? null;
    const s = secondInput.value ?? null;

    if (h === null && m === null && s === null) {
      emit("update:modelValue", undefined);
      return;
    }

    const isHourValid = props.segments.hour ? h !== null : true;
    const isMinuteValid = props.segments.minute ? m !== null : true;
    const isSecondValid = props.segments.second ? s !== null : true;

    const hValue = h === 24 ? 0 : h === -1 ? 23 : h;
    const mValue = m === 60 ? 0 : m === -1 ? 59 : m;
    const sValue = s === 60 ? 0 : s === -1 ? 59 : s;

    if (isHourValid && isMinuteValid && isSecondValid) {
      const totalSeconds = (hValue ?? 0) * 3600 + (mValue ?? 0) * 60 + (sValue ?? 0);
      emit("update:modelValue", totalSeconds);
    }
  },
  { immediate: true },
);

const inputProps = computed(() => {
  const {
    modelValue: _modelValue,
    segments: _segments,
    infoLabel: _infoLabel,
    hideInfoLabelIcon: _hideInfoLabelIcon,
    ...others
  } = props;

  return others;
});
</script>

<template>
  <div ref="rootTemplateRef" class="onyx-component onyx-timepicker">
    <OnyxBasicPopover
      class="onyx-timepicker__popover"
      label="test"
      position="bottom"
      alignment="center"
      :open="open"
      fit-parent
    >
      <template #default>
        <OnyxTimepickerInput
          v-bind="inputProps"
          v-model="timeString"
          class="onyx-timepicker__input"
          :placeholder="placeholderText"
          type="text"
          @focus="handleOpen"
          @click="handleSegmentClick"
          @input="handleInputFilter"
          @keydown="handleInputKeyDown"
        />
      </template>
      <template #content>
        <div class="onyx-timepicker__wrapper" tabindex="-1">
          <div class="onyx-timepicker__group">
            <OnyxStepper
              v-if="props.segments?.hour"
              ref="hourInputTemplateRef"
              v-model="hourInput"
              :label="t('timepicker.labels.hour')"
              :placeholder="t('timepicker.placeholder.hour')"
              :disabled="props.disabled"
              :loading="props.loading"
              hide-label
              hide-clear-icon
              hide-success-icon
              hide-buttons
              @click="handleSegmentFocus(hourInputRef)"
              @focus="handleSegmentFocus(hourInputRef)"
              @keydown="(e: KeyboardEvent) => handleInputChange('hour', e)"
            />

            <span v-if="props.segments?.minute" className="onyx-timepicker__divider">:</span>
            <OnyxStepper
              v-if="props.segments?.minute"
              ref="minuteInputTemplateRef"
              v-model="minuteInput"
              :label="t('timepicker.labels.minute')"
              :placeholder="t('timepicker.placeholder.minute')"
              hide-label
              :disabled="props.disabled"
              :loading="props.loading"
              hide-clear-icon
              hide-success-icon
              hide-buttons
              @click="handleSegmentFocus(minuteInputRef)"
              @focus="handleSegmentFocus(minuteInputRef)"
              @keydown="(e: KeyboardEvent) => handleInputChange('minute', e)"
            />

            <span v-if="props.segments?.second" className="onyx-timepicker__divider">:</span>
            <OnyxStepper
              v-if="props.segments?.second"
              ref="secondInputTemplateRef"
              v-model="secondInput"
              :label="t('timepicker.labels.second')"
              :placeholder="t('timepicker.placeholder.second')"
              :disabled="props.disabled"
              :loading="props.loading"
              hide-label
              hide-clear-icon
              hide-success-icon
              hide-buttons
              @click="handleSegmentFocus(secondInputRef)"
              @focus="handleSegmentFocus(secondInputRef)"
              @keydown="(e: KeyboardEvent) => handleInputChange('second', e)"
            />
          </div>
          <div v-if="props.infoLabel" class="onyx-timepicker__info-label">
            <OnyxIcon
              v-if="!props.hideInfoLabelIcon"
              :icon="iconCircleInformation"
              color="neutral"
            />
            <p>{{ props.infoLabel }}</p>
          </div>
        </div>
      </template>
    </OnyxBasicPopover>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-timepicker {
  @include layers.component() {
    &__popover,
    &__input {
      width: 100%;
    }
    &__wrapper {
      width: 100%;
      display: flex;
      gap: var(--onyx-density-3xs);
      flex-direction: column;
      padding: var(--onyx-density-xs) 0;
    }
    &__group {
      display: flex;
      width: 100%;
      gap: var(--onyx-density-xs);
      padding: var(--onyx-density-xs) var(--onyx-density-sm);
      align-items: center;
      .onyx-stepper {
        width: 100%;
      }
    }
    &__divider {
      font-size: var(--onyx-font-size-xl);
    }
    &__icon {
      position: absolute;
      top: 50%;
      right: var(--onyx-density-sm);
      transform: translateY(-50%);
      pointer-events: none;
      color: var(--onyx-color-text-icons-neutral-soft);
    }
    &__input-wrapper {
      position: relative;
    }
    &__info-label {
      padding: var(--onyx-density-3xs) var(--onyx-density-sm);
      gap: var(--onyx-density-xs);
      box-sizing: border-box;
      display: flex;
      justify-content: end;
      color: var(--onyx-color-text-icons-neutral-soft);
    }
  }
}
</style>
