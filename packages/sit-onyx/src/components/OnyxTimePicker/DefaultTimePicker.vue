<script lang="ts" setup>
import { iconChevronDownSmall, iconClock, iconXSmall } from "@sit-onyx/icons";
import { computed, reactive, ref, useTemplateRef } from "vue";
import { useAutofocus } from "../../composables/useAutoFocus.js";
import { useFormElementError } from "../../composables/useFormElementError.js";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import { mergeVueProps, useRootAttrs } from "../../utils/attrs.js";
import { useForwardProps } from "../../utils/props.js";
import { useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxFormElementAction from "../OnyxFormElementAction/OnyxFormElementAction.vue";
import OnyxFormElementV2 from "../OnyxFormElementV2/OnyxFormElementV2.vue";
import { customMessageToFormElementV2Message } from "../OnyxFormElementV2/useLegacyFormElementProps.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxSelect from "../OnyxSelect/OnyxSelect.vue";
import type { OnyxTimePickerProps } from "./types.js";
import { sanitizeTimeForNativeInput } from "./utils.js";

const props = withDefaults(defineProps<OnyxTimePickerProps>(), {
  open: undefined,
});

const emit = defineEmits<{
  /**
   * Emitted when modelValue changes.
   */
  "update:modelValue": [value?: string];
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

defineOptions({ inheritAttrs: false });
const { rootAttrs, restAttrs } = useRootAttrs();
const formElementV2Props = useForwardProps(props, OnyxFormElementV2);

const { vCustomValidity, errorMessages } = useFormElementError({
  props: reactive({ ...props, type: "date" }),
  emit,
  error: computed(() => props.error),
});

const { t } = injectI18n();
const { disabled } = useFormContext(props);

const input = useTemplateRef("input");
useAutofocus(input, props);

const min = computed(() => sanitizeTimeForNativeInput(props.min, props.showSeconds));
const max = computed(() => sanitizeTimeForNativeInput(props.max, props.showSeconds));

const inputValue = computed({
  get: () => {
    if (typeof modelValue.value !== "string") return;
    return sanitizeTimeForNativeInput(modelValue.value, props.showSeconds);
  },
  set: (newValue) => {
    const time = sanitizeTimeForNativeInput(newValue, props.showSeconds);

    const [hours = 0, minutes = 0, seconds = 0] = time.split(":");
    const hh = hours.toString().padStart(2, "0");
    const mm = minutes.toString().padStart(2, "0");
    const ss = seconds.toString().padStart(2, "0");

    modelValue.value = `${hh}:${mm}${props.showSeconds ? `:${ss}` : ""}`;
  },
});

const handleIconClick = () => {
  try {
    input.value?.showPicker();
  } catch {
    // noop
  }
};

// TODO: handle AM/PM change
const timeSuffix = ref<"am" | "pm">("am");

defineExpose({ input });
</script>

<template>
  <OnyxFormElementV2
    v-bind="mergeVueProps(rootAttrs, formElementV2Props)"
    :label="props.label"
    class="onyx-time-picker"
    :error="customMessageToFormElementV2Message(errorMessages)"
  >
    <template #default="inputProps">
      <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -- is provided via inputProps -->
      <input
        v-bind="mergeVueProps(inputProps, restAttrs)"
        ref="input"
        v-model="inputValue"
        v-custom-validity
        type="time"
        :required="props.required"
        :autofocus="props.autofocus"
        :name="props.name"
        :readonly="props.readonly"
        :disabled="disabled || props.loading"
        :step="props.showSeconds ? 1 : 60"
        :min
        :max
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
        @click="handleIconClick"
      />
    </template>

    <template v-if="props.showAmPm" #trailing>
      <OnyxSelect
        v-model="timeSuffix"
        :label="t('timePicker.labels.timeSuffix')"
        :list-label="t('timePicker.labels.timeSuffix')"
        hide-label
        hide-clear-icon
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
