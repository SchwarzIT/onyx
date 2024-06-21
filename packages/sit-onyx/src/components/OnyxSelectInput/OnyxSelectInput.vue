<script lang="ts" setup generic="TValue extends SelectOptionValue">
import chevronDownUp from "@sit-onyx/icons/chevron-down-up.svg?raw";
import { computed, ref, watch } from "vue";
import { useDensity } from "../../composables/density";
import { useCustomValidity } from "../../composables/useCustomValidity";
import { injectI18n } from "../../i18n";
import type { SelectOptionValue } from "../../types";
import { useRootAttrs } from "../../utils/attrs";
import OnyxBadge from "../OnyxBadge/OnyxBadge.vue";
import OnyxFormElement from "../OnyxFormElement/OnyxFormElement.vue";
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
  /**
   * Emitted when the select input is clicked (and is not disabled).
   */
  click: [];
  /**
   * Emitted when the validity state of the input changes.
   */
  validityChange: [validity: ValidityState];
}>();

const { t } = injectI18n();

const { vCustomValidity, errorMessages } = useCustomValidity({ props, emit });

/**
 * Number of selected options.
 */
const selectionCount = computed(() => {
  if (Array.isArray(props.modelValue)) return props.modelValue.length;
  return props.modelValue ? 1 : 0;
});

/**
 * Selection that will be displayed in the select input field.
 * On single select, it matches the name of the option.
 * On multi select, it is a summary or a preview of the options.
 */
const selectionText = computed<string>(() => {
  if (Array.isArray(props.modelValue)) {
    const numberOfSelections = props.modelValue.length;
    if (!numberOfSelections) return "";
    if (numberOfSelections === 1) return props.modelValue[0].label;

    switch (props.textMode) {
      case "preview":
        return props.modelValue.map(({ label }) => label).join(", ");
      case "summary":
      default:
        return t.value("selections.currentSelection", { n: numberOfSelections });
    }
  }

  return props.modelValue?.label ?? "";
});

/** used to detect user interaction to simulate the behavior of :user-invalid for the native input */
const wasTouched = ref(false);

const { densityClass } = useDensity(props);

const input = ref<HTMLInputElement>();

defineExpose({ focus: () => input.value?.focus() });

/**
 * As the native input has to be readonly, the :user-invalid will never appear.
 * We need to track user interaction by evaluating whether the flyout was ever closed.
 * After that, we can simulate :user-invalid by checking whether an error is set.
 */
watch(
  () => props.showFocus,
  (newValue, oldValue) => {
    // only needs to be set once.
    if (wasTouched.value) return;
    if (oldValue && newValue === false) {
      wasTouched.value = true;
    }
  },
);
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
      densityClass,
      props.readonly ? 'onyx-select-input--readonly' : 'onyx-select-input--editable',
    ]"
    v-bind="rootAttrs"
  >
    <OnyxFormElement v-bind="props" :error-messages="errorMessages">
      <div class="onyx-select-input__wrapper">
        <OnyxLoadingIndicator
          v-if="props.loading"
          class="onyx-select-input__loading"
          type="circle"
        />

        <input
          ref="input"
          v-custom-validity
          :class="{
            'onyx-select-input__native': true,
            'onyx-select-input__native--show-focus': props.showFocus,
            'onyx-truncation-ellipsis': true,
            'onyx-select-input__native--force-error': errorMessages && wasTouched,
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
    </OnyxFormElement>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/density.scss";
@use "../../styles/mixins/layers.scss";
@use "../../styles/mixins/input.scss";

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
    @include input.define-shared-styles(
      $base-selector: ".onyx-select-input",
      $vertical-padding: var(--onyx-select-input-padding-vertical)
    );

    --selection-color: var(--onyx-color-base-neutral-200);
    font-family: var(--onyx-font-family);
    display: flex;
    flex-direction: column;
    gap: var(--onyx-spacing-5xs);

    &__button {
      all: initial;
      height: var(--onyx-spacing-lg);
      color: var(--onyx-color-text-icons-neutral-medium);

      &:enabled {
        cursor: pointer;
      }
    }

    &__badge {
      display: block;
      cursor: pointer;
    }

    &__loading {
      color: var(--onyx-color-text-icons-primary-intense);
    }

    /** The internal input is always "readonly" because typing is not allowed.
     * That's why we need to rely on modifier classes instead of using pseudo classes
     */
    &--editable {
      .onyx-select-input__wrapper:has(.onyx-select-input__native:enabled) {
        cursor: pointer;
        .onyx-select-input__native {
          cursor: pointer;
        }

        // default hover
        &:hover {
          @include input.define-enabled-hover();
          .onyx-select-input__button {
            color: var(--onyx-color-text-icons-primary-medium);
          }
        }
      }
      // default focus
      &:has(
          .onyx-select-input__native:enabled:focus,
          .onyx-select-input__native--show-focus:enabled
        ) {
        .onyx-select-input {
          &__wrapper {
            @include input.define-enabled-focus();
          }

          &__button {
            color: var(--onyx-color-text-icons-primary-intense);
          }
        }
      }
    }

    // readonly focus
    &--readonly:has(
        .onyx-select-input__native:enabled:focus,
        .onyx-select-input__native--show-focus:enabled
      )
      .onyx-select-input__wrapper {
      outline: var(--onyx-spacing-4xs) solid var(--onyx-color-base-neutral-200);
      --border-color: var(--onyx-color-base-neutral-400);
    }

    &:has(&__native:disabled),
    &--readonly {
      .onyx-select-input {
        &__wrapper {
          background-color: var(--onyx-color-base-background-tinted);
          color: var(--onyx-color-text-icons-neutral-soft);
          --border-color: var(--onyx-color-base-neutral-300);
        }
      }
    }

    &--readonly {
      .onyx-select-input__native:enabled {
        cursor: initial;
      }

      .onyx-select-input__wrapper:hover {
        --border-color: var(--onyx-color-base-neutral-400);
      }
    }

    &-skeleton {
      @include input.define-skeleton-styles(
        $height: calc(1lh + 2 * var(--onyx-select-input-padding-vertical))
      );
    }
  }
}
</style>
