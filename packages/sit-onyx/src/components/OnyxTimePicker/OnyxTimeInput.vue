<script lang="ts" setup generic="TType extends TimePickerType">
import { useOutsideClick } from "@sit-onyx/headless";
import { iconClock, iconXSmall } from "@sit-onyx/icons";
import { computed, ref, useTemplateRef, watch, type Ref } from "vue";
import { useDensity } from "../../composables/density.js";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import { useForwardProps } from "../../utils/props.js";
import { parseTimeSeconds } from "../../utils/time.js";
import OnyxBasicPopover from "../OnyxBasicPopover/OnyxBasicPopover.vue";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxTimePickerGroup from "./OnyxTimePickerGroup.vue";
import OnyxTimePickerInput from "./OnyxTimePickerInput.vue";
import type { OnyxTimePickerProps, TimePickerType, TimeRange } from "./types.js";

type Segment = "hour" | "minute" | "second";
type ModelValueType = TType extends "range" ? TimeRange : string;
type Props = OnyxTimePickerProps<TType>;

const props = withDefaults(defineProps<Props>(), {
  type: () => "default" as TType,
  open: undefined,
  popoverOptions: () => ({ fitParent: true }),
});

const { locale } = injectI18n();
const showAmPm = computed(() => {
  if (props.showAmPm !== "auto") {
    return props.showAmPm;
  }
  return new Intl.DateTimeFormat(locale.value, { hour: "numeric" }).resolvedOptions().hour12;
});

const emit = defineEmits<{
  /**
   * Emitted when modelValue changes
   */
  "update:modelValue": [value?: ModelValueType];
  /**
   * Emitted when the open state changes
   */
  "update:open": [open: boolean];
}>();

const modelValue = useVModel<Props, "modelValue", ModelValueType | undefined>({
  props,
  emit,
  key: "modelValue",
});

const { t } = injectI18n();
const { densityClass } = useDensity(props);
const open = useVModel({
  props,
  emit,
  key: "open",
  default: false,
}) as unknown as Ref<boolean>;

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

const minTimeSeconds = computed(() => parseTimeSeconds(props.min));
const maxTimeSeconds = computed(() => parseTimeSeconds(props.max));

const clampTime = (time?: string): string | undefined => {
  if (!time) return time;
  const currentTotalSeconds = partsToTotalSeconds(time.split(":"));

  const min = minTimeSeconds.value ?? 0;
  const max = maxTimeSeconds.value ?? partsToTotalSeconds(["23", "59", "59"]);
  const clampedTotalSeconds = Math.min(Math.max(currentTotalSeconds, min), max);

  const clampedParts = totalSecondsToParts(clampedTotalSeconds);
  return clampedParts.slice(0, props.showSeconds ? undefined : 2).join(":");
};

const startTime = computed<string | undefined>({
  get: () => {
    if (modelValue.value && typeof modelValue.value === "object") {
      return modelValue.value.from;
    }
    return undefined;
  },
  set: (newValue) => {
    if (props.type !== "range") return;
    const to = modelValue.value && typeof modelValue.value === "object" ? modelValue.value.to : "";

    modelValue.value = {
      from: newValue || "",
      to,
    } as typeof modelValue.value;
  },
});

const endTime = computed<string | undefined>({
  get: () => {
    if (modelValue.value && typeof modelValue.value === "object") {
      return modelValue.value.to;
    }
    return undefined;
  },
  set: (newValue) => {
    if (props.type !== "range") return;
    const from =
      modelValue.value && typeof modelValue.value === "object" ? modelValue.value.from : "";
    modelValue.value = { from, to: newValue || "" } as typeof modelValue.value;
  },
});

const updateModelValue = (newParts: string[]) => {
  const timeString = newParts.join(":");
  const clampedTime = clampTime(timeString);
  modelValue.value = clampedTime as typeof modelValue.value;
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
};

useOutsideClick({
  inside: root,
  onOutsideClick: () => (open.value = false),
  checkOnTab: true,
});

const showClearButton = computed(() => {
  let hasValue = false;

  if (props.type === "range") {
    if (typeof modelValue.value === "object" && modelValue.value) {
      hasValue = !!(modelValue.value.from || modelValue.value.to);
    }
  } else {
    hasValue = !!modelValue.value;
  }

  return (isFocused.value || open.value) && hasValue && !props.hideClearIcon;
});

const handleModelUpdate = (value?: string) => {
  if (props.type !== "range" && value) {
    updateModelValue(value.split(":"));
  }
};

const handleRangeModelUpdate = (group: "start" | "end", value?: string) => {
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

const inputValue = computed(() => {
  if (props.type === "range" && typeof modelValue.value === "object" && modelValue.value) {
    const { from, to } = modelValue.value;
    if (!from && !to) return undefined;
    return `${from || ""} - ${to || ""}`;
  }
  return modelValue.value;
});

const singleModelValue = computed(() => {
  return typeof modelValue.value === "string" ? modelValue.value : undefined;
});

const handleInputUpdate = (value?: string) => {
  if (props.type === "range") {
    if (!value) {
      modelValue.value = undefined;
      return;
    }
    const [from, to] = value.split("-").map((s) => s.trim());
    modelValue.value = { from: from || "", to: to || "" } as typeof modelValue.value;
  } else {
    modelValue.value = value as typeof modelValue.value;
  }
};

const rangeError = ref<string>();
const error = computed(() => props.error ?? rangeError.value);

watch(open, (isOpen) => {
  if (isOpen || props.type !== "range") return;

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
const timePickerGroupProps = useForwardProps(props, OnyxTimePickerGroup);
</script>

<template>
  <div ref="rootRef" :class="['onyx-component', 'onyx-time-picker', densityClass]">
    <OnyxBasicPopover
      class="onyx-time-picker__popover"
      :label="t('timePicker.labels.popover')"
      v-bind="props.popoverOptions"
      :open="open"
    >
      <template #default>
        <OnyxTimePickerInput
          class="onyx-time-picker__input"
          :class="{ 'onyx-time-picker__input--show-focused': open || isFocused }"
          v-bind="inputProps"
          :show-am-pm="showAmPm"
          :label="props.label"
          :model-value="inputValue"
          :error="error"
          :placeholder="placeholder"
          :step="props.type === 'range' ? undefined : props.showSeconds ? 1 : 60"
          @update:model-value="handleInputUpdate"
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
              @click="modelValue = undefined as typeof modelValue"
            >
              <OnyxIcon :icon="iconXSmall" color="neutral" />
            </button>
            <OnyxIcon
              v-else
              :icon="iconClock"
              color="neutral"
              :class="['onyx-time-picker__clock-icon']"
            />
          </template>
        </OnyxTimePickerInput>
      </template>

      <template #content>
        <div class="onyx-time-picker__wrapper" tabindex="-1">
          <template v-if="props.type === 'range'">
            <OnyxHeadline is="h3" class="onyx-time-picker__range-label">
              {{ t("timePicker.labels.from") }}
            </OnyxHeadline>

            <OnyxTimePickerGroup
              ref="startTimePickerGroupRef"
              v-bind="timePickerGroupProps"
              :show-am-pm="showAmPm"
              :model-value="startTime"
              autofocus
              :show-seconds="props.showSeconds"
              @update:model-value="handleRangeModelUpdate('start', $event)"
              @jump-segment="(segment, direction) => jumpSegment(segment, direction, 'start')"
            />
            <OnyxHeadline is="h3" class="onyx-time-picker__range-label">
              {{ t("timePicker.labels.to") }}
            </OnyxHeadline>
            <OnyxTimePickerGroup
              ref="endTimePickerGroupRef"
              v-bind="timePickerGroupProps"
              :show-am-pm="showAmPm"
              :model-value="endTime"
              @update:model-value="handleRangeModelUpdate('end', $event)"
              @jump-segment="(segment, direction) => jumpSegment(segment, direction, 'end')"
            />
          </template>

          <OnyxTimePickerGroup
            v-else
            ref="timePickerGroupRef"
            autofocus
            v-bind="timePickerGroupProps"
            :show-am-pm="showAmPm"
            :model-value="singleModelValue"
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
    :has(.onyx-time-picker__input--show-focused) {
      .onyx-time-picker__clock-icon {
        --icon-color: var(--onyx-color-text-icons-primary-intense);
      }
      .onyx-form-element-v2__input-container {
        border-color: var(--onyx-form-element-v2-border-color-focus);
        outline: var(--onyx-outline-width) solid var(--onyx-form-element-v2-outline-color);
      }
    }
  }
}
</style>
