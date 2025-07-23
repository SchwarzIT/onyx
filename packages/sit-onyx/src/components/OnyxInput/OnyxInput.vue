<script lang="ts" setup>
import checkSmall from "@sit-onyx/icons/check-small.svg?raw";
import eyeClosed from "@sit-onyx/icons/eye-closed.svg?raw";
import eye from "@sit-onyx/icons/eye.svg?raw";

import xSmall from "@sit-onyx/icons/x-small.svg?raw";
import { computed, ref, useTemplateRef } from "vue";
import { useDensity } from "../../composables/density.js";
import { useAutofocus } from "../../composables/useAutoFocus.js";
import { getFormMessages, useCustomValidity } from "../../composables/useCustomValidity.js";
import { useErrorClass } from "../../composables/useErrorClass.js";
import { useLenientMaxLengthValidation } from "../../composables/useLenientMaxLengthValidation.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import type { Nullable } from "../../types/index.js";
import { useRootAttrs } from "../../utils/attrs.js";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxFormElement from "../OnyxFormElement/OnyxFormElement.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import OnyxSystemButton from "../OnyxSystemButton/OnyxSystemButton.vue";
import type { OnyxInputProps } from "./types.js";

const props = withDefaults(defineProps<OnyxInputProps>(), {
  type: "text",
  required: false,
  autocapitalize: "sentences",
  readonly: false,
  loading: false,
  hideClearIcon: false,
  hideSuccessIcon: false,
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
  "update:modelValue": [value?: Nullable<string>];
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

const { t } = injectI18n();
const { maxLength, maxLengthError } = useLenientMaxLengthValidation({ modelValue, props });
const customError = computed(() => props.customError ?? maxLengthError.value);
const { vCustomValidity, errorMessages } = useCustomValidity({ props, emit, customError });
const successMessages = computed(() => getFormMessages(props.success));
const messages = computed(() => getFormMessages(props.message));

const { densityClass } = useDensity(props);

const patternSource = computed(() => {
  if (props.pattern instanceof RegExp) return props.pattern.source;
  return props.pattern;
});

const input = useTemplateRef("inputRef");
defineExpose({ input });

const { disabled, showError } = useFormContext(props);
const skeleton = useSkeletonContext(props);
const errorClass = useErrorClass(showError);
useAutofocus(input, props);
const showPassword = ref(false);
const displayType = computed(() => {
  if (props.type === "password" && showPassword.value) {
    return "text";
  }
  return props.type;
});
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
      v-bind="props"
      :error-messages="errorMessages"
      :success-messages="successMessages"
      :message="messages"
    >
      <template #default="{ id: inputId }">
        <div class="onyx-input__wrapper">
          <slot name="leading"></slot>
          <hr v-if="slots.leading" class="onyx-input__separator onyx-input__separator--leading" />
          <OnyxLoadingIndicator v-if="props.loading" class="onyx-input__loading" type="circle" />
          <input
            :id="inputId"
            ref="inputRef"
            v-model="modelValue"
            v-custom-validity
            :placeholder="props.placeholder"
            class="onyx-input__native"
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
            <OnyxIcon :icon="xSmall" />
          </button>

          <OnyxIcon
            v-if="!props.hideSuccessIcon && successMessages"
            class="onyx-input__check-icon"
            :icon="checkSmall"
            color="success"
          />

          <hr
            v-if="slots.trailing || props.type === 'password'"
            class="onyx-input__separator onyx-input__separator--trailing"
          />
          <slot name="trailing">
            <OnyxSystemButton
              v-if="props.type === 'password'"
              :icon="showPassword ? eyeClosed : eye"
              :label="showPassword ? t('input.hidePassword') : t('input.showPassword')"
              tabindex="-1"
              @click="showPassword = !showPassword"
            />
          </slot>
        </div>
      </template>
    </OnyxFormElement>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";
@use "../../styles/mixins/input.scss";

.onyx-input,
.onyx-input-skeleton {
  --onyx-input-padding-vertical: var(--onyx-density-xs);
}

.onyx-input-skeleton {
  @include input.define-skeleton-styles(
    $height: calc(1lh + 2 * var(--onyx-input-padding-vertical))
  );
}

.onyx-input {
  @include layers.component() {
    @include input.define-shared-styles(
      $base-selector: ".onyx-input",
      $vertical-padding: var(--onyx-input-padding-vertical)
    );
  }

  ::-webkit-search-cancel-button {
    display: none;
  }

  &__clear {
    height: 100%;
    margin: 0;
    padding: 0;

    display: flex;
    align-items: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: var(--onyx-color-text-icons-neutral-intense);

    &:hover {
      color: var(--onyx-color-text-icons-primary-intense);
    }
  }

  // hide clear icon when input is not focussed
  &:not(&:has(&__wrapper:focus-within)),
  &:has(&__native:read-only) {
    .onyx-input__clear {
      display: none;
    }
  }
}
</style>
