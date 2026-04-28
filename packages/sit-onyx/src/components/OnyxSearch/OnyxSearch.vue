<script lang="ts" setup>
import { iconBookmark, iconFilter, iconSearch } from "@sit-onyx/icons";
import { computed, useTemplateRef } from "vue";
import { useAutofocus } from "../../composables/useAutoFocus.js";
import { useVModel } from "../../composables/useVModel.js";
import { useForwardProps } from "../../utils/props.js";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxInput from "../OnyxInput/OnyxInput.vue";
import OnyxSeparator from "../OnyxSeparator/OnyxSeparator.vue";
import OnyxShortcut from "../OnyxShortcut/OnyxShortcut.vue";
import type { OnyxSearchProps } from "./types.js";

const props = withDefaults(defineProps<OnyxSearchProps>(), {
  color: "blank",
  cornerRadius: "soft",
  disabled: FORM_INJECTED_SYMBOL,
});

const emit = defineEmits<{
  /**
   * Emitted when the input changes
   */
  "update:modelValue": [value: string];
  /**
   * Emitted when the filter button is click
   */
  "update:showFilter": [value: boolean];
  /**
   * EMitted when the personal filter button is click
   */
  "update:showPersonalFilter": [value: boolean];
}>();

/**
 * Current value of the input.
 */
const modelValue = useVModel({
  key: "modelValue",
  props,
  emit,
  default: "",
});
const showFilter = useVModel({
  key: "showFilter",
  props,
  emit,
  default: undefined,
});
const showPersonalFilter = useVModel({
  key: "showPersonalFilter",
  props,
  emit,
  default: undefined,
});

const inputProps = useForwardProps(props, OnyxInput);
const { disabled } = useFormContext(props);

const inputComponent = useTemplateRef("inputComponent");
const input = computed(() => inputComponent.value?.input ?? null);

useAutofocus(input, props);

defineExpose({ input });
</script>

<template>
  <search
    :class="[
      'onyx-search',
      'onyx-component',
      `onyx-search--${props.color}`,
      `onyx-search--${props.cornerRadius}`,
    ]"
  >
    <form @submit.prevent>
      <OnyxInput
        ref="inputComponent"
        v-bind="inputProps"
        v-model="modelValue"
        required
        :show-error="false"
        type="search"
        hide-label
      >
        <template #trailingIcons>
          <div v-show="!modelValue || modelValue === ''" class="onyx-search__placeholder">
            <OnyxShortcut
              v-if="props.shortcut"
              v-bind="props.shortcut"
              highlight="auto"
              @complete="input?.focus()"
            />
          </div>
        </template>
        <template #leadingIcons>
          <OnyxIcon class="onyx-search__icon" :icon="iconSearch" />
        </template>

        <template v-if="!disabled && typeof showFilter === 'boolean'" #trailing>
          <button
            v-if="typeof showPersonalFilter === 'boolean' && typeof showFilter === 'boolean'"
            class="onyx-search__button"
            type="button"
            :disabled="disabled || props.loading"
            aria-label="test"
            @click="
              () => {
                showPersonalFilter = !showPersonalFilter;
              }
            "
          >
            <OnyxIcon :icon="iconBookmark" />
          </button>
          <OnyxSeparator
            v-if="typeof showPersonalFilter === 'boolean' && typeof showFilter === 'boolean'"
            orientation="vertical"
          />
          <button
            v-if="typeof showFilter === 'boolean'"
            class="onyx-search__button"
            type="button"
            :disabled="disabled || props.loading"
            aria-label="test"
            @click="
              () => {
                showFilter = !showFilter;
              }
            "
          >
            <OnyxIcon :icon="iconFilter" />
          </button>
        </template>
      </OnyxInput>
    </form>
  </search>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";
@use "../../styles/mixins/input.scss";

.onyx-search {
  @include layers.component() {
    cursor: pointer;
    position: relative;

    &--blank .onyx-input {
      --onyx-form-element-v2-background: var(--onyx-color-base-background-blank);
    }

    &--tinted .onyx-input {
      --onyx-form-element-v2-background: var(--onyx-color-base-background-tinted);
    }

    &--soft .onyx-input {
      --onyx-form-element-v2-border-radius: var(--onyx-radius-sm);
    }

    &--strong .onyx-input {
      --onyx-form-element-v2-border-radius: var(--onyx-radius-md);
    }

    .onyx-separator {
      height: 100%;
    }

    .onyx-form-element-v2__icons.onyx-form-element-v2__icons--trailing {
      padding: 0;
    }

    &__placeholder {
      position: absolute;
      left: calc(var(--onyx-density-sm) + 24px);
      padding: var(--onyx-form-element-v2-padding-block)
        var(--onyx-form-element-v2-padding-inline-icons);
      pointer-events: none;
      .onyx-shortcut {
        font-size: var(--onyx-font-size-sm);
      }
      .onyx-key {
        min-width: 20px;
        height: 20px;
        font-size: var(--onyx-font-size-sm);
      }
    }
    &:has(.onyx-input:focus-visible) {
      .onyx-search__placeholder {
        display: none;
      }
    }

    &__button {
      border: none;
      height: 100%;
      background-color: transparent;
      color: var(--onyx-color-text-icons-neutral-medium);
      display: inline-flex;
      align-items: center;
      padding: var(--onyx-form-element-v2-padding-block);
      border-radius: inherit;
      outline: none;

      &:enabled {
        cursor: pointer;

        &:hover,
        &:focus-visible {
          .onyx-icon {
            --icon-color: var(--onyx-color-text-icons-primary-intense);
          }
        }

        &:focus-visible {
          outline: none;
          background-color: var(--onyx-color-base-primary-100);
        }

        &:active {
          background-color: var(--onyx-color-base-primary-100);
        }
      }
    }

    &:focus-within,
    &:hover {
      .onyx-search__icon {
        --icon-color: var(--onyx-color-text-icons-primary-intense);
      }
    }

    &:has(.onyx-input__native:disabled) {
      cursor: default;

      .onyx-search__icon {
        --icon-color: var(--onyx-color-text-icons-neutral-soft);
      }
    }
  }
}
</style>
