<script lang="ts" setup>
import { createComboBox } from "@sit-onyx/headless";
import { computed, ref, watchEffect } from "vue";
import { useScrollEnd } from "../../composables/scrollEnd";
import { injectI18n } from "../../i18n";
import OnyxEmpty from "../OnyxEmpty/OnyxEmpty.vue";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import type { ComboboxOption, OnyxComboboxProps } from "./types";
import OnyxSelect from "../OnyxCombobox/OnyxSelect/OnyxSelect.vue";
import OnyxListboxOption from "./OnyxListboxOption/OnyxListboxOption.vue";

const props = withDefaults(defineProps<OnyxComboboxProps>(), {
  loading: false,
});

const emit = defineEmits<{
  /**
   * Emitted when the current value changes.
   */
  "update:modelValue": [value: typeof props.modelValue];
  /**
   * Emitted if lazy loading is triggered / the users scrolls to the end of the options.
   * See property `lazyLoading` for enabling the lazy loading.
   */
  lazyLoad: [];
}>();

const slots = defineSlots<{
  /**
   * Optional slot to customize the empty state when no options exist.
   * It is recommended to use the `<OnyxEmpty>` component here.
   *
   * If unset, a default translated message will be displayed for the current locale.
   */
  empty?(props: { defaultMessage: string }): unknown;
  /**
   * Optional slot that is displayed below all options that can be used
   * to e.g. show a button to load more options instead of lazy loading on scroll.
   */
  optionsEnd?(): unknown;
}>();

const { t } = injectI18n();

/**
 * Currently (visually) active option.
 */
const activeOption = ref<ComboboxOption>();

const isExpanded = ref(false);
const selectedIndex = computed<number | undefined>(() => {
  const index = props.options.findIndex((o) => o.id === props.modelValue);
  return index !== -1 ? index : undefined;
});

const onActivateFirst = () => (activeOption.value = props.options.at(0));
const onActivateLast = () => (activeOption.value = props.options.at(-1));
const onActivateNext = () => {
  if (selectedIndex.value === undefined) {
    return onActivateFirst();
  }
  const nextIndex = (selectedIndex.value + 1) % props.options.length;

  activeOption.value = props.options.at(nextIndex);
};
const onActivatePrevious = () =>
  (activeOption.value = props.options.at((selectedIndex.value ?? 0) - 1));
const onTypeAhead = (input: string) => {
  const firstMatch = props.options.find((i) => {
    return i.label.toLowerCase().trim().startsWith(input.toLowerCase());
  });
  if (!firstMatch) return;
  activeOption.value = firstMatch;
};
const onToggle = () => (isExpanded.value = !isExpanded.value);
const onSelect = (newValue: string) => emit("update:modelValue", newValue);

const comboBox = createComboBox({
  autocomplete: "none",
  label: props.label,
  listLabel: props.listLabel,
  activeOption: computed(() => activeOption.value?.id),
  isExpanded,
  onToggle,
  onActivateFirst,
  onActivateLast,
  onActivateNext,
  onActivatePrevious,
  onTypeAhead,
  onSelect,
});

const {
  elements: { input, listbox, option: headlessOption },
} = comboBox;

const { vScrollEnd, isScrollEnd } = useScrollEnd({
  enabled: computed(() => props.lazyLoading?.enabled ?? false),
  loading: computed(() => props.loading),
  offset: computed(() => props.lazyLoading?.scrollOffset),
});

watchEffect(() => {
  if (isScrollEnd.value) emit("lazyLoad");
});

const isEmpty = computed(() => props.options.length === 0);
</script>

<template>
  <div class="onyx-combobox">
    <OnyxSelect :label="props.label" v-bind="input" @keydown.arrow-down="isExpanded = true" />
    <div class="onyx-listbox" :aria-busy="props.loading">
      <div v-if="props.loading" class="onyx-listbox__slot onyx-listbox__slot--loading">
        <OnyxLoadingIndicator class="onyx-listbox__loading" />
      </div>

      <slot v-else-if="isEmpty" name="empty" :default-message="t('empty')">
        <OnyxEmpty>{{ t("empty") }}</OnyxEmpty>
      </slot>

      <ul v-else v-scroll-end v-bind="listbox" class="onyx-listbox__options">
        <OnyxListboxOption
          v-for="option in props.options"
          :key="option.id.toString()"
          v-bind="
            headlessOption({
              value: option.id,
              label: option.label,
              disabled: option.disabled,
              selected: option.id === props.modelValue,
            })
          "
          :active="option.id === activeOption?.id"
        >
          {{ option.label }}
        </OnyxListboxOption>

        <li v-if="props.lazyLoading?.loading" class="onyx-listbox__slot">
          <OnyxLoadingIndicator class="onyx-listbox__loading" />
        </li>

        <li v-if="slots.optionsEnd" class="onyx-listbox__slot">
          <slot name="optionsEnd"></slot>
        </li>
      </ul>

      <span v-if="props.message" class="onyx-listbox__message onyx-text--small">
        {{ props.message }}
      </span>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-combobox {
  @include layers.component() {
    position: relative;

    .onyx-listbox {
      position: absolute;
      width: 100%;

      --max-options: 8;
      --option-height: calc(1.5rem + 2 * var(--onyx-spacing-2xs));
      $wrapper-padding: var(--onyx-spacing-2xs);

      border-radius: var(--onyx-radius-md);
      background-color: var(--onyx-color-base-background-blank);
      padding: $wrapper-padding 0;
      box-shadow: var(--onyx-shadow-medium-bottom);
      box-sizing: border-box;
      width: max-content;
      min-width: var(--onyx-spacing-4xl);
      max-width: 20rem;
      font-family: var(--onyx-font-family);

      &__message {
        color: var(--onyx-color-text-icons-neutral-soft);
        display: inline-block;
        width: 100%;
        box-sizing: border-box;
        text-align: right;
        padding: $wrapper-padding var(--onyx-spacing-sm) 0;
      }

      .onyx-listbox-option {
        height: var(--option-height);
      }

      &__options {
        max-height: calc(var(--max-options) * var(--option-height));
        overflow: auto;
        outline: none;

        padding: 0;
      }

      &:has(&__options:focus-visible) {
        outline: 0.25rem solid var(--onyx-color-base-primary-200);
      }

      &__slot {
        padding: 0 $wrapper-padding;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        &--loading {
          min-height: calc(5 * var(--option-height));
        }
      }

      &__loading {
        color: var(--onyx-color-text-icons-primary-intense);
      }
    }
  }
}
</style>
