<script lang="ts" setup>
import { useRequired } from "@/composables/required";
import type { OnyxSelectProps } from "./types";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import { computed } from "vue";

const props = withDefaults(defineProps<OnyxSelectProps>(), {
  modelValue: "",
  hideLabel: false,
  skeleton: false,
  loading: false,
  multiselect: false,
  multiSelectDisplay: "summary",
});

const emit = defineEmits<{
  /**
   * Emitted when the current value changes.
   * TODO: change the type after the flyout gets added and the select becomes a real interactive component!
   */
  "update:modelValue": [value: string];
}>();

/**
 * Selection that will be displayed in the select input field.
 * On single select, it matches the name of the option.
 * On multi select, it is a summary of the options.
 * TODO: extract the text after the select type gets changed
 * TODO: transform text for multi select
 */
const selectionText = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const { requiredMarkerClass, requiredTypeClass } = useRequired(props);
</script>

<template>
  <div :class="['onyx-select', requiredTypeClass]">
    <label>
      <div
        v-if="!props.hideLabel"
        :class="['onyx-select__label', 'onyx-text--small', requiredMarkerClass]"
      >
        <div class="onyx-truncation-ellipsis">{{ props.label }}</div>
      </div>

      <div class="onyx-select__wrapper">
        <OnyxLoadingIndicator v-if="props.loading" class="onyx-select__loading" type="circle" />

        <input
          v-model="selectionText"
          class="onyx-select__input"
          :placeholder="props.placeholder"
          type="text"
          :required="props.required"
          readonly
          :disabled="props.disabled || props.loading"
          :aria-label="props.hideLabel ? props.label : undefined"
          :title="props.hideLabel ? props.label : undefined"
        />
      </div>
    </label>

    <div v-if="props.message" class="onyx-select__footer onyx-text--small onyx-truncation-ellipsis">
      {{ props.message }}
    </div>
  </div>
</template>

<style lang="scss">
.onyx-select {
  --border-color: var(--onyx-color-base-neutral-300);
  --selection-color: var(--onyx-color-base-neutral-200);

  font-family: var(--onyx-font-family);
  display: flex;
  flex-direction: column;
  gap: var(--onyx-spacing-5xs);

  &__label {
    display: flex;
    margin-bottom: var(--onyx-spacing-5xs);
    color: var(--onyx-color-text-icons-neutral-medium);

    // optional marker should be displayed at the very end of the label
    &.onyx-optional-marker {
      justify-content: space-between;
    }
  }

  $padding-vertical: var(--onyx-spacing-2xs);
  $line-height: 1.5rem;

  &__wrapper {
    border-radius: var(--onyx-radius-sm);
    border: var(--onyx-1px-in-rem) solid var(--border-color);
    background-color: var(--onyx-color-base-background-tinted);
    color: var(--onyx-color-text-icons-neutral-intense);

    display: flex;
    align-items: center;
    gap: var(--onyx-spacing-2xs);

    font-size: 1rem;
    line-height: $line-height;

    box-sizing: border-box;
    padding: $padding-vertical var(--onyx-spacing-sm);
    height: calc($line-height + 2 * $padding-vertical);

    &:has(.onyx-select__input:read-write:hover) {
      border-color: var(--onyx-color-base-primary-400);
    }

    &:has(.onyx-select__input:enabled:focus) {
      --border-color: var(--onyx-color-base-primary-500);
      outline: var(--onyx-spacing-4xs) solid var(--onyx-color-base-primary-200);
    }

    // styles when not disabled
    &:has(.onyx-select__input:enabled) {
      &:has(.onyx-select__input:hover) {
        --border-color: var(--onyx-color-base-neutral-400);
      }

      &:has(.onyx-select__input:focus) {
        --border-color: var(--onyx-color-base-neutral-500);
        outline-color: var(--onyx-color-base-neutral-200);
      }
    }
  }

  &__input {
    // reset native input styles so they are inherited from the parent
    border: none;
    border-radius: inherit;
    background-color: transparent;
    color: inherit;
    width: 100%;
    outline: none;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    padding: 0;

    &::placeholder {
      color: var(--onyx-color-text-icons-neutral-soft);
      opacity: 1;
    }

    &::selection {
      background: var(--selection-color);
    }
  }

  &:has(&__input:disabled) {
    .onyx-select {
      &__label {
        color: var(--onyx-color-text-icons-neutral-soft);
      }

      &__wrapper {
        color: var(--onyx-color-text-icons-neutral-soft);
      }
    }
  }

  &__loading {
    color: var(--onyx-color-text-icons-primary-intense);
  }

  &__footer {
    width: 100%;
    color: var(--onyx-color-text-icons-neutral-soft);
  }
}
</style>
