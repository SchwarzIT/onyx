<script lang="ts" setup generic="TValue extends SelectOptionValue = SelectOptionValue">
import { computed, inject, onUnmounted, useId, useTemplateRef, watchEffect } from "vue";
import { useAutofocus } from "../../composables/useAutoFocus.js";
import { useFormElementError } from "../../composables/useFormElementError.js";
import { SKELETON_INJECTED_SYMBOL } from "../../composables/useSkeletonState.js";
import type { SelectOptionValue } from "../../types/index.js";
import { mergeVueProps, useRootAttrs } from "../../utils/attrs.js";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxFormElementV2 from "../OnyxFormElementV2/OnyxFormElementV2.vue";
import type { FormElementV2LabelOptions } from "../OnyxFormElementV2/types.js";
import { useLegacyFormElementProps } from "../OnyxFormElementV2/useLegacyFormElementProps.js";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import { RADIO_GROUP_INJECTION_KEY } from "../OnyxRadioGroup/types.js";
import type { OnyxRadioButtonProps } from "./types.js";

const props = withDefaults(defineProps<OnyxRadioButtonProps<TValue>>(), {
  disabled: FORM_INJECTED_SYMBOL,
  showError: FORM_INJECTED_SYMBOL,
  requiredMarker: FORM_INJECTED_SYMBOL,
  reserveMessageSpace: FORM_INJECTED_SYMBOL,
  skeleton: SKELETON_INJECTED_SYMBOL,
  required: false,
  checked: false,
  loading: false,
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

const { disabled } = useFormContext(props);
const { vCustomValidity, errorMessages } = useFormElementError({ props, emit });

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

const radioGroup = inject(RADIO_GROUP_INJECTION_KEY, null);
const fallbackId = useId();
const elementId = computed(() => props.id ?? fallbackId);

if (radioGroup) {
  watchEffect(() => {
    radioGroup.reportError(elementId.value, legacyFormElementProps.value.error);
  });

  onUnmounted(() => {
    radioGroup.unregister(elementId.value);
  });
}

const formElementV2Props = computed(() => {
  return {
    ...legacyFormElementProps.value,
    id: elementId.value,
    loading: false, // loading state is handled internally via OnyxLoadingIndicator inside the selector
    label: normalizedLabel.value,
    error: radioGroup ? undefined : legacyFormElementProps.value.error,
  };
});

const input = useTemplateRef("input");
defineExpose({ input });
useAutofocus(input, props);

const handleClick = (event: MouseEvent) => {
  if (disabled.value || props.loading) return;

  const target = event.target as HTMLElement | null;
  if (target?.closest("input, label")) return;

  input.value?.click();
};
</script>

<template>
  <OnyxFormElementV2
    v-bind="mergeVueProps(formElementV2Props, rootAttrs)"
    class="onyx-component onyx-radio-button"
    unstyled
    full-width-bottom
    @click="handleClick"
  >
    <template #default="inputProps">
      <OnyxLoadingIndicator v-if="props.loading" class="onyx-radio-button__loading" type="circle" />
      <input
        v-else
        v-bind="mergeVueProps(inputProps, restAttrs)"
        :id="elementId"
        ref="input"
        v-custom-validity
        class="onyx-radio-button__selector"
        type="radio"
        :required="props.required"
        :name="props.name"
        :value="props.value"
        :checked="props.checked"
        :disabled="disabled || props.loading"
        :autofocus="props.autofocus"
      />
    </template>
  </OnyxFormElementV2>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-radio-button {
  @include layers.component() {
    --onyx-radio-button-selector-size: var(--onyx-spacing-md);
    --onyx-radio-button-dot-size: var(--onyx-spacing-3xs);
    --onyx-radio-button-selector-margin: var(--onyx-density-sm);
    --onyx-radio-button-cursor: pointer;
    --onyx-radio-button-selector-border-color: var(--onyx-color-component-border-neutral);
    --onyx-radio-button-selector-background-color: var(--onyx-color-base-background-blank);
    --onyx-radio-button-selector-outline-color: var(--onyx-color-base-primary-200);
    --onyx-radio-button-selector-outline-width: 0;
    --onyx-radio-button-label-color: var(--onyx-color-text-icons-neutral-intense);

    display: inline-flex;
    max-width: 100%;
    cursor: var(--onyx-radio-button-cursor);

    .onyx-form-element-v2 {
      --onyx-form-element-v2-padding-block: 0;

      &__body {
        width: auto;
        flex-shrink: 0;
      }

      &__content {
        height: auto;
        background-color: transparent;
        display: flex;
        align-items: center;
      }

      &__input-container {
        height: auto;
        width: auto;
        border: none;
        outline: none;
        background-color: transparent;

        &:hover,
        &:focus-within {
          background-color: transparent;
        }
      }

      &__content-skeleton {
        height: var(--onyx-radio-button-selector-size);
        width: var(--onyx-radio-button-selector-size);
        margin: var(--onyx-radio-button-selector-margin);
        border-radius: var(--onyx-radius-full);
      }
    }

    &.onyx-form-element-v2--label-right,
    &.onyx-form-element-v2--label-left {
      gap: 0;

      > .onyx-form-element-v2__label {
        width: auto;
        min-width: 0;
        flex: 1 1 auto;
        padding-block: var(--onyx-density-xs);
        line-height: var(--onyx-font-line-height-md);
        label {
          cursor: inherit;
        }
      }
    }
    &__selector,
    &__selector.onyx-form-element-v2__input {
      appearance: none;
      -webkit-appearance: none;
      box-sizing: border-box;
      margin: var(--onyx-radio-button-selector-margin);
      padding: 0;
      cursor: inherit;
      transition:
        outline var(--onyx-duration-sm),
        border-color var(--onyx-duration-sm),
        background-color var(--onyx-duration-sm);
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
      height: var(--onyx-radio-button-selector-size);
      min-height: var(--onyx-radio-button-selector-size);
      max-height: var(--onyx-radio-button-selector-size);
      aspect-ratio: 1;
      flex-shrink: 0;

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
      --indicator-size: var(--onyx-radio-button-selector-size);
      margin: var(--onyx-radio-button-selector-margin);
      flex-shrink: 0;
    }

    &:has(.onyx-radio-button__selector:checked) {
      --onyx-radio-button-selector-background-color: var(--onyx-color-component-cta-default);
      --onyx-radio-button-selector-border-color: var(--onyx-radio-button-selector-background-color);
    }

    &:has(.onyx-radio-button__selector:enabled):hover {
      --onyx-radio-button-selector-border-color: var(--onyx-color-component-border-neutral-hover);

      &:has(.onyx-radio-button__selector:checked) {
        --onyx-radio-button-selector-background-color: var(
          --onyx-color-component-cta-default-hover
        );
        --onyx-radio-button-selector-border-color: var(
          --onyx-radio-button-selector-background-color
        );
      }
    }

    &:has(&__selector:focus-visible) {
      --onyx-radio-button-selector-border-color: var(--onyx-color-component-border-neutral);
      --onyx-radio-button-selector-outline-width: var(--onyx-radio-button-selector-margin);
    }

    &:not(.onyx-form-element--suppress-invalid) {
      &.onyx-form-element--touched-invalid:has(
          .onyx-radio-button__selector:user-invalid,
          .onyx-radio-button__selector[aria-invalid="true"]
        ),
      &.onyx-form-element--immediate-invalid:has(
          .onyx-radio-button__selector:invalid,
          .onyx-radio-button__selector[aria-invalid="true"]
        ) {
        --onyx-radio-button-selector-border-color: var(--onyx-color-component-border-danger);
        --onyx-radio-button-selector-outline-color: var(--onyx-color-base-danger-200);

        &:has(.onyx-radio-button__selector:checked) {
          --onyx-radio-button-selector-background-color: var(--onyx-color-component-cta-danger);
          --onyx-radio-button-selector-border-color: var(
            --onyx-radio-button-selector-background-color
          );

          &:has(.onyx-radio-button__selector:enabled):hover {
            --onyx-radio-button-selector-background-color: var(
              --onyx-color-component-cta-danger-hover
            );
            --onyx-radio-button-selector-border-color: var(
              --onyx-radio-button-selector-background-color
            );
          }
        }

        &:has(.onyx-radio-button__selector:focus-visible) {
          --onyx-radio-button-selector-border-color: var(--onyx-color-component-border-danger);
        }
      }
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
    .onyx-form-element-v2__bottom {
      padding-left: var(--onyx-radio-button-selector-margin);
    }
  }
}
</style>
