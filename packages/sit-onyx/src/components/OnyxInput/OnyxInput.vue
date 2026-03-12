<script lang="ts" setup>
import { iconEye, iconEyeClosed } from "@sit-onyx/icons";
import { computed, useTemplateRef } from "vue";
import { useAutofocus } from "../../composables/useAutoFocus.js";
import {
  useFormElementError,
  type CustomMessageType,
} from "../../composables/useFormElementError.js";
import { useLenientMaxLengthValidation } from "../../composables/useLenientMaxLengthValidation.js";
import { SKELETON_INJECTED_SYMBOL } from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import { mergeVueProps, useRootAttrs } from "../../utils/attrs.js";
import { useForwardProps } from "../../utils/props.js";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxFormElementV2 from "../OnyxFormElementV2/OnyxFormElementV2.vue";
import type { FormElementV2Tooltip, OnyxFormElementV2Slots } from "../OnyxFormElementV2/types.js";
import OnyxInputAction from "./modules/OnyxInputAction.vue";
import type { OnyxInputProps } from "./types.js";

const props = withDefaults(defineProps<OnyxInputProps>(), {
  type: "text",
  required: false,
  autocapitalize: "sentences",
  readonly: false,
  loading: false,
  hideClearIcon: false,
  hideSuccessIcon: false,
  showPassword: undefined,
  skeleton: SKELETON_INJECTED_SYMBOL,
  disabled: FORM_INJECTED_SYMBOL,
  showError: FORM_INJECTED_SYMBOL,
  requiredMarker: FORM_INJECTED_SYMBOL,
  reserveMessageSpace: FORM_INJECTED_SYMBOL,
});

const emit = defineEmits<{
  /**
   * Emitted when the validity state of the input changes.
   */
  validityChange: [validity: ValidityState];
  /**
   * Emitted when the input changes
   */
  "update:modelValue": [value: string];
  /**
   * Emitted when the password visibility changes
   */
  "update:showPassword": [showPassword: boolean];
}>();

const slots = defineSlots<Omit<OnyxFormElementV2Slots, "default" | "popover" | "bottomRight">>();

/**
 * Current value of the input.
 */
const modelValue = useVModel({
  key: "modelValue",
  props,
  emit,
  default: "",
});

defineOptions({ inheritAttrs: false });
const { rootAttrs, restAttrs } = useRootAttrs();
const formElementV2Props = useForwardProps(props, OnyxFormElementV2);
const { t } = injectI18n();

const { maxLength, maxLengthError } = useLenientMaxLengthValidation({ modelValue, props });
const error = computed(() => props.error ?? maxLengthError.value);
const { vCustomValidity, errorMessages } = useFormElementError({ props, emit, error });

const patternSource = computed(() => {
  if (props.pattern instanceof RegExp) return props.pattern.source;
  return props.pattern;
});

const input = useTemplateRef("input");
defineExpose({ input });

const { disabled } = useFormContext(props);
useAutofocus(input, props);

const showPassword = useVModel({
  props,
  emit,
  key: "showPassword",
  default: false,
});

const displayType = computed(() => {
  if (props.type === "password" && showPassword.value) return "text";
  return props.type;
});

const messageToFormElementProps = (
  message?: CustomMessageType,
): string | FormElementV2Tooltip | undefined => {
  if (!message) return;
  if (typeof message === "string") return message;
  if (message.hidden) return;
  return { label: message.shortMessage, tooltipText: message.longMessage };
};

const counter = computed(() => {
  if (!props.withCounter || !props.maxlength) return;
  const length = modelValue.value.toString().length;
  const maxLength = typeof props.maxlength === "object" ? props.maxlength.max : props.maxlength;
  const violated = length > maxLength;
  return { length, maxLength, violated };
});
</script>

<template>
  <OnyxFormElementV2
    v-bind="mergeVueProps(formElementV2Props, rootAttrs)"
    :label="{
      label: props.label,
      tooltipText: props.labelTooltip,
      hidden: props.hideLabel,
    }"
    :message="messageToFormElementProps(props.message)"
    :error="messageToFormElementProps(errorMessages)"
    :success="messageToFormElementProps(props.success)"
  >
    <template #default="inputProps">
      <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -- label is associated by "inputProps" -->
      <input
        v-bind="mergeVueProps(inputProps, restAttrs)"
        ref="input"
        v-model="modelValue"
        v-custom-validity
        :placeholder="props.placeholder"
        :type="displayType"
        :required="props.required"
        :autocapitalize="props.autocapitalize"
        :autocomplete="props.autocomplete"
        :autofocus="props.autofocus"
        :name="props.name"
        :pattern="patternSource"
        :readonly="props.readonly"
        :disabled="disabled || props.loading"
        :maxlength="maxLength"
        :minlength="props.minlength"
      />
    </template>

    <template #leadingIcons>
      <!-- TODO: show clear button -->
      <!-- TODO: check success icon - maybe implement in FormElementV2 -->
    </template>

    <!-- pre-defined slots, will be overridden with the v-for below if user has passed a custom slot -->
    <template v-if="counter" #bottomRight>
      <span :class="['onyx-input__counter', { 'onyx-input__counter--violated': counter.violated }]">
        {{ counter.length }}/{{ counter.maxLength }}
      </span>
    </template>

    <template v-if="props.type === 'password'" #trailing>
      <OnyxInputAction
        :icon="showPassword ? iconEyeClosed : iconEye"
        :label="showPassword ? t('input.hidePassword') : t('input.showPassword')"
        @click="showPassword = !showPassword"
      />
    </template>

    <template v-for="(slot, slotName) in slots" :key="slotName" #[slotName]>
      <component :is="slot" />
    </template>
  </OnyxFormElementV2>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-input {
  @include layers.component() {
    &__counter {
      &--violated {
        color: var(--onyx-color-text-icons-danger-intense);
      }
    }
  }
}
</style>
