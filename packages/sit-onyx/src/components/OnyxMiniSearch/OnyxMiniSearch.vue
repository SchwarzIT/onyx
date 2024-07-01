<script setup lang="ts">
import search from "@sit-onyx/icons/search.svg?raw";
import xSmall from "@sit-onyx/icons/x-small.svg?raw";
import { computed, ref } from "vue";
import { useDensity } from "../../composables/density";
import { injectI18n } from "../../i18n";
import { useRootAttrs } from "../../utils/attrs";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxMiniSearchProps } from "./types";

defineOptions({ inheritAttrs: false });

const props = defineProps<OnyxMiniSearchProps>();

const emit = defineEmits<{
  /**
   * Emitted when the current search value changes.
   */
  "update:modelValue": [input: string];
  /**
   * Emitted when the clear button is clicked.
   */
  clear: [];
}>();

const { rootAttrs, restAttrs } = useRootAttrs();
const { densityClass } = useDensity(props);
const { t } = injectI18n();
const input = ref<HTMLInputElement>();

/**
 * Current value (with getter and setter) that can be used as "v-model" for the native input.
 */
const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value ?? ""),
});

defineExpose({
  /**
   * Focuses the input.
   */
  focus: () => input.value?.focus(),
});
</script>

<template>
  <div :class="['onyx-mini-search', densityClass]" v-bind="rootAttrs">
    <input
      ref="input"
      v-model="value"
      class="onyx-mini-search__input"
      placeholder="Search"
      type="text"
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
@use "../../styles/mixins/density.scss";

.onyx-mini-search {
  @include density.compact {
    --onyx-mini-search-icon-size: 1rem;
  }
  @include density.default {
    --onyx-mini-search-icon-size: 1.5rem;
  }
  @include density.cozy {
    --onyx-mini-search-icon-size: 1.5rem;
  }

  @include layers.component() {
    display: flex;
    padding: var(--onyx-spacing-2xs) var(--onyx-spacing-sm);
    background-color: var(--onyx-color-base-background-blank);
    color: var(--onyx-color-text-icons-neutral-intense);

    &__input,
    &__clear {
      all: initial;
    }

    &__input {
      font-family: var(--onyx-font-family);
      font-size: var(--onyx-spacing-md);
      font-style: normal;
      font-weight: 400;
      line-height: var(--onyx-spacing-lg);
      flex-grow: 1;
      min-width: 0;
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
