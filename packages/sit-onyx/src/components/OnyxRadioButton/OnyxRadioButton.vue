<script lang="ts" setup generic="TValue extends SelectOptionValue = SelectOptionValue">
import { useTemplateRef } from "vue";
import { useDensity } from "../../composables/density.js";
import { useAutofocus } from "../../composables/useAutoFocus.js";
import { useCustomValidity } from "../../composables/useCustomValidity.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import type { SelectOptionValue } from "../../types/index.js";
import { useRootAttrs } from "../../utils/attrs.js";
import OnyxErrorTooltip from "../OnyxErrorTooltip/OnyxErrorTooltip.vue";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxRadioButtonProps } from "./types.js";

const props = withDefaults(defineProps<OnyxRadioButtonProps<TValue>>(), {
  disabled: FORM_INJECTED_SYMBOL,
  required: false,
  checked: false,
  loading: false,
  skeleton: SKELETON_INJECTED_SYMBOL,
  truncation: "ellipsis",
});

const emit = defineEmits<{
  /**
   * Emitted when the validity state of the input changes.
   */
  validityChange: [validity: ValidityState];
}>();

defineOptions({ inheritAttrs: false });
const { rootAttrs, restAttrs } = useRootAttrs();

const { vCustomValidity, errorMessages } = useCustomValidity({ props, emit });
const { densityClass } = useDensity(props);
const { disabled } = useFormContext(props);
const skeleton = useSkeletonContext(props);

const input = useTemplateRef("inputRef");
defineExpose({ input });
useAutofocus(input, props);
</script>

<template>
  <div
    v-if="skeleton"
    :class="['onyx-component', 'onyx-radio-button-skeleton', densityClass]"
    v-bind="rootAttrs"
  >
    <OnyxSkeleton class="onyx-radio-button-skeleton__input" />
    <OnyxSkeleton class="onyx-radio-button-skeleton__label" />
  </div>

  <OnyxErrorTooltip v-else :disabled="disabled" :error-messages="errorMessages" v-bind="rootAttrs">
    <label :class="['onyx-component', 'onyx-radio-button', densityClass]">
      <OnyxLoadingIndicator v-if="props.loading" class="onyx-radio-button__loading" type="circle" />
      <!-- TODO: accessible error: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-errormessage -->
      <input
        v-else
        ref="inputRef"
        v-custom-validity
        class="onyx-radio-button__selector"
        type="radio"
        :required="props.required"
        :name="props.name"
        :value="props.value"
        :checked="props.checked"
        :disabled="disabled"
        :autofocus="props.autofocus"
        v-bind="restAttrs"
      />
      <span class="onyx-radio-button__label" :class="[`onyx-truncation-${props.truncation}`]">
        {{ props.label }}
      </span>
    </label>
  </OnyxErrorTooltip>
</template>

<style lang="scss">
@use "../../styles/mixins/density.scss";
@use "../../styles/mixins/layers";

.onyx-radio-button,
.onyx-radio-button-skeleton {
  @include layers.component() {
    --onyx-radio-button-selector-size: var(--onyx-spacing-md);
    --onyx-radio-button-dot-size: var(--onyx-spacing-3xs);
    --onyx-radio-button-selector-margin: var(--onyx-density-sm);
  }
}

.onyx-radio-button {
  @include layers.component() {
    --onyx-radio-button-cursor: pointer;
    --onyx-radio-button-selector-border-color: var(--onyx-color-component-border-neutral);
    --onyx-radio-button-selector-background-color: var(--onyx-color-base-background-blank);
    --onyx-radio-button-selector-outline-color: var(--onyx-color-base-primary-200);
    --onyx-radio-button-selector-outline-width: 0;
    --onyx-radio-button-label-color: var(--onyx-color-text-icons-neutral-intense);

    display: inline-flex;
    align-items: flex-start;
    max-width: 100%;
    cursor: var(--onyx-radio-button-cursor);

    &:has(&__selector:hover) {
      --onyx-radio-button-selector-border-color: var(--onyx-color-component-border-primary-hover);
    }

    &:has(&__selector:checked) {
      --onyx-radio-button-selector-background-color: var(--onyx-color-component-cta-default);
      --onyx-radio-button-selector-border-color: var(--onyx-radio-button-selector-background-color);
    }

    &:has(&__selector:checked:hover) {
      --onyx-radio-button-selector-background-color: var(--onyx-color-component-cta-default-hover);
      --onyx-radio-button-selector-border-color: var(--onyx-radio-button-selector-background-color);
    }
    &:has(&__selector:focus-visible) {
      --onyx-radio-button-selector-border-color: var(--onyx-color-component-border-primary);
      --onyx-radio-button-selector-outline-width: var(--onyx-radio-button-selector-margin);
    }
    &:has(&__selector:invalid) {
      --onyx-radio-button-selector-border-color: var(--onyx-color-component-border-danger);
      --onyx-radio-button-selector-outline-color: var(--onyx-color-base-danger-200);
    }

    &:has(&__selector:invalid:checked) {
      --onyx-radio-button-selector-background-color: var(--onyx-color-component-cta-danger);
    }

    &:has(&__selector:invalid:checked:hover) {
      --onyx-radio-button-selector-background-color: var(--onyx-color-component-cta-danger-hover);
      --onyx-radio-button-selector-border-color: var(--onyx-radio-button-selector-background-color);
    }
    &:has(&__selector:invalid:focus-visible) {
      --onyx-radio-button-selector-border-color: var(--onyx-color-component-border-danger);
    }

    &:has(&__selector:disabled) {
      --onyx-radio-button-selector-outline-width: 0;
      --onyx-radio-button-selector-border-color: var(--onyx-color-component-border-disabled);
      --onyx-radio-button-label-color: var(--onyx-color-text-icons-neutral-soft);
      --onyx-radio-button-cursor: default;
    }

    &:has(&__loading) {
      --onyx-radio-button-cursor: default;
    }

    &:has(&__selector:disabled:checked) {
      --onyx-radio-button-selector-background-color: var(--onyx-color-base-neutral-300);
      --onyx-radio-button-selector-border-color: var(--onyx-color-base-neutral-300);
    }

    &__label {
      font-family: var(--onyx-font-family);
      color: var(--onyx-radio-button-label-color);
      line-height: var(--onyx-spacing-lg);
      padding: var(--onyx-density-xs);
      padding-left: 0;
    }

    &__selector {
      appearance: none;
      margin: var(--onyx-radio-button-selector-margin);
      cursor: inherit;
      transition: outline var(--onyx-duration-sm);
      border: var(--onyx-1px-in-rem) solid var(--onyx-radio-button-selector-border-color);
      border-radius: var(--onyx-radius-full);
      background-color: var(--onyx-radio-button-selector-background-color);
      outline: var(--onyx-radio-button-selector-outline-width) solid
        var(--onyx-radio-button-selector-outline-color);
      outline-offset: 0;

      display: inline-grid;
      place-items: center;
      width: var(--onyx-radio-button-selector-size);
      min-width: var(--onyx-radio-button-selector-size);
      max-width: var(--onyx-radio-button-selector-size);
      aspect-ratio: 1;

      &::before {
        content: " ";
        height: var(--onyx-radio-button-dot-size);
        width: var(--onyx-radio-button-dot-size);
        background-color: var(--onyx-color-base-background-blank);
        border-radius: var(--onyx-radius-full);
      }
    }

    &__loading {
      color: var(--onyx-color-text-icons-primary-intense);
      width: var(--onyx-radio-button-selector-size);
      height: var(--onyx-radio-button-selector-size);
      margin: var(--onyx-radio-button-selector-margin);
    }
  }
}

.onyx-radio-button-skeleton {
  @include layers.component() {
    padding: var(--onyx-radio-button-selector-margin);
    display: inline-flex;
    align-items: center;
    gap: var(--onyx-radio-button-selector-margin);

    &__input {
      height: var(--onyx-radio-button-selector-size);
      width: var(--onyx-radio-button-selector-size);
      border-radius: var(--onyx-radius-full);
    }

    &__label {
      height: var(--onyx-spacing-md);
      width: var(--onyx-spacing-3xl);
    }
  }
}
</style>
