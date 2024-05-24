<script setup lang="ts">
import { computed, ref } from "vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import xSmall from "@sit-onyx/icons/x-small.svg?raw";
import { injectI18n } from "../../i18n";
import { useRootAttrs } from "../../utils/attrs";

export type MiniSearchProps = { modelValue?: string; label: string };

defineOptions({ inheritAttrs: false });

const { rootAttrs, restAttrs } = useRootAttrs();

const props = defineProps<MiniSearchProps>();

const emit = defineEmits<{
  "update:modelValue": [input: string];
  clear: [];
}>();

const { t } = injectI18n();

/**
 * Current value (with getter and setter) that can be used as "v-model" for the native input.
 */
const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value ?? ""),
});

const input = ref<HTMLInputElement>();

defineExpose({ focus: () => input.value?.focus() });
</script>
<template>
  <div class="onyx-mini-search" v-bind="rootAttrs">
    <input
      ref="input"
      v-model="value"
      class="onyx-mini-search__input"
      placeholder="Search"
      type="text"
      :aria-label="props.label"
      v-bind="restAttrs"
    />
    <!-- We use `@mousedown.prevent` here to not lose the input focus when the button is clicked  -->
    <button
      class="onyx-mini-search__clear"
      :aria-label="t('listbox.clearSearch')"
      tabindex="-1"
      @mousedown.prevent="emit('clear')"
    >
      <OnyxIcon :icon="xSmall" />
    </button>
  </div>
</template>
<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-mini-search {
  @include layers.component() {
    display: flex;
    padding: var(--onyx-spacing-2xs) var(--onyx-spacing-sm);
    background-color: var(--onyx-color-base-background-blank);

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
      color: inherit;

      &::placeholder {
        color: var(--onyx-color-text-icons-neutral-soft);
      }
    }

    &__clear {
      color: var(--onyx-color-text-icons-neutral-medium);
      display: grid;
      place-items: center;
      cursor: pointer;
      visibility: hidden;
    }

    // Show clear button only when input is not empty
    &__input:not(:placeholder-shown) + &__clear {
      visibility: visible;
    }
  }
}
</style>
