<script
  lang="ts"
  setup
  generic="TValue extends ListboxValue = ListboxValue, TMultiple extends boolean = false"
>
import { createListbox, type ListboxValue } from "@sit-onyx/headless";
import { computed, ref, watch, watchEffect } from "vue";
import { useScrollEnd } from "../../composables/scrollEnd";
import { injectI18n } from "../../i18n";
import OnyxEmpty from "../OnyxEmpty/OnyxEmpty.vue";
import OnyxListboxOption from "../OnyxListboxOption/OnyxListboxOption.vue";
import type { OnyxListboxOptionProps } from "../OnyxListboxOption/types";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import type { ListboxOption, OnyxListboxProps } from "./types";

const props = withDefaults(defineProps<OnyxListboxProps<TValue, TMultiple>>(), {
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
  /**
   * Optional header content to display above the options.
   */
  header?(): unknown;
  /**
   * Optional footer content to display below the options (will replace `message` property).
   */
  footer?(): unknown;
}>();

const { t } = injectI18n();

/**
 * Currently (visually) active option.
 */
const activeOption = ref<TValue>();

/**
 * Sync the active option with the selected option on single select.
 */
watch(
  () => props.modelValue,
  (newValue) => {
    if (!props.multiple) {
      activeOption.value = newValue as typeof activeOption.value;
    }
  },
);

const {
  elements: { listbox, option: headlessOption, group: headlessGroup },
} = createListbox({
  label: computed(() => props.label),
  multiple: computed(() => !!props.multiple),
  selectedOption: computed(() => props.modelValue),
  activeOption,
  onSelect: (selectedOption) => {
    if (!props.multiple) {
      const newValue = selectedOption === props.modelValue ? undefined : selectedOption;
      emit("update:modelValue", newValue as typeof props.modelValue);
      return;
    }
    const arrayValues: TValue[] = Array.isArray(props.modelValue) ? props.modelValue : [];
    const newValues = arrayValues.includes(selectedOption)
      ? arrayValues.filter((i) => i !== selectedOption)
      : [...arrayValues, selectedOption];
    emit("update:modelValue", newValues as typeof props.modelValue);
  },
  onActivateFirst: () => (activeOption.value = props.options.at(0)?.id),
  onActivateLast: () => (activeOption.value = props.options.at(-1)?.id),
  onActivateNext: (currentValue) => {
    const currentIndex = props.options.findIndex((i) => i.id === currentValue);
    if (currentIndex < props.options.length - 1) {
      activeOption.value = props.options[currentIndex + 1].id;
    }
  },
  onActivatePrevious: (currentValue) => {
    const currentIndex = props.options.findIndex((i) => i.id === currentValue);
    if (currentIndex > 0) activeOption.value = props.options[currentIndex - 1].id;
  },
  onTypeAhead: (label) => {
    const firstMatch = props.options.find((i) => {
      return i.label.toLowerCase().trim().startsWith(label.toLowerCase());
    });
    if (!firstMatch) return;
    activeOption.value = firstMatch.id;
  },
});

const groupedOptions = computed(() => {
  return props.options.reduce<Record<string, ListboxOption<TValue>[]>>((acc, currOpt) => {
    const groupName = currOpt.group ?? "";
    acc[groupName] = acc[groupName] || [];
    acc[groupName].push(currOpt);
    return acc;
  }, {});
});

const { vScrollEnd, isScrollEnd } = useScrollEnd({
  enabled: computed(() => props.lazyLoading?.enabled ?? false),
  loading: computed(() => props.loading),
  offset: computed(() => props.lazyLoading?.scrollOffset),
});

watchEffect(() => {
  if (isScrollEnd.value) emit("lazyLoad");
});

const isEmpty = computed(() => props.options.length === 0);

const getOptionProps = computed(() => {
  return (option: ListboxOption<TValue>): OnyxListboxOptionProps & { onClick: () => void } => {
    const selected =
      option.id === props.modelValue ||
      (Array.isArray(props.modelValue) && props.modelValue.includes(option.id));

    const headless = headlessOption.value({
      value: option.id,
      label: option.label,
      disabled: option.disabled,
      selected,
    });

    return {
      id: headless.id,
      label: headless["aria-label"],
      active: option.id === activeOption.value,
      multiple: props.multiple,
      icon: option.icon,
      disabled: option.disabled,
      onClick: headless.onClick,
      selected,
    };
  };
});
</script>

<template>
  <div
    class="onyx-listbox"
    :class="{
      'onyx-listbox--with-header': !!slots.header,
      'onyx-listbox--with-footer': !!slots.footer,
    }"
    :aria-busy="props.loading"
  >
    <slot name="header"></slot>

    <div v-if="props.loading" class="onyx-listbox__slot onyx-listbox__slot--loading">
      <OnyxLoadingIndicator class="onyx-listbox__loading" />
    </div>

    <slot v-else-if="isEmpty" name="empty" :default-message="t('empty')">
      <OnyxEmpty>{{ t("empty") }}</OnyxEmpty>
    </slot>

    <div v-else v-scroll-end v-bind="listbox" class="onyx-listbox__wrapper">
      <ul
        v-for="(options, group) in groupedOptions"
        :key="group"
        class="onyx-listbox__group"
        v-bind="headlessGroup({ label: group })"
      >
        <li
          v-if="group != ''"
          role="presentation"
          class="onyx-listbox__group-name onyx-text--small"
        >
          {{ group }}
        </li>
        <!-- TODO: select-all option for "multiple" -->
        <OnyxListboxOption
          v-for="option in options"
          :key="option.id.toString()"
          v-bind="getOptionProps(option)"
        >
          {{ option.label }}
        </OnyxListboxOption>
      </ul>

      <li v-if="props.lazyLoading?.loading" class="onyx-listbox__slot">
        <OnyxLoadingIndicator class="onyx-listbox__loading" />
      </li>

      <li v-if="slots.optionsEnd" class="onyx-listbox__slot">
        <slot name="optionsEnd"></slot>
      </li>
    </div>

    <slot name="footer">
      <span v-if="props.message" class="onyx-listbox__message onyx-text--small">
        {{ props.message }}
      </span>
    </slot>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-listbox {
  @include layers.component() {
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

    &--with-header {
      padding-top: 0;
    }

    &--with-footer {
      padding-bottom: 0;
    }

    &__wrapper {
      max-height: calc(var(--max-options) * var(--option-height));
      overflow: auto;
      outline: none;
    }

    &__group {
      padding: 0;

      &:not(:last-of-type) {
        border-bottom: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
        margin-bottom: var(--onyx-spacing-2xs);
      }
    }

    &__group-name {
      display: block;
      padding: 0 var(--onyx-spacing-sm);
      color: var(--onyx-color-text-icons-neutral-medium);
      font-weight: 600;
    }

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

    &:has(&__wrapper:focus-visible) {
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

    .onyx-empty {
      max-width: 100%;
    }
  }
}
</style>
