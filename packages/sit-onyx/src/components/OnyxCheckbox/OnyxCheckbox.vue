<script lang="ts" setup generic="TValue extends SelectOptionValue = SelectOptionValue">
import { computed, useTemplateRef } from "vue";
import { useDensity } from "../../composables/density";
import { useRequired } from "../../composables/required";
import { useAutofocus } from "../../composables/useAutoFocus";
import { useCustomValidity } from "../../composables/useCustomValidity";
import { SKELETON_INJECTED_SYMBOL, useSkeletonContext } from "../../composables/useSkeletonState";
import { useVModel } from "../../composables/useVModel";
import type { SelectOptionValue } from "../../types";
import { useRootAttrs } from "../../utils/attrs";
import OnyxErrorTooltip from "../OnyxErrorTooltip/OnyxErrorTooltip.vue";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxCheckboxProps } from "./types";

type Props = OnyxCheckboxProps<TValue>;

const props = withDefaults(defineProps<Props>(), {
  indeterminate: false,
  disabled: FORM_INJECTED_SYMBOL,
  loading: false,
  required: false,
  requiredMarker: FORM_INJECTED_SYMBOL,
  skeleton: SKELETON_INJECTED_SYMBOL,
  truncation: "ellipsis",
  modelValue: undefined,
});

const emit = defineEmits<{
  /**
   * Emitted when the validity state of the input changes.
   */
  validityChange: [validity: ValidityState];
  /** Emitted when the checked state changes. */
  "update:modelValue": [value: boolean];
}>();

defineOptions({ inheritAttrs: false });
const { rootAttrs, restAttrs } = useRootAttrs();

const isChecked = useVModel<"modelValue", Props, boolean, false>({
  props,
  emit,
  key: "modelValue",
  initialValue: false,
});

const { vCustomValidity, errorMessages } = useCustomValidity({ props, emit });
const { densityClass } = useDensity(props);
const { disabled, requiredMarker } = useFormContext(props);
const skeleton = useSkeletonContext(props);
const { requiredMarkerClass, requiredTypeClass } = useRequired(props, requiredMarker);

const title = computed(() => {
  return props.hideLabel ? props.label : undefined;
});

const input = useTemplateRef("inputRef");
defineExpose({ input });
useAutofocus(input, props);
</script>

<template>
  <div
    v-if="skeleton"
    :class="['onyx-component', 'onyx-checkbox-skeleton', densityClass]"
    v-bind="rootAttrs"
  >
    <OnyxSkeleton class="onyx-checkbox-skeleton__input" />
    <OnyxSkeleton v-if="!props.hideLabel" class="onyx-checkbox-skeleton__label" />
  </div>

  <OnyxErrorTooltip v-else :disabled="disabled" :error-messages="errorMessages" v-bind="rootAttrs">
    <label
      class="onyx-component onyx-checkbox"
      :class="[requiredTypeClass, densityClass]"
      :title="title"
    >
      <div class="onyx-checkbox__container">
        <OnyxLoadingIndicator v-if="props.loading" class="onyx-checkbox__loading" type="circle" />
        <input
          v-else
          ref="inputRef"
          v-model="isChecked"
          v-custom-validity
          :aria-label="props.hideLabel ? props.label : undefined"
          class="onyx-checkbox__input"
          type="checkbox"
          :indeterminate="props.indeterminate"
          :disabled="disabled"
          :required="props.required"
          :value="props.value"
          :autofocus="props.autofocus"
          tabindex="0"
          v-bind="restAttrs"
        />
      </div>

      <template v-if="!props.hideLabel">
        <p
          class="onyx-checkbox__label"
          :class="[
            `onyx-truncation-${props.truncation}`,
            // shows the required marker inline for multiline labels
            props.truncation === 'multiline' ? requiredMarkerClass : undefined,
          ]"
        >
          {{ props.label }}
        </p>
        <!-- shows the required marker fixed on the right for truncated labels -->
        <div
          v-if="props.truncation === 'ellipsis'"
          class="onyx-checkbox__marker"
          :class="[requiredMarkerClass]"
        ></div>
      </template>
    </label>
  </OnyxErrorTooltip>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";
@use "../../styles/mixins/checkbox.scss";

@mixin define-hover-border($state, $color) {
  .onyx-checkbox__input#{$state} {
    border-color: var(--onyx-color-component-border-#{$color});
  }
}

@mixin define-focus-ring($state, $color) {
  .onyx-checkbox__container:has(.onyx-checkbox__input#{$state}) {
    background-color: var(--onyx-color-base-#{$color}-200);
  }
}

.onyx-checkbox {
  @include checkbox.variables();

  @include layers.component() {
    --onyx-checkbox-label-padding-vertical: var(--onyx-density-xs);

    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);
    display: inline-flex;
    align-items: flex-start;
    cursor: pointer;
    width: max-content;
    max-width: 100%;

    &:has(&__label) {
      padding-right: var(--onyx-checkbox-label-padding-vertical);
    }

    &:hover {
      @include define-hover-border($state: ":enabled", $color: primary-hover);
      @include define-hover-border($state: ":user-invalid", $color: danger-hover);
    }

    &:has(&__input:focus-visible) {
      @include define-focus-ring($state: ":enabled", $color: primary);
      @include define-hover-border($state: ":enabled", $color: primary);

      @include define-focus-ring($state: ":user-invalid", $color: danger);
      @include define-hover-border($state: ":user-invalid", $color: danger);
    }

    &:has(&__input:disabled) {
      cursor: default;
      color: var(--onyx-color-text-icons-neutral-soft);
    }

    &:has(&__loading) {
      cursor: default;
    }

    &__container {
      display: inline-flex;
      align-items: flex-start;
      padding: var(--onyx-checkbox-input-padding);
      border-radius: var(--onyx-radius-full);
    }

    &__label {
      display: inline-block;
      padding: var(--onyx-checkbox-label-padding-vertical) 0;
    }

    &__input {
      @include checkbox.styles();
    }

    &__label,
    &__marker {
      padding: var(--onyx-checkbox-label-padding-vertical) 0;
      font-size: 1rem;
      line-height: 1.5rem;
    }

    &__loading {
      color: var(--onyx-color-text-icons-primary-intense);
      max-width: var(--onyx-checkbox-input-size);
      height: var(--onyx-checkbox-input-size);
    }
  }
}

.onyx-checkbox-skeleton {
  @include checkbox.variables();

  @include layers.component() {
    display: flex;
    align-items: flex-start;
    gap: var(--onyx-checkbox-input-padding);
    padding: var(--onyx-checkbox-input-padding);
    width: max-content;

    &__input {
      height: var(--onyx-checkbox-input-size);
      width: var(--onyx-checkbox-input-size);
    }

    &__label {
      height: var(--onyx-spacing-md);
      width: var(--onyx-spacing-3xl);
    }
  }
}
</style>
