<script lang="ts" setup>
import { CLOSING_KEYS, OPENING_KEYS } from "@sit-onyx/headless";
import { iconChevronDownSmall } from "@sit-onyx/icons";
import { computed, reactive, ref, useTemplateRef, watch } from "vue";
import { useAutofocus } from "../../composables/useAutoFocus.js";
import {
  useFormElementError,
  type CustomMessageType,
} from "../../composables/useFormElementError.js";
import { SKELETON_INJECTED_SYMBOL } from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n, type FormElementV2Tooltip } from "../../index.js";
import { mergeVueProps, useRootAttrs } from "../../utils/attrs.js";
import { useForwardProps } from "../../utils/props.js";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxFormElementV2 from "../OnyxFormElementV2/OnyxFormElementV2.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxSelect from "../OnyxSelect/OnyxSelect.vue";
import type { OnyxTimePickerProps, TimePickerType } from "./types.js";

const props = withDefaults(
  defineProps<
    OnyxTimePickerProps<TimePickerType> & {
      /**
       * Defines the granularity of the time input in seconds.
       */
      step?: number;
      /**
       * Placeholder for the input
       */
      placeholder?: string;
    }
  >(),
  {
    required: false,
    readonly: false,
    loading: false,
    showAmPm: false,
    skeleton: SKELETON_INJECTED_SYMBOL,
    disabled: FORM_INJECTED_SYMBOL,
    showError: FORM_INJECTED_SYMBOL,
    requiredMarker: FORM_INJECTED_SYMBOL,
    reserveMessageSpace: FORM_INJECTED_SYMBOL,
    step: 0,
    placeholder: "",
  },
);

const emit = defineEmits<{
  /**
   * Dependent on `type` the string is:
   * - "HH:MM:SS"
   */
  "update:modelValue": [value?: string];
  /**
   * Emitted when the input changes focus.
   */
  "update:isFocused": [focused: boolean];
  /**
   * Emitted when the input is clicked or focused and enter is pressed.
   */
  "update:open": [];
  /**
   * Emitted when the validity state of the input changes.
   */
  validityChange: [validity: ValidityState];
}>();

defineOptions({ inheritAttrs: false });
const { rootAttrs, restAttrs } = useRootAttrs();
const error = computed(() => props.error);
const mappedProps = reactive({
  ...props,
  type: computed(() => (props.type === "range" ? "text" : "date")),
});
const { vCustomValidity, errorMessages } = useFormElementError({
  props: mappedProps,
  emit,
  error,
});
const { t } = injectI18n();
//TODO: Question: Why is it not working for showError = touched
const { disabled } = useFormContext(props);
const formElementProps = useForwardProps(props, OnyxFormElementV2);

/**
 * Ensures that the native input only receives "HH:MM" or "HH:MM:SS".
 */
const sanitizeForNativeInput = (val: string | undefined): string => {
  if (typeof val !== "string") return "";
  if (props.showSeconds) {
    const match = val.match(/^\d{2}:\d{2}(?::\d{2})?/);
    return match ? match[0] : "";
  }

  const match = val.match(/^\d{2}:\d{2}/);
  return match ? match[0] : "";
};

const modelValue = useVModel({
  props,
  emit,
  key: "modelValue",
});

const timeSuffix = ref("am");

watch(
  modelValue,
  (newVal) => {
    if (props.type === "range" || !newVal) return;

    const timeString = newVal as string;
    const h = parseInt(timeString.split(":")[0] || "0", 10);

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
  if (props.type === "range") return;
  if (!modelValue.value || !props.showAmPm) return;

  const parts = (modelValue.value as string).split(":");
  if (!parts || !parts[0]) return;
  let h = parseInt(parts[0], 10);
  const m = parts[1] || "00";
  const s = parts[2] || "00";

  let changed = false;
  if (newSuffix === "pm" && h < 12) {
    h += 12;
    changed = true;
  } else if (newSuffix === "am" && h >= 12) {
    h -= 12;
    changed = true;
  }

  if (changed) {
    const hh = h.toString().padStart(2, "0");
    modelValue.value = `${hh}:${m}${props.showSeconds ? `:${s}` : ""}`;
  }
});

const value = computed({
  get: () => {
    const strVal = modelValue.value as string | undefined;
    if (!strVal) return "";
    if (props.type === "range") {
      if (props.showAmPm) {
        const times = strVal.split("-").map((t) => t.trim());

        const formattedTimes = times.map((timeStr) => {
          if (!timeStr) return "";
          const parts = timeStr.split(":");
          if (!parts || !parts[0]) return timeStr;

          const h = Number.parseInt(parts[0], 10);
          if (Number.isNaN(h)) return timeStr;

          const suffix =
            h >= 12 ? t.value("timePicker.labels.pm") : t.value("timePicker.labels.am");
          let displayHours = h % 12;
          if (displayHours === 0) displayHours = 12;

          const hh = displayHours.toString().padStart(2, "0");
          const mm = parts[1] || "00";
          const ss = props.showSeconds && parts[2] ? `:${parts[2]}` : "";

          return `${hh}:${mm}${ss}${suffix}`;
        });

        return formattedTimes.join(" - ");
      }
      return strVal.replace("-", " - ");
    }

    if (!props.showAmPm) return sanitizeForNativeInput(strVal);

    const parts = strVal.split(":");
    if (!parts || !parts[0]) return;
    const h = Number.parseInt(parts[0], 10);
    const m = parts[1] || "00";
    const s = parts[2] || "00";

    let displayHours = h % 12;
    if (displayHours === 0) displayHours = 12;

    const hh = displayHours.toString().padStart(2, "0");
    const mm = m.padStart(2, "0");
    const ss = props.showSeconds ? `:${s.padStart(2, "0")}` : "";

    return `${hh}:${mm}${ss}`;
  },
  set: (newValue) => {
    const inputVal = String(newValue);
    const match = inputVal.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?/);
    if (match && match[1]) {
      let h = Number.parseInt(match[1], 10);
      const m = match[2];
      const s = match[3] || "00";

      if (props.showAmPm && timeSuffix.value === "pm" && h < 12) {
        h += 12;
      } else if (props.showAmPm && timeSuffix.value === "am" && h === 12) {
        h = 0;
      }

      const hh = h.toString().padStart(2, "0");
      modelValue.value = `${hh}:${m}${props.showSeconds ? `:${s}` : ""}`;
    }
  },
});

const sanitizedMin = computed(() => sanitizeForNativeInput(props.min as string | undefined));
const sanitizedMax = computed(() => sanitizeForNativeInput(props.max as string | undefined));

defineSlots<{
  /**
   * Icon content.
   */
  icon(): unknown;
}>();

useAutofocus(useTemplateRef("input"), props);

const navigationalKeys = new Set(OPENING_KEYS.concat(CLOSING_KEYS));
const blockTyping = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    event.preventDefault();
    emit("update:open");
    return;
  }
  if (navigationalKeys.has(event.key) || props.type !== "range") return;
  event.preventDefault();
};

const messageToFormElementProps = (
  message?: CustomMessageType,
): string | FormElementV2Tooltip | undefined => {
  if (!message) return;
  if (typeof message === "string") return message;
  if (message.hidden) return;
  return { label: message.shortMessage, tooltipText: message.longMessage };
};
</script>

<template>
  <OnyxFormElementV2
    v-bind="mergeVueProps(rootAttrs, formElementProps)"
    :label="props.label"
    :error="messageToFormElementProps(errorMessages)"
    class="onyx-time-picker-input"
  >
    <template #default="inputProps">
      <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -- is provided via inputProps -->
      <input
        v-bind="mergeVueProps(inputProps, restAttrs)"
        ref="input"
        v-model="value"
        v-custom-validity
        :type="props.type === 'range' ? 'text' : 'time'"
        :placeholder="props.placeholder"
        :required="props.required"
        :autofocus="props.autofocus"
        :name="props.name"
        :readonly="props.readonly"
        :disabled="disabled || props.loading"
        :step="props.step"
        :max="sanitizedMax"
        :min="sanitizedMin"
        @keydown.space.prevent
        @focus="emit('update:isFocused', true)"
        @blur="emit('update:isFocused', false)"
        @click="emit('update:open')"
        @paste="(e) => props.type === 'range' && e.preventDefault()"
        @keydown="blockTyping"
      />
    </template>

    <template #trailingIcons>
      <slot name="icon"></slot>
    </template>

    <template v-if="props.showAmPm && props.type === 'default'" #trailing>
      <OnyxSelect
        v-model="timeSuffix"
        :label="t('timePicker.labels.timeSuffix')"
        :list-label="t('timePicker.labels.timeSuffix')"
        hide-label
        :options="[
          { label: t('timePicker.labels.am'), value: 'am' },
          { label: t('timePicker.labels.pm'), value: 'pm' },
        ]"
      >
        <template #toggleIcon>
          <OnyxIcon :icon="iconChevronDownSmall" />
        </template>
      </OnyxSelect>
    </template>
  </OnyxFormElementV2>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";
@use "../../styles/mixins/input.scss";

.onyx-time-picker-input,
.onyx-time-picker-input-skeleton {
  @include layers.component() {
    --onyx-time-picker-padding-vertical: var(--onyx-density-xs);
  }
}

.onyx-time-picker-input-skeleton {
  @include layers.component() {
    @include input.define-skeleton-styles(
      $height: calc(1lh + 2 * var(--onyx-time-picker-padding-vertical))
    );
  }
}

.onyx-time-picker-input {
  @include layers.component() {
    @include input.define-shared-styles(
      $base-selector: ".onyx-time-picker-input",
      $vertical-padding: var(--onyx-time-picker-padding-vertical)
    );
    &__wrapper {
      width: 100%;
    }
    &__native {
      &::-webkit-calendar-picker-indicator {
        cursor: pointer;
      }
      &[type="text"] {
        cursor: pointer;
        user-select: none;
        caret-color: transparent;

        &:focus {
          caret-color: transparent;
        }
      }
    }
  }
}
</style>
