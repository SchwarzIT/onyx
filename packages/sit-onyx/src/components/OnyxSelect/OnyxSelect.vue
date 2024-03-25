<!-- TODO: change the generic "extends" from string/[] to whatever listbox and combobox need -->
<script lang="ts" setup generic="TValue extends string | string[] = string">
import { useRequired } from "@/composables/required";
import chevronDownUp from "@sit-onyx/icons/chevron-down-up.svg?raw";
import { computed } from "vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import type { OnyxSelectProps } from "./types";
import OnyxTooltip from "../OnyxTooltip/OnyxTooltip.vue";

const props = withDefaults(defineProps<OnyxSelectProps<TValue>>(), {
  hideLabel: false,
  skeleton: false,
  loading: false,
  multiple: false,
  multiselectTextMode: "summary",
});

defineEmits<{
  /**
   * Emitted when the current value changes.
   * TODO: change the type after the flyout gets added and the select becomes a real interactive component!
   */
  "update:modelValue": [value: typeof props.modelValue];
}>();

const previewBadgeNumber = computed<number | undefined>(() => {
  if (Array.isArray(props.modelValue) && props.multiselectTextMode === "preview") {
    return props.modelValue.length;
  }
  return undefined;
});

/**
 * Selection that will be displayed in the select input field.
 * On single select, it matches the name of the option.
 * On multi select, it is a summary of the options.
 * TODO: extract the text after the select type gets changed
 */
const selectionText = computed<string>(() => {
  if (Array.isArray(props.modelValue)) {
    const numberOfItems = props.modelValue.length;
    switch (props.multiselectTextMode) {
      case "summary":
        if (!numberOfItems) return "";
        if (numberOfItems === 1) return props.modelValue[0];
        // TODO: translate.
        return `${numberOfItems} Selected`;
      case "preview":
        return props.modelValue.join(", ");
    }
  }

  return (props.modelValue ?? "") as string;
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

        <!-- TODO: use HTML select instead of input? -->
        <input
          v-model="selectionText"
          class="onyx-select__input onyx-truncation-ellipsis"
          :placeholder="props.placeholder"
          type="text"
          :required="props.required"
          readonly
          :disabled="props.disabled || props.loading"
          :aria-label="props.hideLabel ? props.label : undefined"
          :title="props.hideLabel ? props.label : undefined"
        />

        <!-- TODO: figure out how the tooltip width can be sized to the select-input 
        while the trigger arrow needs to point to the badge.. -->
        <OnyxTooltip v-if="previewBadgeNumber" :text="selectionText" position="bottom">
          <!-- TODO: use OnyxBadge component once it is implemented -->
          <div class="onyx-badge">{{ previewBadgeNumber }}</div>
        </OnyxTooltip>

        <OnyxIcon :icon="chevronDownUp" class="onyx-select__icon" />
      </div>
    </label>

    <div v-if="props.message" class="onyx-select__footer onyx-text--small onyx-truncation-ellipsis">
      {{ props.message }}
    </div>
  </div>
</template>

<style lang="scss">
// TODO: fine-tune styles, they are based on the OnyxInput so far.
.onyx-select {
  --border-color: var(--onyx-color-base-neutral-300);
  --selection-color: var(--onyx-color-base-neutral-200);

  font-family: var(--onyx-font-family);
  display: flex;
  flex-direction: column;
  gap: var(--onyx-spacing-2xs);

  &__label {
    display: flex;
    margin-bottom: var(--onyx-spacing-5xs);
    color: var(--onyx-color-text-icons-neutral-medium);

    // optional marker should be displayed at the very end of the label
    &.onyx-optional-marker {
      justify-content: space-between;
    }
  }

  &__icon {
    color: var(--onyx-color-text-icons-neutral-medium);
  }

  &__wrapper {
    $padding-vertical: var(--onyx-spacing-2xs);
    $line-height: 1.5rem;

    border-radius: var(--onyx-radius-sm);
    border: var(--onyx-1px-in-rem) solid var(--border-color);
    background: var(--onyx-color-base-background-blank);
    color: var(--onyx-color-text-icons-neutral-intense);

    display: flex;
    align-items: center;
    gap: var(--onyx-spacing-2xs);

    font-size: 1rem;
    line-height: $line-height;

    box-sizing: border-box;
    padding: $padding-vertical var(--onyx-spacing-sm);
    height: calc($line-height + 2 * $padding-vertical);

    &:has(.onyx-select__input:enabled) {
      cursor: pointer;

      &:hover {
        --border-color: var(--onyx-color-base-primary-400);

        .onyx-select__icon {
          color: var(--onyx-color-text-icons-primary-medium);
        }
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
    cursor: inherit;

    &::placeholder {
      color: var(--onyx-color-text-icons-neutral-soft);
      opacity: 1;
      font-weight: 400;
    }

    &::selection {
      background: var(--selection-color);
    }
  }

  &:has(.onyx-select__input:enabled:focus) {
    .onyx-select {
      &__wrapper {
        --border-color: var(--onyx-color-base-primary-500);
        outline: var(--onyx-spacing-4xs) solid var(--onyx-color-base-primary-200);
      }

      &__icon {
        color: var(--onyx-color-text-icons-primary-intense);
      }
    }
  }
  &:has(&__input:disabled) {
    .onyx-select {
      &__label {
        color: var(--onyx-color-text-icons-neutral-soft);
      }

      &__wrapper {
        background-color: var(--onyx-color-base-background-tinted);
        color: var(--onyx-color-text-icons-neutral-soft);
        --border-color: var(--onyx-color-base-neutral-300);
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

// TODO: remove badge styles once onyxBadge is implemented
.onyx-badge {
  text-align: center;
  padding: var(--onyx-spacing-5xs) var(--onyx-spacing-sm);
  border-radius: var(--onyx-radius-full);
  background: var(--onyx-color-base-neutral-700);
  color: var(--onyx-color-text-icons-neutral-inverted);
}
</style>
