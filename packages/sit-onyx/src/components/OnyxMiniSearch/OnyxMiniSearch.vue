<script setup lang="ts">
import search from "@sit-onyx/icons/search.svg?raw";
import xSmall from "@sit-onyx/icons/x-small.svg?raw";
import { computed, useTemplateRef } from "vue";
import { useDensity } from "../../composables/density";
import { useAutofocus } from "../../composables/useAutoFocus";
import { useVModel, type Nullable } from "../../composables/useVModel";
import { injectI18n } from "../../i18n";
import { useRootAttrs } from "../../utils/attrs";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxMiniSearchProps } from "./types";

defineOptions({ inheritAttrs: false });

const props = defineProps<OnyxMiniSearchProps>();

const emit = defineEmits<{
  /**
   * Emitted when the clear button is clicked.
   */
  clear: [];
  /**
   * Updates the current value
   */
  "update:modelValue": [value?: Nullable<string>];
}>();

/**
 * Current input/search value.
 */
const modelValue = useVModel({
  props,
  emit,
  key: "modelValue",
  initialValue: "",
});

const { rootAttrs, restAttrs } = useRootAttrs();
const { densityClass } = useDensity(props);
const { t } = injectI18n();
const input = useTemplateRef("inputRef");

const placeholder = computed(() => t.value("select.searchPlaceholder"));
useAutofocus(input, props);

defineExpose({
  /**
   * Focuses the input.
   */
  focus: () => input.value?.focus(),
});
</script>

<template>
  <div
    :class="['onyx-component', 'onyx-mini-search', densityClass]"
    v-bind="rootAttrs"
    :style="{ '--onyx-placeholder-character-count': placeholder.length }"
  >
    <input
      ref="inputRef"
      v-model="modelValue"
      :autofocus="props.autofocus"
      class="onyx-mini-search__input onyx-text"
      :placeholder="placeholder"
      type="text"
      size="1"
      v-bind="restAttrs"
      :aria-label="props.label"
    />

    <!-- We use `@mousedown.prevent` here to not lose the input focus when the button is clicked  -->
    <!-- We use `@click` here instead of `@mousedown` for the emit, as clear can change the width of the element.
         When the actual width changes, this can cause the actual click to be triggered on an outside element. -->
    <button
      type="button"
      class="onyx-mini-search__clear"
      :aria-label="t('select.clearSearch')"
      tabindex="-1"
      @mousedown.prevent
      @click="emit('clear')"
    >
      <OnyxIcon :icon="xSmall" />
    </button>

    <OnyxIcon class="onyx-mini-search__icon" :icon="search" />
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-mini-search {
  @include layers.component() {
    --onyx-mini-search-icon-size: 1.5rem;
    --onyx-mini-search-padding-inline: var(--onyx-density-sm);

    display: flex;
    gap: var(--onyx-mini-search-padding-inline);
    padding: var(--onyx-density-xs) var(--onyx-mini-search-padding-inline);
    background-color: var(--onyx-color-base-background-blank);
    color: var(--onyx-color-text-icons-neutral-intense);

    &__input,
    &__clear {
      all: initial;
    }

    &__input {
      font-family: var(--onyx-font-family);
      font-style: normal;
      flex-grow: 1;
      min-width: calc(var(--onyx-placeholder-character-count) * 1ch);
      color: var(--onyx-color-text-icons-neutral-intense);

      &::placeholder {
        color: var(--onyx-color-text-icons-neutral-soft);
      }
    }

    &__clear {
      color: var(--onyx-color-text-icons-neutral-medium);
      cursor: pointer;
      display: none;

      .onyx-icon {
        --icon-size: var(--onyx-mini-search-icon-size);
      }
    }

    &__icon {
      display: grid;
      align-self: center;
      color: var(--onyx-color-text-icons-neutral-soft);
      --icon-size: var(--onyx-mini-search-icon-size);
    }

    // Show clear button only when input is not empty
    &:has(&__input:not(:placeholder-shown)) {
      .onyx-mini-search {
        &__clear {
          display: grid;
          place-items: center;
        }

        &__icon {
          display: none;
        }
      }
    }
  }
}
</style>
