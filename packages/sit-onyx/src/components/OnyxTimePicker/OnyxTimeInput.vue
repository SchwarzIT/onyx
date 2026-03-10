<script lang="ts" setup>
import { useOutsideClick } from "@sit-onyx/headless";
import { iconClock, iconXSmall } from "@sit-onyx/icons";
import { computed, ref, useTemplateRef, watch } from "vue";
import { useDensity } from "../../composables/density.js";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import { useForwardProps } from "../../utils/props.js";
import OnyxBasicPopover from "../OnyxBasicPopover/OnyxBasicPopover.vue";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxTimePickerGroup from "./OnyxTimePickerGroup.vue";
import OnyxTimePickerInput from "./OnyxTimePickerInput.vue";
import type { OnyxTimePickerProps, TimePickerType } from "./types.js";

type Segment = "hour" | "minute" | "second";

const props = withDefaults(defineProps<OnyxTimePickerProps<TimePickerType>>(), {
  type: "default" as TimePickerType,
});

const emit = defineEmits<{
  "update:modelValue": [value?: string];
}>();
const modelValue = useVModel({ props, emit, key: "modelValue" });

const { t } = injectI18n();
const { densityClass } = useDensity(props);
const open = ref(false);

const timePickerGroup = useTemplateRef("timePickerGroupRef");
const starttimePickerGroup = useTemplateRef("startTimePickerGroupRef");
const endtimePickerGroup = useTemplateRef("endTimePickerGroupRef");
const root = useTemplateRef("rootRef");
const isFocused = ref(false);

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

const clampTime = (time?: string): string | undefined => {
  if (!time) return time;
  const currentTotalSeconds = partsToTotalSeconds(time.split(":"));

  const min = minTimeSeconds.value ?? 0;
  const max = maxTimeSeconds.value ?? partsToTotalSeconds(["23", "59", "59"]);
  const clampedTotalSeconds = Math.min(Math.max(currentTotalSeconds, min), max);

  const clampedParts = totalSecondsToParts(clampedTotalSeconds);
  return props.showSeconds ? clampedParts.join(":") : clampedParts.slice(0, 2).join(":");
};

const startTime = computed<string | undefined>({
  get: () => modelValue.value?.split("-")[0],
  set: (newValue) => {
    const endTimeValue = modelValue.value?.split("-")[1] ?? newValue;
    modelValue.value = `${newValue}-${endTimeValue}`;
  },
});

const endTime = computed<string | undefined>({
  get: () => {
    const parts = modelValue.value?.split("-");
    return parts?.length === 2 ? parts[1] : undefined;
  },
  set: (newValue) => {
    const startTimeValue = modelValue.value?.split("-")[0] ?? newValue;
    modelValue.value = `${startTimeValue}-${newValue}`;
  },
});

const updateModelValue = (newParts: string[]) => {
  const timeString = newParts.join(":");
  const clampedTime = clampTime(timeString);
  modelValue.value = clampedTime;
};

const availableSegments = computed<Segment[]>(() => {
  const segments: Segment[] = ["hour", "minute"];
  if (props.showSeconds) segments.push("second");
  return segments;
});

const jumpSegment = (
  currentSegment: Segment,
  direction: 1 | -1,
  group: "start" | "end" | "default" = "default",
) => {
  const segments = availableSegments.value;
  const currentIndex = segments.indexOf(currentSegment);
  const nextIndex = currentIndex + direction;

  const groupRef =
    group === "start"
      ? starttimePickerGroup.value
      : group === "end"
        ? endtimePickerGroup.value
        : timePickerGroup.value;

  if (nextIndex >= 0 && nextIndex < segments.length && groupRef) {
    const nextSegment = segments[nextIndex]!;
    const segmentRef = groupRef.getSegmentRef(nextSegment);
    groupRef.handleSegmentFocus(segmentRef.value);
  } else if (direction === 1 && group === "start" && endtimePickerGroup.value) {
    // Jump from end of start group to start of end group
    const firstSegmentRef = endtimePickerGroup.value.getSegmentRef(segments[0]!);
    endtimePickerGroup.value.handleSegmentFocus(firstSegmentRef.value);
  } else if (direction === -1 && group === "end" && starttimePickerGroup.value) {
    // Jump from start of end group to end of start group
    const lastSegment = segments[segments.length - 1]!;
    const lastSegmentRef = starttimePickerGroup.value.getSegmentRef(lastSegment);
    starttimePickerGroup.value.handleSegmentFocus(lastSegmentRef.value);
  } else if (direction === 1) {
    open.value = false;
  }
};

const handleInputClick = async () => {
  if (props.type !== "range" || props.readonly) {
    return;
  }
  open.value = !open.value;

  if (!open.value) return;
};

useOutsideClick({
  inside: root,
  onOutsideClick: () => (open.value = false),
  checkOnTab: true,
});

const showClearButton = computed(() => {
  return (isFocused.value || open.value) && modelValue.value && !props.hideClearIcon;
});

const handleModelUpdate = (value: string | undefined) => {
  if (props.type !== "range") {
    if (!value) return;
    updateModelValue(value.split(":"));
  }
};

const handleRangeModelUpdate = (group: "start" | "end", value: string | undefined) => {
  if (group === "start") {
    startTime.value = value;
  } else {
    endTime.value = value;
  }
};
const placeholder = computed(() => {
  if (props.type !== "range") return undefined;

  const timePlaceholder = [
    t.value("timePicker.placeholder.hour"),
    t.value("timePicker.placeholder.minute"),
    ...(props.showSeconds ? [t.value("timePicker.placeholder.second")] : []),
  ].join(":");

  return `${timePlaceholder} - ${timePlaceholder}`;
});

const rangeError = ref<string>();
const error = computed(() => props.error ?? rangeError.value);

watch(open, (newValue) => {
  if (newValue || props.type !== "range") return;

  const start = parseTimeSeconds(startTime.value);
  const end = parseTimeSeconds(endTime.value);
  const min = parseTimeSeconds(props.min);
  const max = parseTimeSeconds(props.max);

  if (start === null || end === null) return;

  if (start > end) {
    rangeError.value = t.value("timePicker.errors.endTimeAfterStartTime");
  } else if (min && max && (start < min || end > max)) {
    rangeError.value = t.value("timePicker.errors.outsideRange", {
      min: props.min,
      max: props.max,
    });
  } else if (min && start < min) {
    rangeError.value = t.value("timePicker.errors.timeBeforeMin", { min: props.min });
  } else if (max && end > max) {
    rangeError.value = t.value("timePicker.errors.timeAfterMax", { max: props.max });
  } else {
    rangeError.value = undefined;
  }
});
const inputProps = useForwardProps(props, OnyxTimePickerInput);
</script>

<template>
  <div ref="rootRef" :class="['onyx-component', 'onyx-time-picker', densityClass]">
    <OnyxBasicPopover
      class="onyx-time-picker__popover"
      :label="t('timePicker.labels.popover')"
      position="bottom"
      alignment="center"
      :open="open"
      fit-parent
    >
      <template #default>
        <OnyxTimePickerInput
          class="onyx-time-picker__input"
          :class="{ 'onyx-time-picker__input--show-focused': open }"
          v-bind="inputProps"
          :error="error"
          :placeholder
          :step="props.type === 'range' ? undefined : props.showSeconds ? 1 : 60"
          @update:model-value="modelValue = $event"
          @update:is-focused="isFocused = $event"
          @update:open="handleInputClick"
        >
          <template #icon>
            <button
              v-if="showClearButton"
              class="onyx-time-picker__clear-button"
              type="button"
              :aria-label="t('input.clear')"
              :title="t('input.clear')"
              tabindex="-1"
              @mousedown.prevent
              @click="modelValue = undefined"
            >
              <OnyxIcon :icon="iconXSmall" color="neutral" />
            </button>
            <OnyxIcon
              v-else
              :icon="iconClock"
              color="neutral"
              class="onyx-time-picker__clock-icon"
            />
          </template>
        </OnyxTimePickerInput>
      </template>

      <template #content>
        <div class="onyx-time-picker__wrapper" tabindex="-1">
          <template v-if="props.type === 'range'">
            <OnyxHeadline is="h3" class="onyx-time-picker__range-label">{{
              t("timePicker.labels.from")
            }}</OnyxHeadline>
            <OnyxTimePickerGroup
              ref="startTimePickerGroupRef"
              :model-value="startTime"
              :disabled="props.disabled"
              :readonly="props.readonly"
              :loading="props.loading"
              autofocus
              :show-seconds="props.showSeconds"
              @update:model-value="handleRangeModelUpdate('start', $event)"
              @jump-segment="(segment, direction) => jumpSegment(segment, direction, 'start')"
            />
            <OnyxHeadline is="h3" class="onyx-time-picker__range-label">{{
              t("timePicker.labels.to")
            }}</OnyxHeadline>
            <OnyxTimePickerGroup
              ref="endTimePickerGroupRef"
              :model-value="endTime"
              :disabled="props.disabled"
              :readonly="props.readonly"
              :loading="props.loading"
              :show-seconds="props.showSeconds"
              @update:model-value="handleRangeModelUpdate('end', $event)"
              @jump-segment="(segment, direction) => jumpSegment(segment, direction, 'end')"
            />
          </template>

          <OnyxTimePickerGroup
            v-else
            ref="timePickerGroupRef"
            autofocus
            :model-value="modelValue"
            :disabled="props.disabled"
            :loading="props.loading"
            :show-seconds="props.showSeconds"
            @update:model-value="handleModelUpdate"
            @jump-segment="jumpSegment"
          />

          <div v-if="props.infoLabel" class="onyx-time-picker__info-label">
            <p>{{ props.infoLabel }}</p>
          </div>
        </div>
      </template>
    </OnyxBasicPopover>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-time-picker {
  @include layers.component() {
    &__popover,
    &__input {
      width: 100%;
    }
    &__input {
      &--show-focused .onyx-time-picker-input__wrapper {
        outline-style: solid;
        &:not(:has(.onyx-time-picker-input__native:invalid)) {
          --border-color: var(--onyx-color-component-border-primary-hover);
        }
      }
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
      align-items: center;
      color: var(--onyx-color-text-icons-neutral-soft);
      font-size: var(--onyx-font-size-sm);
    }
    &__clear-button {
      .onyx-icon {
        --icon-color: var(--onyx-color-text-icons-neutral-soft);
      }
      all: initial;
      cursor: pointer;
      &:hover .onyx-icon {
        --icon-color: var(--onyx-color-text-icons-primary-intense);
      }
    }
    &__range-label {
      padding: var(--onyx-density-xs) var(--onyx-density-sm);
    }

    &__clock-icon {
      --icon-color: var(--onyx-color-text-icons-neutral-soft);
    }
    &:has(.onyx-time-picker-input__native:focus-visible),
    &:has(.onyx-time-picker-input__native:hover) {
      .onyx-time-picker__clock-icon {
        --icon-color: var(--onyx-color-text-icons-primary-intense);
      }
    }
  }
}
</style>
