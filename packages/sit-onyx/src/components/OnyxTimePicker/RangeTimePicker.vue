<script lang="ts" setup>
import { iconClock, iconXSmall } from "@sit-onyx/icons";
import { computed, reactive, ref, toRaw, useTemplateRef, watch } from "vue";
import { useAutofocus } from "../../composables/useAutoFocus.js";
import { useFormElementError } from "../../composables/useFormElementError.js";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import { mergeVueProps, useRootAttrs } from "../../utils/attrs.js";
import { useForwardProps } from "../../utils/props.js";
import { useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxFormElementAction from "../OnyxFormElementAction/OnyxFormElementAction.vue";
import OnyxFormElementV2 from "../OnyxFormElementV2/OnyxFormElementV2.vue";
import type { FormElementV2PopoverOptions } from "../OnyxFormElementV2/types.js";
import { customMessageToFormElementV2Message } from "../OnyxFormElementV2/useLegacyFormElementProps.js";
import TimePickerGroup, { type Segment } from "./TimePickerGroup.vue";
import type { OnyxTimePickerProps } from "./types.js";
import { createTimeString, parseTimeString } from "./utils.js";

const props = withDefaults(defineProps<OnyxTimePickerProps>(), {
  open: undefined,
});

const emit = defineEmits<{
  /**
   * Emitted when modelValue changes.
   */
  "update:modelValue": [value?: string];
  /**
   * Emitted when the open state changes.
   */
  "update:open": [open: boolean];
  /**
   * Emitted when the validity state of the input changes.
   */
  validityChange: [validity: ValidityState];
}>();

const modelValue = useVModel({
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

defineOptions({ inheritAttrs: false });
const { rootAttrs, restAttrs } = useRootAttrs();
const formElementV2Props = useForwardProps(props, OnyxFormElementV2);

const { vCustomValidity, errorMessages } = useFormElementError({
  props: reactive({ ...props, type: "text" }),
  emit,
  error: computed(() => props.error),
});

const { t } = injectI18n();
const { disabled } = useFormContext(props);

const input = useTemplateRef("input");
useAutofocus(input, props);

const inputValue = computed(() => {
  if (!modelValue.value || typeof modelValue.value !== "object") return;

  let from = modelValue.value.from ?? "";
  let to = modelValue.value.to ?? "";

  // helper to format a single 24h string into a 12h string with a suffix
  const formatForAmPm = (timeString: string) => {
    if (!timeString) return "";
    const { hours, minutes, seconds } = parseTimeString(props.showSeconds, timeString);
    const suffix = hours >= 12 ? t.value("timePicker.labels.pm") : t.value("timePicker.labels.am");

    // convert 24h to 12h format (0 becomes 12, 13 becomes 1, etc.)
    const displayHours = hours % 12 || 12;

    const time = createTimeString(displayHours, minutes, seconds, props.showSeconds);
    return `${time}${suffix}`;
  };

  // Apply the formatting if the prop is true
  if (props.showAmPm) {
    if (from) from = formatForAmPm(from);
    if (to) to = formatForAmPm(to);
  }

  if (!from && !to) return "";
  return `${from} - ${to}`;
});

const placeholder = computed(() => {
  const timePlaceholder = [
    t.value("timePicker.placeholder.hour"),
    t.value("timePicker.placeholder.minute"),
    ...(props.showSeconds ? [t.value("timePicker.placeholder.second")] : []),
  ].join(":");

  return `${timePlaceholder} - ${timePlaceholder}`;
});

const popoverOptions = computed<FormElementV2PopoverOptions | undefined>(() => {
  const options: FormElementV2PopoverOptions = {
    fitParent: true,
    label: t.value("timePicker.labels.popover"),
  };
  if (disabled.value || props.readonly) options.disabled = true;
  return { ...options, ...props.popoverOptions };
});

const focusedFromSegment = ref<Segment | undefined>("hours");
const focusedToSegment = ref<Segment>();

// reset focus when popover closes
watch(open, (newOpen) => {
  if (!newOpen) {
    focusedFromSegment.value = "hours";
    focusedToSegment.value = undefined;
  }
});

watch(focusedFromSegment, (newValue) => {
  if (newValue) focusedToSegment.value = undefined;
});
watch(focusedToSegment, (newValue) => {
  if (newValue) focusedFromSegment.value = undefined;
});

const handleJumpSegmentFocus = (direction: "next" | "previous") => {
  const segments: Segment[] = ["hours", "minutes"];
  if (props.showSeconds) segments.push("seconds");

  const sequence = [
    ...segments.map((segment) => ({ group: "from", segment })),
    ...segments.map((segment) => ({ group: "to", segment })),
  ];

  const currentIndex = sequence.findIndex(
    (item) =>
      (item.group === "from" && item.segment === focusedFromSegment.value) ||
      (item.group === "to" && item.segment === focusedToSegment.value),
  );

  const nextIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;

  // handle the auto-close boundary
  if (nextIndex >= sequence.length) {
    open.value = false;
    return;
  }

  if (nextIndex >= 0) {
    const target = sequence[nextIndex]!;
    focusedFromSegment.value = target.group === "from" ? target.segment : undefined;
    focusedToSegment.value = target.group === "to" ? target.segment : undefined;
  }
};

const range = computed(() => {
  if (!modelValue.value || typeof modelValue.value !== "object") return;
  return modelValue.value;
});

const handleUpdateValue = (type: "from" | "to", newValue?: string) => {
  const currentValue = structuredClone(toRaw(range.value)) ?? { from: "", to: "" };
  if (type === "from") currentValue.from = newValue ?? "";
  if (type === "to") currentValue.to = newValue ?? "";
  modelValue.value = currentValue;
};

defineExpose({ input });
</script>

<template>
  <OnyxFormElementV2
    v-bind="mergeVueProps(rootAttrs, formElementV2Props)"
    v-model:open="open"
    :label="props.label"
    class="onyx-time-picker"
    :error="customMessageToFormElementV2Message(errorMessages)"
    :popover-options
  >
    <template #default="inputProps">
      <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -- is provided via inputProps -->
      <input
        v-bind="mergeVueProps(inputProps, restAttrs)"
        ref="input"
        v-custom-validity
        :value="inputValue"
        type="text"
        :required="props.required"
        :autofocus="props.autofocus"
        :name="props.name"
        :readonly="props.readonly"
        :disabled="disabled || props.loading"
        :placeholder
      />
    </template>

    <template #trailingIcons>
      <OnyxFormElementAction
        v-if="modelValue && !props.hideClearIcon"
        :label="t('input.clear')"
        :icon="iconXSmall"
        show-on-focus
        @click="modelValue = undefined"
      />

      <OnyxFormElementAction
        :label="t('select.toggleDropDown')"
        :icon="iconClock"
        :disabled="disabled || props.readonly || props.loading"
        highlighted="auto"
        @click="open = !open"
      />
    </template>

    <template #popover>
      <div class="onyx-time-picker__wrapper" tabindex="-1">
        <TimePickerGroup
          v-model:focused-segment="focusedFromSegment"
          :headline="t('timePicker.labels.from')"
          :show-seconds="props.showSeconds"
          :show-am-pm="props.showAmPm"
          :model-value="range?.from"
          @update:model-value="handleUpdateValue('from', $event)"
          @jump-segment-focus="handleJumpSegmentFocus"
        />

        <TimePickerGroup
          v-model:focused-segment="focusedToSegment"
          :headline="t('timePicker.labels.to')"
          :show-seconds="props.showSeconds"
          :show-am-pm="props.showAmPm"
          :model-value="range?.to"
          @update:model-value="handleUpdateValue('to', $event)"
          @jump-segment-focus="handleJumpSegmentFocus"
        />
      </div>
    </template>
  </OnyxFormElementV2>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-time-picker {
  @include layers.component() {
    &__wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: var(--onyx-density-lg);
      padding: var(--onyx-density-xs) var(--onyx-density-sm);
    }
  }
}
</style>
