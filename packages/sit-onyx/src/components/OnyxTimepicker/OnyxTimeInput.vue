<script lang="ts" setup>
import { useOutsideClick } from "@sit-onyx/headless";
import { iconCircleInformation, iconClock } from "@sit-onyx/icons";
import { computed, ref, useTemplateRef, type Ref } from "vue";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import { useForwardProps } from "../../utils/props.js";
import OnyxBasicPopover from "../OnyxBasicPopover/OnyxBasicPopover.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import OnyxStepper from "../OnyxStepper/OnyxStepper.vue";
import OnyxTimepickerInput from "./OnyxTimepickerInput.vue";
import type { OnyxTimepickerProps, TimepickerType } from "./types.js";

type Segment = "hour" | "minute" | "second";

type InputRef = {
  input: { focus: () => void; select: () => void } & HTMLInputElement;
};

const props = withDefaults(defineProps<OnyxTimepickerProps<TimepickerType>>(), {
  type: "default" as TimepickerType,
});

const emit = defineEmits<{
  "update:modelValue": [value?: string];
}>();
const modelValue = useVModel({ props, emit, key: "modelValue" });

const { t } = injectI18n();
const open = ref(false);

const hourInputRef = useTemplateRef<InputRef>("hourInputTemplateRef");
const minuteInputRef = useTemplateRef<InputRef>("minuteInputTemplateRef");
const secondInputRef = useTemplateRef<InputRef>("secondInputTemplateRef");
const rootRef = useTemplateRef("rootTemplateRef");

const partsToTotalSeconds = (parts: string[]): number => {
  const h = parseInt(parts[0] || "0", 10);
  const m = parseInt(parts[1] || "0", 10);
  const s = parseInt(parts[2] || "0", 10);
  return h * 3600 + m * 60 + s;
};

const totalSecondsToParts = (totalSeconds: number): string[] => {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [String(h).padStart(2, "0"), String(m).padStart(2, "0"), String(s).padStart(2, "0")];
};

const parseTimeSeconds = (timeString?: string): number | null => {
  if (!timeString) return null;
  const parts = timeString.split(":").map((p) => parseInt(p, 10));
  if (parts.length < 2) return null;
  return parts[0]! * 3600 + parts[1]! * 60 + (parts[2] || 0);
};

const minTimeSeconds = computed(() => parseTimeSeconds(props.min));
const maxTimeSeconds = computed(() => parseTimeSeconds(props.max));

const clampTime = (newParts: string[]): string[] => {
  const currentTotalSeconds = partsToTotalSeconds(newParts);

  const min = minTimeSeconds.value ?? 0;
  const max = maxTimeSeconds.value ?? partsToTotalSeconds(["23", "59", "59"]); // 23:59:59
  const clampedTotalSeconds = Math.min(Math.max(currentTotalSeconds, min), max);

  return totalSecondsToParts(clampedTotalSeconds);
};

const isSegmentVisible = (segmentName: Segment) => {
  if (segmentName === "second") return props.showSeconds;
  return true;
};

const availableSegments = computed<Segment[]>(() => {
  const segments: Segment[] = ["hour", "minute"];
  if (props.showSeconds) segments.push("second");
  return segments;
});

const timeParts = computed<string[]>(() => {
  const parts = modelValue.value?.split(":") ?? [];
  return [parts[0] ?? "00", parts[1] ?? "00", parts[2] ?? "00"];
});

const updateModelValue = (newParts: string[]) => {
  const clampedParts = clampTime(newParts);
  const finalParts: string[] = [];

  finalParts.push(clampedParts[0]!);
  finalParts.push(clampedParts[1]!);

  if (props.showSeconds) {
    finalParts.push(clampedParts[2]!);
  }

  modelValue.value = finalParts.join(":");
};

const createSegmentComputed = (index: 0 | 1 | 2, segmentName: Segment) =>
  computed<number | null>({
    get: () => {
      if (!isSegmentVisible(segmentName) || !modelValue.value) return null;
      return parseInt(timeParts.value[index] ?? "00");
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

  const nativeInput = refElement.input as HTMLInputElement;

  if (nativeInput) {
    nativeInput.focus();
    nativeInput.select();
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

  if (e.key === "ArrowLeft") {
    e.preventDefault();
    jumpSegment(currentSegment, -1);
    return;
  }

  if (e.key === "ArrowRight" || e.key === "Enter") {
    e.preventDefault();
    jumpSegment(currentSegment, 1);
    return;
  }

  if (e.key === "Tab") {
    if (currentSegment !== availableSegments.value[availableSegments.value.length - 1]) {
      e.preventDefault();
      jumpSegment(currentSegment, 1);
    }
    return;
  }

  if (nativeInput && e.key >= "0" && e.key <= "9") {
    setTimeout(() => {
      const valueString = nativeInput.value;
      if (valueString.length >= 2) {
        jumpSegment(currentSegment, 1);
      }
    }, 0);
  }
};

const handleOpen = () => {
  if (!open.value) {
    open.value = true;
    const firstSegment = availableSegments.value[0];
    if (firstSegment) {
      setTimeout(() => {
        handleSegmentFocus(getSegmentRef(firstSegment).value);
      }, 0);
    }
  }
};

useOutsideClick({
  inside: rootRef,
  onOutsideClick: () => (open.value = false),
  checkOnTab: true,
});

const inputProps = useForwardProps(props, OnyxTimepickerInput);
</script>

<template>
  <div ref="rootTemplateRef" class="onyx-component onyx-timepicker">
    <OnyxBasicPopover
      class="onyx-timepicker__popover"
      :label="t('timepicker.labels.popover')"
      position="bottom"
      alignment="center"
      :open="open"
      fit-parent
    >
      <template #default>
        <OnyxTimepickerInput
          class="onyx-timepicker__input"
          v-bind="inputProps"
          :step="props.showSeconds ? 1 : 0"
          @update:model-value="modelValue = $event"
          @click="open = false"
        >
          <template #icon>
            <OnyxIconButton
              :label="t('timepicker.labels.iconButton')"
              :icon="iconClock"
              :color="open ? 'primary' : 'neutral'"
              class="onyx-timepicker__time-icon"
              @click.stop="handleOpen"
            />
          </template>
        </OnyxTimepickerInput>
      </template>

      <template #content>
        <div class="onyx-timepicker__wrapper" tabindex="-1">
          <div class="onyx-timepicker__group">
            <OnyxStepper
              ref="hourInputTemplateRef"
              v-model="hour"
              :label="t('timepicker.labels.hour')"
              :placeholder="t('timepicker.placeholder.hour')"
              :disabled="props.disabled"
              :loading="props.loading"
              hide-label
              hide-clear-icon
              hide-success-icon
              hide-buttons
              @click="handleSegmentFocus(hourInputRef)"
              @keydown="(e: KeyboardEvent) => handleInputChange('hour', e)"
            />

            <span class="onyx-timepicker__divider">:</span>

            <OnyxStepper
              ref="minuteInputTemplateRef"
              v-model="minute"
              :label="t('timepicker.labels.minute')"
              :placeholder="t('timepicker.placeholder.minute')"
              :disabled="props.disabled"
              :loading="props.loading"
              hide-label
              hide-clear-icon
              hide-success-icon
              hide-buttons
              @click="handleSegmentFocus(minuteInputRef)"
              @keydown="(e: KeyboardEvent) => handleInputChange('minute', e)"
            />

            <span v-if="props.showSeconds" class="onyx-timepicker__divider">:</span>

            <template v-if="props.showSeconds">
              <OnyxStepper
                ref="secondInputTemplateRef"
                v-model="second"
                :label="t('timepicker.labels.second')"
                :placeholder="t('timepicker.placeholder.second')"
                :disabled="props.disabled"
                :loading="props.loading"
                hide-label
                hide-clear-icon
                hide-success-icon
                hide-buttons
                @click="handleSegmentFocus(secondInputRef)"
                @keydown="(e: KeyboardEvent) => handleInputChange('second', e)"
              />
            </template>
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
    &__input {
      input::-webkit-calendar-picker-indicator {
        display: none;
      }
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
      pointer-events: none;
      user-select: none;
    }

    &__info-label {
      padding: var(--onyx-density-3xs) var(--onyx-density-sm);
      gap: var(--onyx-density-xs);
      box-sizing: border-box;
      display: flex;
      justify-content: end;
      color: var(--onyx-color-text-icons-neutral-soft);
      font-size: var(--onyx-font-size-2xs);
    }
    &__time-icon {
      --onyx-icon-button-padding: var(--onyx-density-2xs);
      margin-right: calc(-1 * var(--onyx-icon-button-padding));
      &.onyx-icon-button--neutral {
        --icon-button-color: var(--onyx-color-text-icons-neutral-soft);
      }
    }
  }
}
</style>
