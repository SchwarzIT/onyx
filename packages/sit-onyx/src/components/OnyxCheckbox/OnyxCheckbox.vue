<script lang="ts" setup generic="TValue extends SelectOptionValue = SelectOptionValue">
import { computed } from "vue";
import { useDensity } from "../../composables/density";
import { useRequired } from "../../composables/required";
import { useCustomValidity } from "../../composables/useCustomValidity";
import { OnyxLoadingIndicator } from "../../index";
import type { SelectOptionValue } from "../../types";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxCheckboxProps } from "./types";

const props = withDefaults(defineProps<OnyxCheckboxProps<TValue>>(), {
  modelValue: false,
  indeterminate: false,
  disabled: false,
  loading: false,
  required: false,
  skeleton: false,
  truncation: "ellipsis",
});

const emit = defineEmits<{
  /** Emitted when the checked state changes. */
  "update:modelValue": [value: boolean];
  /**
   * Emitted when the validity state of the input changes.
   */
  validityChange: [validity: ValidityState];
}>();

const isChecked = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const { requiredMarkerClass, requiredTypeClass } = useRequired(props);
const { densityClass } = useDensity(props);

const { vCustomValidity, title } = useCustomValidity({ props, emit });
</script>

<template>
  <div v-if="props.skeleton" :class="['onyx-checkbox-skeleton', densityClass]">
    <OnyxSkeleton class="onyx-checkbox-skeleton__input" />
    <OnyxSkeleton v-if="!props.hideLabel" class="onyx-checkbox-skeleton__label" />
  </div>

  <label v-else class="onyx-checkbox" :class="[requiredTypeClass, densityClass]" :title="title">
    <div class="onyx-checkbox__container">
      <OnyxLoadingIndicator v-if="props.loading" class="onyx-checkbox__loading" type="circle" />
      <input
        v-else
        v-model="isChecked"
        v-custom-validity
        :aria-label="props.hideLabel ? props.label : undefined"
        class="onyx-checkbox__input"
        type="checkbox"
        :indeterminate="props.indeterminate"
        :disabled="props.disabled"
        :required="props.required"
        :value="props.value"
        :autofocus="props.autofocus"
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
</template>

<style lang="scss">
@use "../../styles/mixins/layers";
@use "../../styles/mixins/density.scss";
@use "../../styles/mixins/checkbox.scss";

@mixin define-hover-border($state, $color) {
  .onyx-checkbox__input#{$state} {
    border-color: var(--onyx-color-base-#{$color}-300);
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
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);
    display: inline-flex;
    align-items: flex-start;
    cursor: pointer;
    width: max-content;
    max-width: 100%;

    @include density.compact {
      --onyx-checkbox-label-padding-vertical: var(--onyx-spacing-3xs);
    }
    @include density.default {
      --onyx-checkbox-label-padding-vertical: var(--onyx-spacing-2xs);
    }
    @include density.cozy {
      --onyx-checkbox-label-padding-vertical: var(--onyx-spacing-sm);
    }

    &:has(&__label) {
      padding-right: var(--onyx-spacing-2xs);
    }

    &:hover {
      @include define-hover-border($state: ":enabled", $color: primary);
      @include define-hover-border($state: ":user-invalid", $color: danger);
    }

    &:has(&__input:focus-visible) {
      @include define-focus-ring($state: ":enabled", $color: primary);
      @include define-focus-ring($state: ":user-invalid", $color: danger);
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
    gap: var(--onyx-spacing-md);
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
