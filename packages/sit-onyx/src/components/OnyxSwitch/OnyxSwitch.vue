<script lang="ts" setup>
import { iconCheckSmall, iconXSmall } from "@sit-onyx/icons";
import { computed, useTemplateRef } from "vue";
import { useAutofocus } from "../../composables/useAutoFocus.js";
import { useFormElementError } from "../../composables/useFormElementError.js";
import { SKELETON_INJECTED_SYMBOL } from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
import { mergeVueProps, useRootAttrs } from "../../utils/attrs.js";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxFormElementV2 from "../OnyxFormElementV2/OnyxFormElementV2.vue";
import type { FormElementV2LabelOptions } from "../OnyxFormElementV2/types.js";
import { useLegacyFormElementProps } from "../OnyxFormElementV2/useLegacyFormElementProps.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import type { OnyxSwitchProps } from "./types.js";

const props = withDefaults(defineProps<OnyxSwitchProps>(), {
  disabled: FORM_INJECTED_SYMBOL,
  loading: false,
  truncation: "ellipsis",
  requiredMarker: FORM_INJECTED_SYMBOL,
  skeleton: SKELETON_INJECTED_SYMBOL,
  showError: FORM_INJECTED_SYMBOL,
  modelValue: undefined,
});

const emit = defineEmits<{
  /**
   * Emitted when the checked state changes.
   */
  "update:modelValue": [value: boolean];
  /**
   * Emitted when the validity state of the input changes.
   */
  validityChange: [validity: ValidityState];
}>();

defineOptions({ inheritAttrs: false });
const { rootAttrs, restAttrs } = useRootAttrs();

const { disabled } = useFormContext(props);
const { vCustomValidity, errorMessages } = useFormElementError({ props, emit });

const isChecked = useVModel({
  props,
  emit,
  key: "modelValue",
  default: false,
});

const normalizedLabel = computed<FormElementV2LabelOptions>(() => {
  const labelObject = typeof props.label === "string" ? { label: props.label } : props.label;
  return {
    position: "right",
    hidden: props.hideLabel,
    truncation: props.truncation,
    ...labelObject,
  };
});

const { formElementV2Props: legacyFormElementProps } = useLegacyFormElementProps({
  props,
  errorMessages,
});

const formElementV2Props = computed(() => {
  return {
    ...legacyFormElementProps.value,
    loading: false, // hide FormElementV2 loading indicator because we use a custom one for the switch
    label: normalizedLabel.value,
  };
});

const input = useTemplateRef("input");
defineExpose({ input });
useAutofocus(input, props);
</script>

<template>
  <OnyxFormElementV2
    v-bind="mergeVueProps(formElementV2Props, rootAttrs)"
    class="onyx-component onyx-switch"
    unstyled
  >
    <template #default="inputProps">
      <span class="onyx-switch__toggle">
        <span class="onyx-switch__icon">
          <OnyxLoadingIndicator v-if="props.loading" class="onyx-switch__spinner" type="circle" />
          <OnyxIcon v-else :icon="isChecked ? iconCheckSmall : iconXSmall" />
        </span>
      </span>
      <input
        :id="inputProps.id"
        ref="input"
        v-bind="mergeVueProps(restAttrs, inputProps)"
        v-model="isChecked"
        v-custom-validity
        :aria-checked="isChecked"
        type="checkbox"
        role="switch"
        :class="{ 'onyx-switch__input': true, 'onyx-switch__loading': props.loading }"
        :disabled="disabled || props.loading"
        :required="props.required"
        :autofocus="props.autofocus"
      />
      <span
        v-if="props.valueLabel"
        class="onyx-switch__display-label"
        :class="[`onyx-switch-truncation-${props.truncation} onyx-truncation-${props.truncation}`]"
        :data-value-label-truthy="props.valueLabel?.truthy"
        :data-value-label-falsy="props.valueLabel?.falsy"
        aria-hidden="true"
      ></span>
    </template>
  </OnyxFormElementV2>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-switch {
  @include layers.component() {
    --onyx-switch-input-width: calc(
      2 * var(--onyx-switch-icon-size) - 2 * var(--onyx-switch-container-padding)
    );
    --onyx-switch-input-height: calc(
      var(--onyx-switch-icon-size) + 2 * var(--onyx-switch-container-padding) + 2 *
        var(--onyx-1px-in-rem)
    );
    --onyx-switch-cursor: pointer;
    --onyx-switch-container-padding: var(--onyx-1px-in-rem);
    // icon size + padding top/bottom + border top/bottom
    --onyx-switch-label-padding-vertical: var(--onyx-density-xs);
    --onyx-switch-transform: var(--onyx-1px-in-rem);
    --onyx-switch-toggle-background-color: var(--onyx-color-base-neutral-300);
    --onyx-switch-toggle-border-color: var(--onyx-color-component-border-neutral);
    --onyx-switch-toggle-outline-color: transparent;

    --onyx-switch-icon-background-color: var(--onyx-color-base-neutral-100);
    --onyx-switch-icon-color: var(--onyx-color-text-icons-neutral-soft);
    --onyx-switch-icon-size: 1.25rem;
    --onyx-switch-icon-transform: none;

    --onyx-switch-spinner-color: inherit;

    .onyx-form-element-v2 {
      &__content-skeleton {
        height: var(--onyx-switch-input-height);
        width: calc(2 * var(--onyx-switch-icon-size) - 2 * var(--onyx-switch-container-padding));
        border-radius: var(--onyx-radius-full);
        margin: var(--onyx-switch-label-padding-vertical) 0;
        position: relative;
      }

      &__input-container {
        position: relative;
        width: 100%;
        height: 100%;
      }

      &__body {
        // otherwise the body will grow and push the label away
        width: auto;
      }
    }

    &__toggle {
      display: inline-flex;
      align-items: center;
      position: relative;
      width: var(--onyx-switch-input-width);
      min-width: var(--onyx-switch-input-width);
      height: var(--onyx-switch-input-height);
      margin: var(--onyx-switch-label-padding-vertical) 0;
      box-sizing: border-box;
      background-color: var(--onyx-switch-toggle-background-color);
      border: var(--onyx-1px-in-rem) solid var(--onyx-switch-toggle-border-color);
      border-radius: var(--onyx-radius-full);
      transition: background-color var(--onyx-duration-sm) ease;
      outline: var(--onyx-outline-width) solid var(--onyx-switch-toggle-outline-color);

      .onyx-switch__icon {
        margin: var(--onyx-1px-in-rem);
        display: flex;
        align-self: center;
        justify-content: center;
        background-color: var(--onyx-switch-icon-background-color);
        border-radius: var(--onyx-radius-full);
        transition:
          transform var(--onyx-duration-sm) ease,
          background-color var(--onyx-duration-sm) ease;
        overflow: hidden;
        color: var(--onyx-switch-icon-color);
        height: var(--onyx-switch-icon-size);
        width: var(--onyx-switch-icon-size);
        transform: var(--onyx-switch-icon-transform);

        .onyx-icon {
          --icon-size: var(--onyx-switch-icon-size);
        }

        .onyx-switch__spinner {
          --indicator-size: var(--onyx-switch-icon-size);
          color: var(--onyx-switch-spinner-color);
        }
      }
    }

    &__input {
      // Make input invisible, but clickable and detectable for Playwright
      position: absolute;
      border: none;
      background: transparent;
      appearance: none;
      outline: none;
      margin: 0;
      padding: 0;
      inset: 0;
    }

    &__display-label {
      padding: var(--onyx-switch-label-padding-vertical) 0 var(--onyx-switch-label-padding-vertical)
        var(--onyx-switch-label-padding-vertical);
      font-size: var(--onyx-font-size-md);
      line-height: var(--onyx-font-line-height-md);
      color: var(--onyx-color-text-icons-neutral-intense);
      font-family: var(--onyx-font-family-paragraph);
      font-style: normal;
      font-weight: var(--onyx-font-weight-regular);

      &::before {
        content: attr(data-value-label-falsy);

        :has(.onyx-switch__input:checked) & {
          content: attr(data-value-label-truthy);
        }
      }
    }

    &:has(.onyx-form-element-v2__message--success) {
      --onyx-switch-toggle-background-color: var(--onyx-color-base-success-200);
      --onyx-switch-toggle-border-color: var(--onyx-color-component-border-success);
      --onyx-switch-icon-background-color: var(--onyx-color-base-success-500);
      --onyx-switch-icon-color: var(--onyx-color-text-icons-neutral-inverted);

      &:has(.onyx-switch__input:checked) {
        --onyx-switch-toggle-background-color: var(--onyx-color-base-success-500);
      }
    }

    &:hover {
      &:has(.onyx-switch__input:enabled:not(.onyx-switch__input:user-invalid)):not(
          :has(.onyx-form-element-v2__message--success)
        ) {
        --onyx-switch-toggle-background-color: var(--onyx-color-base-neutral-400);
        --onyx-switch-toggle-border-color: var(--onyx-color-component-border-neutral-hover);

        &:has(.onyx-switch__input:checked) {
          --onyx-switch-toggle-background-color: var(--onyx-color-component-cta-default-hover);
        }
      }

      &:has(.onyx-switch__input:user-invalid:enabled) {
        --onyx-switch-toggle-background-color: var(--onyx-color-base-danger-300);

        &:has(.onyx-switch__input:checked) {
          --onyx-switch-toggle-background-color: var(--onyx-color-component-cta-danger-hover);
        }
      }

      &:has(.onyx-form-element-v2__message--success):has(.onyx-switch__input:enabled) {
        --onyx-switch-toggle-background-color: var(--onyx-color-base-success-300);
      }
    }

    &:has(.onyx-switch__input:enabled) .onyx-form-element-v2__input-container :is(input, label) {
      cursor: var(--onyx-switch-cursor);
    }

    &:has(&__input:focus-visible) {
      &:not(:has(.onyx-form-element-v2__message--success)) {
        &:has(.onyx-switch__input:enabled) {
          --onyx-switch-toggle-outline-color: var(--onyx-color-base-neutral-600);
        }

        &:has(.onyx-switch__input:checked:enabled) {
          --onyx-switch-toggle-outline-color: var(--onyx-color-component-focus-primary);
        }

        &:has(.onyx-switch__input:user-invalid:enabled) {
          --onyx-switch-toggle-outline-color: var(--onyx-color-component-focus-danger);
        }
      }

      &:has(.onyx-form-element-v2__message--success) {
        --onyx-switch-toggle-outline-color: var(--onyx-color-component-focus-success);
      }
    }

    &:has(.onyx-switch__input:disabled) {
      --onyx-switch-cursor: default;
      --onyx-switch-toggle-border-color: transparent;

      .onyx-switch__display-label {
        color: var(--onyx-color-text-icons-neutral-soft);
      }
    }

    &:has(.onyx-switch__input:disabled.onyx-switch__loading) {
      --onyx-switch-toggle-border-color: var(--onyx-color-component-border-neutral);
    }

    &:has(.onyx-switch__input:checked) {
      --onyx-switch-toggle-background-color: var(--onyx-color-component-cta-default);
      --onyx-switch-spinner-color: var(--onyx-color-text-icons-primary-intense);
      --onyx-switch-icon-background-color: var(--onyx-color-base-background-blank);
      --onyx-switch-icon-transform: translateX(calc(75% - var(--onyx-switch-transform)));
      --onyx-switch-icon-color: var(--onyx-color-text-icons-primary-intense);
    }

    &:has(.onyx-switch__input:checked:disabled:not(.onyx-switch__loading)) {
      --onyx-switch-toggle-background-color: var(--onyx-color-base-primary-200);
      --onyx-switch-icon-background-color: var(--onyx-color-base-background-blank);
      --onyx-switch-icon-color: var(--onyx-color-text-icons-primary-soft);
    }

    &:has(.onyx-switch__input:disabled:not(.onyx-switch__loading)) {
      --onyx-switch-toggle-background-color: var(--onyx-color-base-neutral-200);
      --onyx-switch-icon-background-color: var(--onyx-color-base-neutral-300);
      --onyx-switch-icon-color: var(--onyx-color-text-icons-neutral-inverted);
    }

    &:has(.onyx-switch__input:user-invalid) {
      --onyx-switch-toggle-background-color: var(--onyx-color-base-danger-200);
      --onyx-switch-toggle-border-color: var(--onyx-color-component-border-danger);
      --onyx-switch-icon-background-color: var(--onyx-color-base-danger-500);
      --onyx-switch-icon-color: var(--onyx-color-text-icons-neutral-inverted);
    }

    &:has(.onyx-switch__input:user-invalid:checked) {
      --onyx-switch-toggle-background-color: var(--onyx-color-component-cta-danger);
      --onyx-switch-icon-background-color: var(--onyx-color-base-background-blank);
      --onyx-switch-icon-color: var(--onyx-color-text-icons-danger-intense);
    }

    &.onyx-form-element-v2--label-right:not(:has(.onyx-switch__display-label)),
    &.onyx-form-element-v2--label-left:not(:has(.onyx-switch__display-label)) {
      cursor: pointer;
      gap: var(--onyx-switch-label-padding-vertical);
    }
    &:has(.onyx-switch-truncation-multiline) {
      .onyx-form-element-v2__content {
        height: auto;
      }
    }
    // Truncates messages if the label is on the right to prevent layout shifts
    &.onyx-form-element-v2--label-right .onyx-form-element-v2__bottom {
      max-width: calc(2 * var(--onyx-switch-icon-size) - 2 * var(--onyx-switch-container-padding));
    }

    > .onyx-form-element-v2__label {
      overflow: hidden;
    }
  }
}
</style>
