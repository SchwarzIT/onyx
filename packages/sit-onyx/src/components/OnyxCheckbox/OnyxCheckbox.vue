<script lang="ts" setup generic="TValue extends SelectOptionValue = SelectOptionValue">
import { OnyxLoadingIndicator } from "@/index";
import { computed, ref } from "vue";
import { useDensity } from "../../composables/density";
import { useRequired } from "../../composables/required";
import type { SelectOptionValue } from "../../types";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxCheckboxProps } from "./types";

const props = withDefaults(defineProps<OnyxCheckboxProps<TValue>>(), {
  modelValue: false,
  indeterminate: false,
  disabled: false,
  loading: false,
  required: false,
  truncation: "ellipsis",
  skeleton: false,
});

const { requiredMarkerClass, requiredTypeClass } = useRequired(props);

const emit = defineEmits<{
  /** Emitted when the checked state changes. */
  "update:modelValue": [value: boolean];
}>();

const isChecked = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

/** True if the user has interacted with the checkbox once. */
const isTouched = ref(false);
const { densityClass } = useDensity(props);
</script>

<template>
  <div v-if="props.skeleton" :class="['onyx-checkbox-skeleton', densityClass]">
    <OnyxSkeleton class="onyx-checkbox-skeleton__input" />
    <OnyxSkeleton v-if="!props.hideLabel" class="onyx-checkbox-skeleton__label" />
  </div>

  <label v-else class="onyx-checkbox" :class="[requiredTypeClass, densityClass]">
    <div class="onyx-checkbox__container">
      <OnyxLoadingIndicator v-if="props.loading" class="onyx-checkbox__loading" type="circle" />
      <input
        v-else
        v-model="isChecked"
        :aria-label="props.hideLabel ? props.label : undefined"
        :title="props.hideLabel ? props.label : undefined"
        class="onyx-checkbox__input"
        :class="{
          'onyx-checkbox__input--touched': isTouched,
        }"
        type="checkbox"
        :indeterminate="props.indeterminate"
        :disabled="props.disabled"
        :required="props.required"
        :value="props.value"
        @blur="isTouched = true"
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
@use "../../styles/density.scss";

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

@mixin define-checked-background($state, $color) {
  &#{$state} {
    border-color: var(--onyx-color-base-#{$color}-500);
    background-color: var(--onyx-color-base-#{$color}-500);

    &:hover {
      background-color: var(--onyx-color-base-#{$color}-300);
    }
  }
}

.onyx-checkbox,
.onyx-checkbox-skeleton {
  @include density.compact {
    --onyx-checkbox-input-size: 0.75rem;
    --onyx-checkbox-input-padding: var(--onyx-spacing-xs);
  }

  @include density.default {
    --onyx-checkbox-input-size: 1rem;
    --onyx-checkbox-input-padding: var(--onyx-spacing-sm);
  }

  @include density.cozy {
    --onyx-checkbox-input-size: 1.5rem;
    --onyx-checkbox-input-padding: var(--onyx-spacing-sm);
  }
}

.onyx-checkbox {
  font-family: var(--onyx-font-family);
  color: var(--onyx-color-text-icons-neutral-intense);
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  width: max-content;
  max-width: 100%;
  box-sizing: border-box;

  &:has(&__label) {
    padding-right: var(--onyx-spacing-2xs);
  }

  $label-padding: var(--onyx-spacing-2xs);

  &::after {
    // since the checkbox is flex-start aligned, we need to adjust the padding of the asterisk / required marker
    padding-top: $label-padding;
  }

  &:hover {
    @include define-hover-border($state: ":enabled", $color: primary);

    &:has(.onyx-checkbox__input--touched) {
      @include define-hover-border($state: ":invalid", $color: danger);
    }
  }

  &:has(&__input:focus-visible) {
    @include define-focus-ring($state: ":enabled", $color: primary);

    &:has(.onyx-checkbox__input--touched) {
      @include define-focus-ring($state: ":invalid", $color: danger);
    }
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
    align-items: center;
    padding: var(--onyx-checkbox-input-padding);
    border-radius: var(--onyx-radius-full);
  }

  &__input {
    height: var(--onyx-checkbox-input-size);
    width: var(--onyx-checkbox-input-size);
    appearance: none;
    margin: 0;
    border-radius: var(--onyx-radius-sm);
    outline: none;
    cursor: inherit;
    border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-400);
    background: var(--onyx-color-base-background-blank);
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: 100% 100%;

    &:checked,
    &:indeterminate {
      @include define-checked-background(":enabled", primary);

      &.onyx-checkbox__input--touched {
        @include define-checked-background(":invalid", danger);
      }

      &:disabled {
        background-color: var(--onyx-color-base-neutral-300);
      }
    }

    &:disabled {
      border-color: var(--onyx-color-base-neutral-300);
    }

    &--touched {
      &:invalid {
        border-color: var(--onyx-color-base-danger-500);
      }
    }

    &:checked {
      // icon (with added fill='white'): check-small.svg
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' xml:space='preserve' viewBox='0 0 32 32'%3E%3Cpath d='m21.311 10.793-8.293 8.293-3.291-3.292-1.415 1.415 4.706 4.705 9.707-9.707z'/%3E%3C/svg%3E");
    }

    &:indeterminate {
      // icon (with added fill='white'): minus-small.svg
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' xml:space='preserve' viewBox='0 0 32 32'%3E%3Cpath d='M8 15h16v2H8z'/%3E%3C/svg%3E");
    }
  }

  &__label {
    display: inline-block;
    margin: 0;
  }

  &__label,
  &__marker {
    padding: $label-padding 0;
    font-size: 1rem;
    line-height: 1.5rem;
  }

  &__loading {
    color: var(--onyx-color-text-icons-primary-intense);
    max-width: var(--onyx-checkbox-input-size);
    height: var(--onyx-checkbox-input-size);
  }
}

.onyx-checkbox-skeleton {
  display: flex;
  align-items: center;
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
</style>
