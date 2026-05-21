<script lang="ts" setup>
import { iconFilter, iconSearch } from "@sit-onyx/icons";
import { computed, useTemplateRef } from "vue";
import { _unstableUseShortcut } from "../../composables/useShortcut.js";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import { useForwardProps } from "../../utils/props.js";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxFormElementAction from "../OnyxFormElementAction/OnyxFormElementAction.vue";
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

const inputComponent = useTemplateRef("inputComponentRef");
const input = computed(() => inputComponent.value?.input);

const slots = defineSlots<{
  /**
   * Filter content. Visibility can be toggled using `v-model:showFilters`.
   */
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
  <div :class="['onyx-component', 'onyx-search', `onyx-search--${props.filterPosition}`]">
    <search
      :class="[
        'onyx-search__input',
        `onyx-search__input--${props.color}`,
        `onyx-search__input--${props.cornerRadius}`,
      ]"
    >
      <form @submit.prevent>
        <OnyxInput
          ref="inputComponentRef"
          v-bind="inputProps"
          v-model="modelValue"
          :label="t('search.label')"
          :placeholder="undefined"
          :required="props.required"
          :show-error="false"
          type="search"
          hide-label
          disable-slot-padding
        >
          <template #leadingIcons>
            <OnyxFormElementAction
              :icon="iconSearch"
              :label="t('search.label')"
              highlighted="auto"
              @click="input?.focus()"
            />
          </template>

          <template #trailingIcons>
            <div v-if="!modelValue" class="onyx-search__placeholder">
              <div v-if="props.withShortcut" class="onyx-search__placeholder-text">
                <span> {{ t("search.leadingShortcutPlaceholder") }}</span>
                <OnyxKey name="/" />
                <span class="onyx-truncation-ellipsis">
                  {{ t("search.trailingShortcutPlaceholder") }}</span
                >
              </div>

              <p v-else class="onyx-truncation-ellipsis onyx-search__placeholder-text">
                {{ props.placeholder }}
              </p>
            </div>
          </template>

          <template v-if="!disabled && (!!slots.default || showFilters !== undefined)" #trailing>
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
      :label="t('search.selectFilter')"
      class="onyx-search__modal"
    >
      <slot></slot>
    </OnyxModal>

    <template v-else-if="showFilters">
      <slot v-if="props.filterPosition === 'inline'"></slot>

      <div v-else class="onyx-search__filters">
        <slot></slot>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";
@use "../OnyxFormElementV2/OnyxFormElementV2.scss";

.onyx-search {
  @include layers.component() {
    --onyx-search-input-width: 100%;
    --onyx-search-modal-width: 24rem;
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-sm);

    &--inline {
      --onyx-search-input-width: 20rem;
      flex-direction: row;
      flex-wrap: wrap;
    }

    &__input {
      width: var(--onyx-search-input-width);
      max-width: 100%;

      .onyx-form-element-v2__input-container {
        // needed to correctly position the placeholder shortcut
        position: relative;
      }

      &--tinted .onyx-input {
        --onyx-form-element-v2-background: var(--onyx-color-base-background-tinted);
      }

      &--strong .onyx-input {
        --onyx-form-element-v2-border-radius: var(--onyx-radius-md);
      }

      @include OnyxFormElementV2.input-focus-or-popover-open() {
        .onyx-search__placeholder {
          display: none;
        }
      }
    }

    &__placeholder {
      position: absolute;
      left: calc(var(--onyx-form-element-v2-padding-inline) + 1.5rem);
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

    &__filters {
      display: flex;
      gap: var(--onyx-density-sm);
      flex-direction: row;
      flex-wrap: wrap;
    }

    &__modal {
      width: var(--onyx-search-modal-width);
      container-type: inline-size;

      .onyx-modal__body {
        padding: var(--onyx-modal-padding-inline);
        display: flex;
        flex-direction: column;
        gap: var(--onyx-density-sm);
      }
    }
  }
}
</style>
