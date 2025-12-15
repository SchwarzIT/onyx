<script lang="ts" setup>
import { useOutsideClick } from "@sit-onyx/headless";
import { iconCircleInformation, iconClock } from "@sit-onyx/icons";
import { computed, ref, useTemplateRef, type Ref } from "vue";
import { SKELETON_INJECTED_SYMBOL } from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import OnyxBasicPopover from "../OnyxBasicPopover/OnyxBasicPopover.vue";
import { FORM_INJECTED_SYMBOL } from "../OnyxForm/OnyxForm.core.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import OnyxStepper from "../OnyxStepper/OnyxStepper.vue";
import OnyxTimepickerInput from "./OnyxTimepickerInput.vue";
import type { OnyxTimepickerProps } from "./types.js";

type Segment = "hour" | "minute" | "second";

type InputRef = {
  input: { focus: () => void; select: () => void } & HTMLInputElement;
};

const props = withDefaults(defineProps<OnyxTimepickerProps>(), {
  showSeconds: false,
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
  "update:modelValue": [value?: string];
}>();

const { t } = injectI18n();
const modelValue = useVModel({ props, emit, key: "modelValue" });
const open = ref(false);

const hourInputRef = useTemplateRef<InputRef>("hourInputTemplateRef");
const minuteInputRef = useTemplateRef<InputRef>("minuteInputTemplateRef");
const secondInputRef = useTemplateRef<InputRef>("secondInputTemplateRef");
const rootRef = useTemplateRef("rootTemplateRef");

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
  const partsToKeep: string[] = [];

  partsToKeep.push(newParts[0] ?? "00");
  partsToKeep.push(newParts[1] ?? "00");

  if (props.showSeconds) {
    partsToKeep.push(newParts[2] ?? "00");
  }

  modelValue.value = partsToKeep.join(":");
};

const clampValue = (value: number, max: number) => {
  if (value > max) return max;
  if (value < 0) return 0;
  return value;
};

const createSegmentComputed = (index: 0 | 1 | 2, segmentName: Segment) =>
  computed<number | null>({
    get: () => {
      if (!isSegmentVisible(segmentName) || !modelValue.value) return null;
      return parseInt(timeParts.value[index] ?? "00");
    },
    set: (newValue: number | null) => {
      if (!isSegmentVisible(segmentName) || newValue === null) return;

      const max = segmentName === "hour" ? 23 : 59;

      const clampedValue = clampValue(newValue, max);

      const parts = [...timeParts.value];
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

const inputProps = computed(() => {
  const {
    modelValue: _,
    showSeconds: __,
    infoLabel: ___,
    hideInfoLabelIcon: ____,
    ...others
  } = props;
  return others;
});
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
          :model-value="modelValue"
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
  }
  .onyx-icon {
    cursor: pointer;
    &--neutral {
      --icon-color: var(--onyx-color-text-icons-neutral-soft);
    }
  }
}
</style>
