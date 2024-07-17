<script lang="ts" setup generic="TValue extends SelectOptionValue">
import { CLOSING_KEYS, OPENING_KEYS } from "@sit-onyx/headless";
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
  return props.modelValue ? props.modelValue.length : 0;
});

/**
 * Selection that will be displayed in the select input field.
 * On single select, it matches the name of the option.
 * On multi select, it is a summary or a preview of the options.
 */
const selectionText = computed<string>(() => {
  const numberOfSelections = props.modelValue?.length;
  if (!props.modelValue || !numberOfSelections) return "";
  if (numberOfSelections === 1) return props.modelValue[0].label;

  switch (props.textMode) {
    case "preview":
      return props.modelValue.map(({ label }) => label).join(", ");
    case "summary":
    default:
      return t.value("selections.currentSelection", { n: numberOfSelections });
  }
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

const navigationalKeys = OPENING_KEYS.concat(CLOSING_KEYS);
/**
 * We prevent manual user input. The native input inside OnyxSelectInput only represents
 * the label(s) of what is selected in OnyxSelect and shouldn't be overwritten manually.
 * We only allow all pressed keys that handle interaction with the select.
 */
const blockTyping = (event: KeyboardEvent) => {
  if (navigationalKeys.includes(event.key)) return;

  event.preventDefault();
};
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
      <template #default="{ id }">
        <div class="onyx-select-input__wrapper">
          <OnyxLoadingIndicator
            v-if="props.loading"
            class="onyx-select-input__loading"
            type="circle"
          />

          <input
            :id="id"
            ref="input"
            v-custom-validity
            :class="{
              'onyx-select-input__native': true,
              'onyx-select-input__native--show-focus': props.showFocus,
              'onyx-truncation-ellipsis': true,
              'onyx-select-input__native--force-invalid': errorMessages && wasTouched,
            }"
            v-bind="restAttrs"
            type="text"
            :readonly="props.readonly"
            :placeholder="props.placeholder"
            :required="props.required"
            :disabled="props.disabled || props.loading"
            :aria-label="props.hideLabel ? props.label : undefined"
            :title="props.hideLabel ? props.label : undefined"
            :value="selectionText"
            :autofocus="props.autofocus"
            @click="emit('click')"
            @keydown="blockTyping"
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
            type="button"
            :aria-label="t('select.toggleDropDown')"
            tabindex="-1"
            :disabled="props.readonly || props.disabled || props.loading"
            @click="emit('click')"
          >
            <OnyxIcon :icon="chevronDownUp" />
          </button>
        </div>
      </template>
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

    &__native {
      // hide the blinking cursor as we suppress typing
      caret-color: transparent;
    }
    .onyx-select-input__wrapper:has(.onyx-select-input__native:enabled) {
      cursor: pointer;
      .onyx-select-input__native {
        cursor: pointer;
      }
    }

    /* button styles */
    &__button {
      all: initial;
      height: var(--onyx-spacing-lg);
      color: var(--onyx-color-text-icons-neutral-soft);

      &:enabled {
        cursor: pointer;
      }
    }
    // button on focus (not readonly)
    &:has(
        .onyx-select-input__native:enabled:read-write:focus,
        .onyx-select-input__native--show-focus:enabled:read-write
      ) {
      .onyx-select-input__button {
        color: var(--onyx-color-text-icons-primary-intense);
      }
      &:has(.onyx-select-input__native:user-invalid),
      &:has(.onyx-select-input__native--force-invalid) {
        .onyx-select-input__button {
          color: var(--onyx-color-text-icons-neutral-intense);
        }
      }
    }
    // button on hover (not readonly)
    .onyx-select-input__wrapper:has(.onyx-select-input__native:enabled:read-write):hover {
      .onyx-select-input__button {
        color: var(--onyx-color-text-icons-primary-medium);
      }

      &:has(.onyx-select-input__native:user-invalid),
      &:has(.onyx-select-input__native--force-invalid) {
        .onyx-select-input__button {
          color: var(--onyx-color-text-icons-neutral-medium);
        }
      }
    }

    &__badge {
      display: block;
      cursor: pointer;
    }

    &-skeleton {
      @include input.define-skeleton-styles(
        $height: calc(1lh + 2 * var(--onyx-select-input-padding-vertical))
      );
    }
  }
}
</style>
