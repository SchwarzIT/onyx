<script lang="ts" setup>
import { iconCheckSmall, iconClock, iconXSmall } from "@sit-onyx/icons";
import { computed, useTemplateRef } from "vue";
import { useDensity } from "../../composables/density.js";
import { useAutofocus } from "../../composables/useAutoFocus.js";
import { useErrorClass } from "../../composables/useErrorClass.js";
import { getFormMessages, useFormElementError } from "../../composables/useFormElementError.js";
import { useLenientMaxLengthValidation } from "../../composables/useLenientMaxLengthValidation.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import { useRootAttrs } from "../../utils/attrs.js";
import { useForwardProps } from "../../utils/props.js";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxFormElement from "../OnyxFormElement/OnyxFormElement.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxInputProps } from "../OnyxInput/types.js";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import OnyxSeparator from "../OnyxSeparator/OnyxSeparator.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";

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

const slots = defineSlots<{
  /**
   * Inline content rendered before the actual input area.
   * Careful when using this slot, as it will shrink the space of the input.
   */
  leading?(): unknown;
  /**
   * Inline content rendered after the actual input area.
   * Careful when using this slot, as it will shrink the space of the input.
   */
  trailing?(): unknown;
}>();

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
const formElementProps = useForwardProps(props, OnyxFormElement);

const { t } = injectI18n();
const { maxLength, maxLengthError } = useLenientMaxLengthValidation({ modelValue, props });
const error = computed(() => props.error ?? maxLengthError.value);
const { vCustomValidity, errorMessages } = useFormElementError({ props, emit, error });
const successMessages = computed(() => getFormMessages(props.success));
const messages = computed(() => getFormMessages(props.message));

const { densityClass } = useDensity(props);

const input = useTemplateRef("inputRef");
defineExpose({ input });

const { disabled, showError } = useFormContext(props);
const skeleton = useSkeletonContext(props);
const errorClass = useErrorClass(showError);
useAutofocus(input, props);
</script>

<template>
  <div
    v-if="skeleton"
    :class="['onyx-component', 'onyx-input-skeleton', densityClass]"
    v-bind="rootAttrs"
  >
    <OnyxSkeleton v-if="!props.hideLabel" class="onyx-input-skeleton__label" />
    <OnyxSkeleton class="onyx-input-skeleton__input" />
  </div>

  <div
    v-else
    :class="['onyx-component', 'onyx-input', densityClass, errorClass]"
    v-bind="rootAttrs"
  >
    <OnyxFormElement
      v-bind="formElementProps"
      :error-messages="errorMessages"
      :success-messages="successMessages"
      :message="messages"
    >
      <template #default="{ id: inputId }">
        <div class="onyx-input__wrapper">
          <slot name="leading"></slot>
          <OnyxSeparator
            v-if="slots.leading"
            orientation="vertical"
            class="onyx-input__separator onyx-input__separator--leading"
          />
          <OnyxLoadingIndicator v-if="props.loading" class="onyx-input__loading" type="circle" />
          <input
            :id="inputId"
            ref="inputRef"
            v-model="modelValue"
            v-custom-validity
            :placeholder="props.placeholder"
            class="onyx-input__native"
            type="text"
            :required="props.required"
            :autocapitalize="props.autocapitalize"
            :autocomplete="props.autocomplete"
            :autofocus="props.autofocus"
            :name="props.name"
            :readonly="props.readonly"
            :disabled="disabled || props.loading"
            :maxlength="maxLength"
            :minlength="props.minlength"
            :aria-label="props.hideLabel ? props.label : undefined"
            :title="props.hideLabel ? props.label : undefined"
            v-bind="restAttrs"
          />
          <button
            v-if="!props.hideClearIcon && modelValue !== ''"
            type="button"
            class="onyx-input__clear"
            :aria-label="t('input.clear')"
            :title="t('input.clear')"
            tabindex="-1"
            @click="() => (modelValue = '')"
          >
            <OnyxIcon :icon="iconXSmall" />
          </button>

          <OnyxIcon
            v-if="!props.hideSuccessIcon && successMessages"
            class="onyx-input__check-icon"
            :icon="iconCheckSmall"
            color="success"
          />
          <OnyxIcon
            v-if="!(!props.hideSuccessIcon && successMessages)"
            :class="[
              'onyx-input__clock-icon',
              modelValue !== '' ? 'onyx-input__clock-icon--hide' : undefined,
            ]"
            :icon="iconClock"
          />
        </div>
      </template>
    </OnyxFormElement>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";
.onyx-input {
  &__clock-icon {
    --icon-color: var(--onyx-color-text-icons-neutral-soft);
  }
  &:has(&__wrapper:focus-within) {
    .onyx-input__clock-icon {
      --icon-color: var(--onyx-color-text-icons-primary-intense);
      &--hide {
        display: none;
      }
    }
  }
}
</style>
