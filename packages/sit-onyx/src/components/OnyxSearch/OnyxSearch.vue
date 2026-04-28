<script lang="ts" setup>
import { iconBookmark, iconFilter, iconSearch } from "@sit-onyx/icons";
import { computed, useTemplateRef, type ComponentInstance } from "vue";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import { useForwardProps } from "../../utils/props.js";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxInput from "../OnyxInput/OnyxInput.vue";
import OnyxKey from "../OnyxKey/OnyxKey.vue";
import OnyxSeparator from "../OnyxSeparator/OnyxSeparator.vue";
import OnyxShortcut from "../OnyxShortcut/OnyxShortcut.vue";
import OnyxVisuallyHidden from "../OnyxVisuallyHidden/OnyxVisuallyHidden.vue";
import type { OnyxSearchProps } from "./types.js";

const props = withDefaults(defineProps<OnyxSearchProps>(), {
  color: "blank",
  cornerRadius: "soft",
  disabled: FORM_INJECTED_SYMBOL,
  withShortcut: false,
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
const { t } = injectI18n();

const inputComponent = useTemplateRef<ComponentInstance<typeof OnyxInput>>("inputComponentRef");
const input = computed(() => inputComponent.value?.input);

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
        ref="inputComponentRef"
        v-bind="inputProps"
        v-model="modelValue"
        required
        :show-error="false"
        type="search"
        hide-label
      >
        <template #trailingIcons>
          <div v-if="!modelValue || modelValue === ''" class="onyx-search__placeholder">
            <div
              v-if="props.withShortcut"
              class="onyx-truncation-ellipsis onyx-search__placeholder-text"
            >
              {{ t("search.leadingShortcutPlaceholder") }}
              <OnyxKey name="/" />
              <OnyxVisuallyHidden>
                <OnyxShortcut
                  :sequence="[{ all: ['Shift', '7'] }]"
                  highlight="auto"
                  @complete="
                    () => {
                      input?.focus();
                    }
                  "
                />
              </OnyxVisuallyHidden>
              {{ t("search.trailingShortcutPlaceholder") }}
            </div>

            <p v-else class="onyx-truncation-ellipsis onyx-search__placeholder-text">
              {{ props.label }}
            </p>
          </div>
        </template>
        <template #leadingIcons>
          <OnyxIcon :icon="iconSearch" />
        </template>

        <template v-if="!disabled && typeof showFilter === 'boolean'" #trailing>
          <button
            v-if="typeof showPersonalFilter === 'boolean' && typeof showFilter === 'boolean'"
            class="onyx-search__button"
            type="button"
            :disabled="disabled || props.loading"
            :aria-label="t('search.personalFilterLabel')"
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
            :aria-label="t('search.filterLabel')"
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
@use "../OnyxFormElementV2/OnyxFormElementV2.scss";

.onyx-search {
  @include layers.component() {
    cursor: pointer;
    .onyx-form-element-v2__input-container {
      position: relative;
    }

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
    .onyx-input .onyx-form-element-v2__slot.onyx-form-element-v2__slot--trailing,
    .onyx-form-element-v2__icons.onyx-form-element-v2__icons--trailing {
      padding: 0;
      padding-inline: 0;
    }

    &__placeholder {
      position: absolute;
      left: calc(var(--onyx-density-sm) + 24px);
      padding: var(--onyx-form-element-v2-padding-block)
        var(--onyx-form-element-v2-padding-inline-icons);
      pointer-events: none;
      color: var(--onyx-color-text-icons-neutral-soft);
      overflow: hidden;
      // 100% - icon-size - border
      width: calc(100% - 24px - var(--onyx-form-element-v2-padding-inline));

      &-text {
        display: flex;
        gap: var(--onyx-spacing-2xs);
      }

      .onyx-key {
        min-width: 20px;
        height: 20px;
        color: var(--onyx-color-text-icons-neutral-soft);
        font-size: var(--onyx-font-size-sm);
      }
    }

    @include OnyxFormElementV2.input-focus-or-popover-open() {
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

    .onyx-icon {
      --icon-color: var(--onyx-color-text-icons-neutral-medium);
    }
    &:focus-within,
    &:hover {
      .onyx-icon {
        --icon-color: var(--onyx-color-text-icons-primary-intense);
      }
    }

    &:has(.onyx-input__native:disabled) {
      cursor: default;

      .onyx-icon {
        --icon-color: var(--onyx-color-text-icons-neutral-soft);
      }
    }
  }
}
</style>
