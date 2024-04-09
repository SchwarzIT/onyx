<script lang="ts" setup generic="TValue extends SelectionOptionValue = SelectionOptionValue">
import { injectI18n } from "@/i18n";
import { createListbox } from "@sit-onyx/headless";
import plus from "@sit-onyx/icons/plus.svg?raw";
import { computed, ref, watch } from "vue";
import { useScrollEnd } from "../../composables/scrollEnd";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxEmpty from "../OnyxEmpty/OnyxEmpty.vue";
import OnyxListboxOption from "../OnyxListboxOption/OnyxListboxOption.vue";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import type { SelectionOptionValue } from "../OnyxRadioButton/types";
import type { OnyxListboxProps } from "./types";

const props = withDefaults(defineProps<OnyxListboxProps<TValue>>(), {
  loading: false,
});

const emit = defineEmits<{
  /**
   * Emitted when the current value changes.
   */
  "update:modelValue": [value: typeof props.modelValue];
  /**
   * Emitted if more data should be loaded (see `loadingMode` property).
   */
  loadMore: [];
}>();

defineSlots<{
  /**
   * Optional slot to customize the empty state when no options exist.
   * It is recommended to use the `<OnyxEmpty>` component here.
   *
   * If unset, a default translated message will be displayed for the current locale.
   */
  empty?(props: { defaultMessage: string }): unknown;
}>();

const { t } = injectI18n();

/**
 * Currently (visually) active option.
 */
const activeOption = ref<TValue>();

/**
 * Sync the active option with the selected option.
 */
watch(
  () => props.modelValue,
  (newValue) => {
    activeOption.value = newValue;
  },
);

const {
  elements: { listbox, option: headlessOption },
} = createListbox({
  label: computed(() => props.label),
  selectedOption: computed(() => props.modelValue),
  activeOption,
  onSelect: (id) => {
    if (props.modelValue === id) emit("update:modelValue", undefined);
    else emit("update:modelValue", id as TValue);
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

const loadingMode = computed(() => {
  if (typeof props.loadingMode === "object") return props.loadingMode.mode;
  return props.loadingMode;
});

const loadMoreButtonLabel = computed(() => {
  if (typeof props.loadingMode === "object" && props.loadingMode.mode === "button") {
    return props.loadingMode.label;
  }
  return t.value("loadMore");
});

const loadingScrollOffset = computed(() => {
  if (typeof props.loadingMode === "object" && props.loadingMode.mode === "lazy") {
    return props.loadingMode.scrollOffset;
  }
  return undefined;
});

const { vScrollEnd } = useScrollEnd({
  callback: () => emit("loadMore"),
  enabled: computed(() => loadingMode.value === "lazy"),
  loading: computed(() => props.loading),
  offset: loadingScrollOffset,
});
</script>

<template>
  <div class="onyx-listbox" :aria-busy="props.loading">
    <div
      v-if="props.loading && (!loadingMode || !options.length)"
      class="onyx-listbox__slot onyx-listbox__slot--height"
    >
      <OnyxLoadingIndicator class="onyx-listbox__loading" />
    </div>

    <slot v-else-if="!props.options.length" name="empty" :default-message="t('selections.empty')">
      <OnyxEmpty>{{ t("selections.empty") }}</OnyxEmpty>
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
        :active="option.id === activeOption"
      >
        {{ option.label }}
      </OnyxListboxOption>

      <li v-if="loadingMode === 'button' && props.options.length > 0" class="onyx-listbox__slot">
        <OnyxButton
          class="onyx-listbox__loading-button"
          :label="loadMoreButtonLabel"
          mode="plain"
          :icon="plus"
          :loading="props.loading"
          @click="emit('loadMore')"
        />
      </li>
    </ul>

    <div v-if="props.options.length" class="onyx-listbox__slot">
      <OnyxLoadingIndicator
        v-if="loadingMode === 'lazy' && props.loading"
        class="onyx-listbox__loading"
      />
    </div>

    <span v-if="props.message" class="onyx-listbox__message onyx-text--small">
      {{ props.message }}
    </span>
  </div>
</template>

<style lang="scss">
.onyx-listbox {
  :where(&) {
    --max-options: 8;
  }

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
    box-sizing: border-box;
    overflow: auto;
    outline: none;

    margin: 0;
    padding: 0;
    list-style: none;
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

    &--height {
      min-height: calc(5 * var(--option-height));
    }
  }

  &__loading {
    color: var(--onyx-color-text-icons-primary-intense);
  }

  &__loading-button {
    width: 100%;
  }
}
</style>
