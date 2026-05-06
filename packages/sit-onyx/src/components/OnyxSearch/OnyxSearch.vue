<script lang="ts" setup>
import { iconFilter, iconSearch } from "@sit-onyx/icons";
import { computed, useTemplateRef, type ComponentInstance } from "vue";
import { _unstableUseShortcut } from "../../composables/useShortcut.js";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import { useForwardProps } from "../../utils/props.js";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxFormElementAction from "../OnyxFormElementAction/OnyxFormElementAction.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxInput from "../OnyxInput/OnyxInput.vue";
import OnyxKey from "../OnyxKey/OnyxKey.vue";
import OnyxModal from "../OnyxModal/OnyxModal.vue";
import type { OnyxSearchProps } from "./types.js";

const props = withDefaults(defineProps<OnyxSearchProps>(), {
  color: "blank",
  cornerRadius: "soft",
  disabled: FORM_INJECTED_SYMBOL,
  withShortcut: false,
  showFilters: undefined,
  modelValue: undefined,
  filterPosition: "bottom",
});

const emit = defineEmits<{
  /**
   * Emitted when the input changes
   */
  "update:modelValue": [value: string];
  /**
   * Emitted when the filter button is click
   */
  "update:showFilters": [value: boolean];
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
const showFilters = useVModel({
  key: "showFilters",
  props,
  emit,
  default: undefined,
});

const inputProps = useForwardProps(props, OnyxInput);
const { disabled } = useFormContext(props);
const { t } = injectI18n();

const inputComponent = useTemplateRef<ComponentInstance<typeof OnyxInput>>("inputComponentRef");
const input = computed(() => inputComponent.value?.input);

const slots = defineSlots<{
  default(): unknown;
}>();

defineExpose({ input });

_unstableUseShortcut({
  sequence: [{ all: ["Shift", "7"] }],
  disabled: computed(() => disabled.value || !props.withShortcut),
  onComplete: () => input.value?.focus(),
});
</script>

<template>
  <div
    :class="[
      'onyx-component',
      'onyx-search__wrapper',
      `onyx-search__wrapper--${props.filterPosition}`,
    ]"
  >
    <search
      :class="['onyx-search', `onyx-search--${props.color}`, `onyx-search--${props.cornerRadius}`]"
    >
      <form @submit.prevent>
        <OnyxInput
          ref="inputComponentRef"
          v-bind="inputProps"
          v-model="modelValue"
          :label="t('search.label')"
          :placeholder="undefined"
          required
          :show-error="false"
          type="search"
          hide-label
          disable-slot-padding
        >
          <template #trailingIcons>
            <div v-if="!modelValue" class="onyx-search__placeholder">
              <div
                v-if="props.withShortcut"
                class="onyx-truncation-ellipsis onyx-search__placeholder-text"
              >
                {{ t("search.leadingShortcutPlaceholder") }}
                <OnyxKey name="/" />
                {{ t("search.trailingShortcutPlaceholder") }}
              </div>

              <p v-else class="onyx-truncation-ellipsis onyx-search__placeholder-text">
                {{ props.placeholder }}
              </p>
            </div>
          </template>
          <template #leadingIcons>
            <OnyxIcon :icon="iconSearch" />
          </template>

          <template v-if="!disabled && (!!slots.filters || showFilters !== undefined)" #trailing>
            <OnyxFormElementAction
              v-model:pressed="showFilters"
              size="lg"
              type="toggle"
              :icon="iconFilter"
              :label="t('search.filterLabel')"
            />
          </template>
        </OnyxInput>
      </form>
    </search>
    <OnyxModal
      v-if="props.filterPosition === 'modal'"
      v-model:open="showFilters"
      label="Select Filter"
      class="onyx-search__filters"
    >
      <slot></slot>
    </OnyxModal>

    <template v-else-if="props.filterPosition === 'inline' && showFilters">
      <slot></slot>
    </template>

    <div v-else-if="showFilters" class="onyx-search__filters">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";
@use "../../styles/mixins/input.scss";
@use "../OnyxFormElementV2/OnyxFormElementV2.scss";

.onyx-search {
  @include layers.component() {
    cursor: pointer;
    color: var(--onyx-form-element-action-color);
    .onyx-form-element-v2__input-container {
      position: relative;
    }

    &--tinted .onyx-input {
      --onyx-form-element-v2-background: var(--onyx-color-base-background-tinted);
    }

    &--strong .onyx-input {
      --onyx-form-element-v2-border-radius: var(--onyx-radius-md);
    }

    .onyx-separator {
      height: 100%;
    }

    &__placeholder {
      position: absolute;
      left: calc(var(--onyx-form-element-v2-padding-inline) + 24px);
      padding: var(--onyx-form-element-v2-padding-block)
        var(--onyx-form-element-v2-padding-inline-icons);
      pointer-events: none;
      color: var(--onyx-color-text-icons-neutral-soft);
      overflow: hidden;
      // 100% - icon-size - border
      width: calc(100% - 1.5rem - var(--onyx-form-element-v2-padding-inline));

      &-text {
        display: flex;
        gap: var(--onyx-spacing-2xs);
      }

      .onyx-key {
        min-width: 1.25rem;
        height: 1.25rem;
        color: var(--onyx-color-text-icons-neutral-soft);
        font-size: var(--onyx-font-size-sm);
      }
    }

    @include OnyxFormElementV2.input-focus-or-popover-open() {
      .onyx-search__placeholder {
        display: none;
      }
    }

    .onyx-form-element-v2__input-container {
      &:focus-within,
      &:hover {
        .onyx-form-element-v2__icons--leading .onyx-icon {
          --icon-color: var(--onyx-color-text-icons-primary-intense);
        }
      }
    }

    &:has(.onyx-input__native:disabled) {
      cursor: default;

      .onyx-icon {
        --icon-color: var(--onyx-color-text-icons-neutral-soft);
      }
    }
    &__wrapper {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      gap: var(--onyx-density-sm);
      &--inline {
        flex-direction: row;
        .onyx-search {
          width: 20rem;
          min-width: fit-content;
        }
      }
      &--modal {
        .onyx-modal__body {
          padding: var(--onyx-density-sm);
          display: flex;
          flex-direction: column;
          gap: var(--onyx-density-sm);
        }
      }
    }
    &__filters {
      display: flex;
      gap: var(--onyx-density-sm);
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
}
</style>
