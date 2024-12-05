<script lang="ts" setup>
import checkSmall from "@sit-onyx/icons/check-small.svg?raw";
import xSmall from "@sit-onyx/icons/x-small.svg?raw";
import { computed } from "vue";
import { useDensity } from "../../composables/density";
import { getFormMessages, useCustomValidity } from "../../composables/useCustomValidity";
import { useErrorClass } from "../../composables/useErrorClass";
import { SKELETON_INJECTED_SYMBOL, useSkeletonContext } from "../../composables/useSkeletonState";
import { injectI18n } from "../../i18n";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core";
import OnyxFormElement from "../OnyxFormElement/OnyxFormElement.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxInputProps } from "./types";

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
});

const emit = defineEmits<{
  /**
   * Emitted when the current value changes.
   */
  "update:modelValue": [value: string];
  /**
   * Emitted when the validity state of the input changes.
   */
  validityChange: [validity: ValidityState];
}>();

const { t } = injectI18n();
const { vCustomValidity, errorMessages } = useCustomValidity({ props, emit });
const successMessages = computed(() => getFormMessages(props.success));
const messages = computed(() => getFormMessages(props.message));

const { densityClass } = useDensity(props);

/**
 * Current value (with getter and setter) that can be used as "v-model" for the native input.
 */
const value = defineModel<string>({ default: "" });

const patternSource = computed(() => {
  if (props.pattern instanceof RegExp) return props.pattern.source;
  return props.pattern;
});

const { disabled, showError } = useFormContext(props);
const skeleton = useSkeletonContext(props);
const errorClass = useErrorClass(showError);
</script>

<template>
  <div v-if="skeleton" :class="['onyx-input-skeleton', densityClass]">
    <OnyxSkeleton v-if="!props.hideLabel" class="onyx-input-skeleton__label" />
    <OnyxSkeleton class="onyx-input-skeleton__input" />
  </div>

  <div v-else :class="['onyx-input', densityClass, errorClass]">
    <OnyxFormElement
      v-bind="props"
      :error-messages="errorMessages"
      :success-messages="successMessages"
      :message="messages"
    >
      <template #default="{ id: inputId }">
        <div class="onyx-input__wrapper">
          <OnyxLoadingIndicator v-if="props.loading" class="onyx-input__loading" type="circle" />
          <input
            :id="inputId"
            v-model="value"
            v-custom-validity
            :placeholder="props.placeholder"
            class="onyx-input__native"
            :type="props.type"
            :required="props.required"
            :autocapitalize="props.autocapitalize"
            :autocomplete="props.autocomplete"
            :autofocus="props.autofocus"
            :name="props.name"
            :pattern="patternSource"
            :readonly="props.readonly"
            :disabled="disabled || props.loading"
            :minlength="props.minlength"
            :maxlength="props.maxlength"
            :aria-label="props.hideLabel ? props.label : undefined"
            :title="props.hideLabel ? props.label : undefined"
          />

          <button
            v-if="!props.hideClearIcon && value !== ''"
            type="button"
            class="onyx-input__clear"
            :aria-label="t('input.clear')"
            :title="t('input.clear')"
            @click="() => (value = '')"
          >
            <OnyxIcon :icon="xSmall" />
          </button>

          <OnyxIcon
            v-if="!props.hideSuccessIcon && successMessages"
            class="onyx-input__check-icon"
            :icon="checkSmall"
            color="success"
          />
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

    &:hover,
    &:focus-visible {
      color: var(--onyx-color-text-icons-primary-intense);
    }

    &:focus-visible {
      outline: var(--onyx-outline-width) solid var(--onyx-color-component-focus-primary);
      border-radius: var(--onyx-radius-sm);
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
