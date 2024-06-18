<script lang="ts" setup generic="TValue extends SelectOptionValue">
import chevronDownUp from "@sit-onyx/icons/chevron-down-up.svg?raw";
import { computed, ref } from "vue";
import { useDensity } from "../../composables/density";
import { useRequired } from "../../composables/required";
import { injectI18n } from "../../i18n";
import type { SelectOptionValue } from "../../types";
import { useRootAttrs } from "../../utils/attrs";
import OnyxBadge from "../OnyxBadge/OnyxBadge.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import OnyxTooltip from "../OnyxTooltip/OnyxTooltip.vue";
import type { OnyxSelectInputProps } from "./types";

defineOptions({ inheritAttrs: false });
const { rootAttrs, restAttrs } = useRootAttrs();

const props = withDefaults(defineProps<OnyxSelectInputProps<TValue>>(), {
  hideLabel: false,
  loading: false,
  skeleton: false,
  readonly: false,
});

const emit = defineEmits<{
  click: [];
}>();

const { t } = injectI18n();

/**
 * Number of selected options.
 */
const selectionCount = computed(() => {
  if (Array.isArray(props.selection)) return props.selection.length;
  return props.selection ? 1 : 0;
});

/**
 * Selection that will be displayed in the select input field.
 * On single select, it matches the name of the option.
 * On multi select, it is a summary or a preview of the options.
 */
const selectionText = computed<string>(() => {
  if (Array.isArray(props.selection)) {
    const numberOfSelections = props.selection.length;
    if (!numberOfSelections) return "";
    if (numberOfSelections === 1) return props.selection[0].label;

    switch (props.textMode) {
      case "preview":
        return props.selection.map(({ label }) => label).join(", ");
      case "summary":
      default:
        return t.value("selections.currentSelection", { n: numberOfSelections });
    }
  }

  return props.selection?.label ?? "";
});

const { requiredMarkerClass, requiredTypeClass } = useRequired(props);
const { densityClass } = useDensity(props);

const input = ref<HTMLInputElement>();

defineExpose({ focus: () => input.value?.focus() });
</script>
<template>
  <div
    v-if="props.skeleton"
    :class="['onyx-select-input-skeleton', densityClass]"
    v-bind="rootAttrs"
  >
    <OnyxSkeleton v-if="!props.hideLabel" class="onyx-select-input-skeleton__label" />
    <OnyxSkeleton class="onyx-select-input-skeleton__input" />
  </div>

  <div
    v-else
    :class="[
      'onyx-select-input',
      requiredTypeClass,
      densityClass,
      props.readonly ? 'onyx-select-input--readonly' : 'onyx-select-input--editable',
    ]"
    v-bind="rootAttrs"
  >
    <label>
      <div
        v-if="!props.hideLabel"
        :class="['onyx-select-input__label', 'onyx-text--small', requiredMarkerClass]"
      >
        <div class="onyx-truncation-ellipsis">{{ props.label }}</div>
      </div>

      <div class="onyx-select-input__wrapper">
        <OnyxLoadingIndicator
          v-if="props.loading"
          class="onyx-select-input__loading"
          type="circle"
        />

        <input
          ref="input"
          :class="{
            'onyx-select-input__input': true,
            'onyx-select-input__input--show-focus': props.showFocus,
            'onyx-truncation-ellipsis': true,
          }"
          v-bind="restAttrs"
          type="text"
          readonly
          :placeholder="props.placeholder"
          :required="props.required"
          :disabled="props.disabled || props.loading"
          :aria-label="props.hideLabel ? props.label : undefined"
          :title="props.hideLabel ? props.label : undefined"
          :value="selectionText"
          :autofocus="props.autofocus"
          @click="emit('click')"
        />

        <!-- TODO: figure out how the tooltip width can be sized to the select-input
        while the trigger arrow needs to point to the badge in the future.
        https://github.com/SchwarzIT/onyx/issues/763 -->
        <OnyxTooltip
          v-if="props.textMode === 'preview' && selectionCount > 0"
          :text="selectionText"
          position="bottom"
        >
          <OnyxBadge class="onyx-select-input__badge" color="neutral">
            {{ selectionCount }}
          </OnyxBadge>
        </OnyxTooltip>

        <button
          class="onyx-select-input__button"
          :aria-label="t('select.toggleDropDown')"
          tabindex="-1"
          :disabled="props.readonly || props.disabled || props.loading"
          @click="emit('click')"
        >
          <OnyxIcon :icon="chevronDownUp" />
        </button>
      </div>
    </label>

    <div
      v-if="props.message"
      class="onyx-select-input__footer onyx-text--small onyx-truncation-ellipsis"
    >
      {{ props.message }}
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/density.scss";
@use "../../styles/mixins/layers.scss";

.onyx-select-input,
.onyx-select-input-skeleton {
  @include density.compact {
    --onyx-select-input-padding-vertical: var(--onyx-spacing-4xs);
  }

  @include density.default {
    --onyx-select-input-padding-vertical: var(--onyx-spacing-2xs);
  }

  @include density.cozy {
    --onyx-select-input-padding-vertical: var(--onyx-spacing-sm);
  }
}

.onyx-select-input {
  @include layers.component() {
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

    &__button {
      all: initial;
      height: var(--onyx-spacing-lg);
      color: var(--onyx-color-text-icons-neutral-medium);

      &:enabled {
        cursor: pointer;
      }
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

      padding: var(--onyx-select-input-padding-vertical) var(--onyx-spacing-sm);
      height: calc($line-height + 2 * var(--onyx-select-input-padding-vertical));
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
      .onyx-select-input__wrapper:has(.onyx-select-input__input:enabled) {
        cursor: pointer;
        // default hover
        &:hover {
          --border-color: var(--onyx-color-base-primary-400);
          .onyx-select-input__button {
            color: var(--onyx-color-text-icons-primary-medium);
          }
        }
      }
      // default focus
      &:has(
          .onyx-select-input__input:enabled:focus,
          .onyx-select-input__input--show-focus:enabled
        ) {
        .onyx-select-input {
          &__wrapper {
            --border-color: var(--onyx-color-base-primary-500);
            outline: var(--onyx-spacing-4xs) solid var(--onyx-color-base-primary-200);
          }

          &__button {
            color: var(--onyx-color-text-icons-primary-intense);
          }
        }
      }
    }

    // readonly focus
    &--readonly:has(
        .onyx-select-input__input:enabled:focus,
        .onyx-select-input__input--show-focus:enabled
      )
      .onyx-select-input__wrapper {
      outline: var(--onyx-spacing-4xs) solid var(--onyx-color-base-neutral-200);
    }

    &:has(&__input:disabled),
    &--readonly {
      .onyx-select-input {
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

    &--readonly {
      .onyx-select-input__wrapper:hover {
        --border-color: var(--onyx-color-base-neutral-400);
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
        height: calc($line-height + 2 * var(--onyx-select-input-padding-vertical));
      }
    }
  }
}
</style>
