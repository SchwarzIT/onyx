<script lang="ts" setup generic="TValue extends SelectOptionValue = SelectOptionValue">
import { computed, inject, onUnmounted, useId, useTemplateRef, watchEffect } from "vue";
import { useAutofocus } from "../../composables/useAutoFocus.js";
import { useFormElementError } from "../../composables/useFormElementError.js";
import { SKELETON_INJECTED_SYMBOL } from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
import type { SelectOptionValue } from "../../types/index.js";
import { mergeVueProps, useRootAttrs } from "../../utils/attrs.js";
import { CHECKBOX_GROUP_INJECTION_KEY } from "../OnyxCheckboxGroup/types.js";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxFormElementV2 from "../OnyxFormElementV2/OnyxFormElementV2.vue";
import type { FormElementV2LabelOptions } from "../OnyxFormElementV2/types.js";
import { useLegacyFormElementProps } from "../OnyxFormElementV2/useLegacyFormElementProps.js";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import type { OnyxCheckboxProps } from "./types.js";

type Props = OnyxCheckboxProps<TValue>;

const props = withDefaults(defineProps<Props>(), {
  indeterminate: false,
  disabled: FORM_INJECTED_SYMBOL,
  showError: FORM_INJECTED_SYMBOL,
  requiredMarker: FORM_INJECTED_SYMBOL,
  reserveMessageSpace: FORM_INJECTED_SYMBOL,
  skeleton: SKELETON_INJECTED_SYMBOL,
  loading: false,
  required: false,
  truncation: "ellipsis",
  modelValue: undefined,
});

const emit = defineEmits<{
  /**
   * Emitted when the validity state of the input changes.
   */
  validityChange: [validity: ValidityState];
  /**
   * Emitted when the checked state changes.
   */
  "update:modelValue": [value: boolean];
}>();

defineOptions({ inheritAttrs: false });
const { rootAttrs, restAttrs } = useRootAttrs();

const isChecked = useVModel<Props, "modelValue", boolean>({
  props,
  emit,
  key: "modelValue",
  default: false,
});

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

const checkboxGroup = inject(CHECKBOX_GROUP_INJECTION_KEY, null);
const fallbackId = useId();
const elementId = computed(() => props.id ?? fallbackId);

if (checkboxGroup) {
  watchEffect(() => {
    checkboxGroup.reportError(elementId.value, legacyFormElementProps.value.error);
  });

  onUnmounted(() => {
    checkboxGroup.unregister(elementId.value);
  });
}

const formElementV2Props = computed(() => {
  return {
    ...legacyFormElementProps.value,
    id: elementId.value,
    loading: false, // loading state is handled internally via OnyxLoadingIndicator inside the selector
    label: normalizedLabel.value,
    error: checkboxGroup ? undefined : legacyFormElementProps.value.error,
  };
});

const input = useTemplateRef("input");
defineExpose({ input });
useAutofocus(input, props);
</script>

<template>
  <OnyxFormElementV2
    v-bind="mergeVueProps(formElementV2Props, rootAttrs)"
    class="onyx-component onyx-checkbox"
    unstyled
    full-width-bottom
  >
    <template #default="inputProps">
      <OnyxLoadingIndicator v-if="props.loading" class="onyx-checkbox__loading" type="circle" />
      <input
        v-else
        v-bind="mergeVueProps(inputProps, restAttrs)"
        :id="elementId"
        ref="input"
        v-model="isChecked"
        v-custom-validity
        class="onyx-checkbox__input"
        type="checkbox"
        :indeterminate="props.indeterminate"
        :disabled="disabled || props.loading"
        :required="props.required"
        :value="props.value"
        :autofocus="props.autofocus"
      />
    </template>
  </OnyxFormElementV2>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";
@use "../../styles/mixins/checkbox.scss";

@mixin define-hover-border($state, $color) {
  .onyx-checkbox__input#{$state} {
    border-color: var(--onyx-color-component-border-#{$color});
  }
}

.onyx-checkbox {
  @include layers.component() {
    @include checkbox.variables();
    --onyx-checkbox-cursor: pointer;
    --onyx-checkbox-label-color: var(--onyx-color-text-icons-neutral-intense);

    display: inline-flex;
    max-width: 100%;
    cursor: var(--onyx-checkbox-cursor);

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
        padding: var(--onyx-checkbox-input-padding);
        border-radius: var(--onyx-radius-full);
        transition: background-color var(--onyx-duration-sm);

        &:hover,
        &:focus-within {
          background-color: transparent;
        }
      }

      &__content-skeleton {
        height: var(--onyx-checkbox-input-size);
        width: var(--onyx-checkbox-input-size);
        margin: var(--onyx-checkbox-input-padding);
        border-radius: var(--onyx-radius-xs);
      }

      &__label-skeleton {
        height: var(--onyx-spacing-md);
        margin-top: calc(
          (var(--onyx-form-element-v2-label-skeleton-height) - var(--onyx-spacing-md)) / 2
        );
        width: var(--onyx-spacing-3xl);
      }
    }

    &.onyx-form-element-v2--label-right,
    &.onyx-form-element-v2--label-left {
      gap: 0;

      > .onyx-form-element-v2__label {
        width: auto;
        min-width: 0;
        flex: 1 1 auto;
        color: var(--onyx-checkbox-label-color);
        padding-block: var(--onyx-density-xs);
        padding-right: var(--onyx-density-xs);
        line-height: var(--onyx-font-line-height-md);

        label {
          cursor: inherit;
        }
      }
    }

    &__input,
    &__input.onyx-form-element-v2__input {
      @include checkbox.styles();
      box-sizing: border-box;
      width: var(--onyx-checkbox-input-size);
      min-width: var(--onyx-checkbox-input-size);
      max-width: var(--onyx-checkbox-input-size);
      height: var(--onyx-checkbox-input-size);
      min-height: var(--onyx-checkbox-input-size);
      max-height: var(--onyx-checkbox-input-size);
      padding: 0;
      margin: 0;
      cursor: inherit;
      flex-shrink: 0;
    }

    &__loading {
      color: var(--onyx-color-text-icons-primary-intense);
      --indicator-size: var(--onyx-checkbox-input-size);
      flex-shrink: 0;
    }

    &:hover {
      @include define-hover-border($state: ":enabled", $color: primary-hover);
      @include define-hover-border($state: ":user-invalid", $color: danger-hover);
    }

    &:has(&__input:focus-visible) {
      .onyx-form-element-v2__input-container:has(.onyx-checkbox__input:enabled) {
        background-color: var(--onyx-color-base-primary-200);
      }
      @include define-hover-border($state: ":enabled", $color: secondary);

      .onyx-form-element-v2__input-container:has(
        .onyx-checkbox__input:user-invalid,
        .onyx-checkbox__input[aria-invalid="true"]
      ) {
        background-color: var(--onyx-color-base-danger-200);
      }
      @include define-hover-border($state: ":user-invalid", $color: danger);
    }

    &:not(.onyx-form-element--suppress-invalid) {
      &.onyx-form-element--touched-invalid:has(
          .onyx-checkbox__input:user-invalid,
          .onyx-checkbox__input[aria-invalid="true"]
        ),
      &.onyx-form-element--immediate-invalid:has(
          .onyx-checkbox__input:invalid,
          .onyx-checkbox__input[aria-invalid="true"]
        ) {
        @include define-hover-border($state: "", $color: danger);

        &:hover {
          @include define-hover-border($state: "", $color: danger-hover);
        }
      }
    }

    &:has(&__input:disabled) {
      --onyx-checkbox-label-color: var(--onyx-color-text-icons-neutral-soft);
      --onyx-checkbox-cursor: default;
    }

    &:has(&__loading) {
      --onyx-checkbox-cursor: default;
    }

    .onyx-form-element-v2__bottom {
      padding-left: var(--onyx-checkbox-input-padding);
    }
  }
}
</style>
