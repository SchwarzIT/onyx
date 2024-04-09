<!-- TODO: change the generic "extends" from string/[] to whatever listbox and combobox need
https://github.com/SchwarzIT/onyx/issues/565 -->
<script
  lang="ts"
  setup
  generic="TValue extends SelectModelValue<TMultiple>, TMultiple extends Multiple"
>
import { useRequired } from "@/composables/required";
import { injectI18n } from "@/i18n";
import chevronDownUp from "@sit-onyx/icons/chevron-down-up.svg?raw";
import { computed } from "vue";
import { OnyxIcon, OnyxSkeleton, OnyxTooltip, OnyxBadge } from "../..";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import type { Multiple, MultiselectTextMode, OnyxSelectProps, SelectModelValue } from "./types";
import { useDensity } from "@/composables/density";

const props = withDefaults(defineProps<OnyxSelectProps<TValue, TMultiple>>(), {
  hideLabel: false,
  loading: false,
  skeleton: false,
  readonly: false,
});

defineEmits<{
  /**
   * Emitted when the current value changes.
   * TODO: change the type after the flyout gets added and the select becomes a real interactive component!
   *       https://github.com/SchwarzIT/onyx/issues/565
   */
  "update:modelValue": [value: typeof props.modelValue];
}>();

const { t } = injectI18n();

/**
 * The mode in which a multiselect value text should be displayed.
 * Falls back to summary if not specified.
 */
const multipleTextMode = computed<MultiselectTextMode | undefined>(() => {
  if (!props.multiple) return undefined;
  if (typeof props.multiple === "boolean") return "summary";
  return props.multiple?.textMode ?? "summary";
});

const previewBadgeNumber = computed<number | undefined>(() => {
  if (props.modelValue && multipleTextMode.value === "preview") {
    return props.modelValue.length;
  }
  return undefined;
});

/**
 * Selection that will be displayed in the select input field.
 * On single select, it matches the name of the option.
 * On multi select, it is a summary or a preview of the options.
 * TODO: extract the text from the SelectOption(s) after the modelValue type gets changed
 *       https://github.com/SchwarzIT/onyx/issues/565
 */
const selectionText = computed<string>(() => {
  if (Array.isArray(props.modelValue)) {
    const numberOfSelections = props.modelValue.length;
    if (!numberOfSelections) return "";
    if (numberOfSelections === 1) return props.modelValue[0];

    switch (multipleTextMode.value) {
      case "preview":
        return props.modelValue.join(", ");
      case "summary":
      default:
        return t.value("selections.currentSelection", { n: numberOfSelections });
    }
  }

  return props.modelValue ?? "";
});

const { requiredMarkerClass, requiredTypeClass } = useRequired(props);
const { densityClass } = useDensity(props);
</script>
<template>
  <div v-if="props.skeleton" :class="['onyx-select-skeleton', densityClass]">
    <OnyxSkeleton v-if="!props.hideLabel" class="onyx-select-skeleton__label" />
    <OnyxSkeleton class="onyx-select-skeleton__input" />
  </div>

  <div
    v-else
    :class="[
      'onyx-select',
      requiredTypeClass,
      densityClass,
      props.readonly ? 'onyx-select--readonly' : 'onyx-select--editable',
    ]"
  >
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
          class="onyx-select__input onyx-truncation-ellipsis"
          :placeholder="props.placeholder"
          type="text"
          role="presentation"
          :required="props.required"
          readonly
          :disabled="props.disabled || props.loading"
          :aria-label="props.hideLabel ? props.label : undefined"
          :title="props.hideLabel ? props.label : undefined"
        />

        <!-- TODO: figure out how the tooltip width can be sized to the select-input 
        while the trigger arrow needs to point to the badge in the future.
        https://github.com/SchwarzIT/onyx/issues/763 -->
        <OnyxTooltip v-if="previewBadgeNumber" :text="selectionText" position="bottom">
          <OnyxBadge class="onyx-select__badge" variation="neutral">{{
            previewBadgeNumber
          }}</OnyxBadge>
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
@use "../../styles/density.scss";

.onyx-select,
.onyx-select-skeleton {
  @include density.compact {
    --onyx-select-padding-vertical: var(--onyx-spacing-4xs);
  }

  @include density.default {
    --onyx-select-padding-vertical: var(--onyx-spacing-2xs);
  }

  @include density.cozy {
    --onyx-select-padding-vertical: var(--onyx-spacing-sm);
  }
}

.onyx-select {
  $line-height: 1.5rem;

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

  &__icon {
    color: var(--onyx-color-text-icons-neutral-medium);
  }

  &__wrapper {
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

    padding: var(--onyx-select-padding-vertical) var(--onyx-spacing-sm);
    height: calc($line-height + 2 * var(--onyx-select-padding-vertical));
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

  &__badge {
    display: block;
    cursor: pointer;
  }

  &__loading {
    color: var(--onyx-color-text-icons-primary-intense);
  }

  &__footer {
    width: 100%;
    color: var(--onyx-color-text-icons-neutral-soft);
  }

  &--editable {
    .onyx-select__wrapper:has(.onyx-select__input:enabled) {
      cursor: pointer;
      // default hover
      &:hover {
        --border-color: var(--onyx-color-base-primary-400);
        .onyx-select__icon {
          color: var(--onyx-color-text-icons-primary-medium);
        }
      }
    }
    // default focus
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
  }

  // readonly focus
  &--readonly:has(.onyx-select__input:enabled:focus) .onyx-select__wrapper {
    outline: var(--onyx-spacing-4xs) solid var(--onyx-color-base-neutral-200);
  }

  &:has(&__input:disabled),
  &--readonly {
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

  &-skeleton {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-spacing-5xs);
    &__label {
      width: var(--onyx-spacing-3xl);
      height: 1.25rem;
    }
    &__input {
      width: 17rem;
      height: calc($line-height + 2 * var(--onyx-select-padding-vertical));
    }
  }
}
</style>
