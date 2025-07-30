<script lang="ts" setup generic="TValue extends SelectOptionValue">
import { CLOSING_KEYS, OPENING_KEYS } from "@sit-onyx/headless";
import { iconCheckSmall, iconChevronDownUp } from "@sit-onyx/icons";
import { computed, ref, useTemplateRef, watch } from "vue";
import { useDensity } from "../../composables/density.js";
import { useAutofocus } from "../../composables/useAutoFocus.js";
import { getFormMessages, useCustomValidity } from "../../composables/useCustomValidity.js";
import { useErrorClass } from "../../composables/useErrorClass.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import { injectI18n } from "../../i18n/index.js";
import type { SelectOptionValue } from "../../types/index.js";
import { useRootAttrs } from "../../utils/attrs.js";
import OnyxBadge from "../OnyxBadge/OnyxBadge.vue";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxFormElement from "../OnyxFormElement/OnyxFormElement.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import OnyxTooltip from "../OnyxTooltip/OnyxTooltip.vue";
import type { OnyxSelectInputProps } from "./types.js";

defineOptions({ inheritAttrs: false });
const { rootAttrs, restAttrs } = useRootAttrs();

const props = withDefaults(defineProps<OnyxSelectInputProps>(), {
  hideLabel: false,
  disabled: FORM_INJECTED_SYMBOL,
  showError: FORM_INJECTED_SYMBOL,
  readonly: false,
  loading: false,
  skeleton: SKELETON_INJECTED_SYMBOL,
  hideSuccessIcon: false,
});

const emit = defineEmits<{
  /**
   * Emitted when the select input is clicked (and is not disabled).
   */
  inputClick: [];
  /**
   * Emitted when the validity state of the input changes.
   */
  validityChange: [validity: ValidityState];
}>();

const { t } = injectI18n();

const { vCustomValidity, errorMessages } = useCustomValidity({ props, emit });
const successMessages = computed(() => getFormMessages(props.success));
const messages = computed(() => getFormMessages(props.message));
const { disabled, showError } = useFormContext(props);
const skeleton = useSkeletonContext(props);
const errorClass = useErrorClass(showError);

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
  if (numberOfSelections === 1) return props.modelValue[0];

  switch (props.textMode) {
    case "preview":
      return props.modelValue.join(", ");
    case "summary":
    default:
      return t.value("selections.currentSelection", { n: numberOfSelections });
  }
});

/** used to detect user interaction to simulate the behavior of :user-invalid for the native input */
const wasTouched = ref(false);

const { densityClass } = useDensity(props);

const input = useTemplateRef("inputRef");
defineExpose({ input });

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
useAutofocus(input, props);
</script>

<template>
  <div
    v-if="skeleton"
    :class="['onyx-component', 'onyx-select-input-skeleton', densityClass]"
    v-bind="rootAttrs"
  >
    <OnyxSkeleton v-if="!props.hideLabel" class="onyx-select-input-skeleton__label" />
    <OnyxSkeleton class="onyx-select-input-skeleton__input" />
  </div>

  <div
    v-else
    :class="[
      'onyx-component',
      'onyx-select-input',
      densityClass,
      errorClass,
      props.readonly ? 'onyx-select-input--readonly' : 'onyx-select-input--editable',
    ]"
    v-bind="rootAttrs"
  >
    <OnyxFormElement
      v-bind="props"
      :message="messages"
      :success-messages="successMessages"
      :error-messages="errorMessages"
    >
      <template #default="{ id: inputId }">
        <!-- eslint-disable-next-line vuejs-accessibility/click-events-have-key-events, vuejs-accessibility/no-static-element-interactions -- Disabled rules are needed here, because of the click event. Otherwise clicking on the padding or gap won't open the select -->
        <div
          class="onyx-select-input__wrapper"
          @click="!disabled && !props.loading && emit('inputClick')"
        >
          <OnyxLoadingIndicator
            v-if="props.loading"
            class="onyx-select-input__loading"
            type="circle"
          />

          <input
            :id="inputId"
            ref="inputRef"
            v-custom-validity
            :class="{
              'onyx-select-input__native': true,
              'onyx-select-input__native--show-focus': props.showFocus,
              'onyx-truncation-ellipsis': true,
              'onyx-select-input__native--touched': wasTouched,
            }"
            v-bind="restAttrs"
            type="text"
            :readonly="props.readonly"
            :placeholder="props.placeholder"
            :required="props.required"
            :disabled="disabled || props.loading"
            :aria-label="props.hideLabel ? props.label : undefined"
            :title="props.hideLabel ? props.label : undefined"
            :value="selectionText"
            :autofocus="props.autofocus"
            autocomplete="off"
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
            <template #default="{ trigger }">
              <OnyxBadge class="onyx-select-input__badge" v-bind="trigger" color="neutral">
                {{ selectionCount }}
              </OnyxBadge>
            </template>
          </OnyxTooltip>

          <button
            class="onyx-select-input__button"
            type="button"
            :aria-label="t('select.toggleDropDown')"
            :title="t('select.toggleDropDown')"
            tabindex="-1"
            :disabled="disabled || props.readonly || props.loading"
          >
            <OnyxIcon :icon="iconChevronDownUp" />
          </button>

          <OnyxIcon
            v-if="!props.hideSuccessIcon && successMessages"
            class="onyx-select-input__check-icon"
            :icon="iconCheckSmall"
            color="success"
          />
        </div>
      </template>
    </OnyxFormElement>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";
@use "../../styles/mixins/input.scss";

.onyx-select-input,
.onyx-select-input-skeleton {
  --onyx-select-input-padding-vertical: var(--onyx-density-xs);
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
