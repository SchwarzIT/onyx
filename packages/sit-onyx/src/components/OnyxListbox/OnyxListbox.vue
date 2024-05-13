<script lang="ts" setup generic="TValue extends string = string, TMultiple extends boolean = false">
import { useDensity } from "../../composables/density";
import { createId, createListbox } from "@sit-onyx/headless";
import { useCheckAll } from "../../composables/checkAll";
import { computed, ref, watch, watchEffect } from "vue";
import { useScrollEnd } from "../../composables/scrollEnd";
import { injectI18n, type OnyxTranslations } from "../../i18n";
import type { FlattenedKeysOf } from "../../types";
import OnyxEmpty from "../OnyxEmpty/OnyxEmpty.vue";
import OnyxListboxOption from "../OnyxListboxOption/OnyxListboxOption.vue";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import OnyxMiniSearch from "./OnyxMiniSearch.vue";
import type { OnyxListboxProps } from "./types";
import { groupByKey } from "../../utils/objects";

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

const { densityClass } = useDensity(props);

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

/** unique ID to identify the `select all` checkbox */
const CHECK_ALL_ID = createId("ONYX_CHECK_ALL") as TValue;

/**
 * IDs of all options that can be navigated with the keyboard.
 * Includes "select all" up front if it is used.
 */
const allKeyboardOptionIds = computed(() => {
  return (props.withCheckAll ? [CHECK_ALL_ID] : []).concat(enabledOptionValues.value);
});

const {
  elements: { listbox, option: headlessOption, group: headlessGroup },
} = createListbox({
  label: computed(() => props.label),
  multiple: computed(() => !!props.multiple),
  selectedOption: computed(() => props.modelValue),
  activeOption,
  onSelect: (selectedOption) => {
    if (selectedOption === CHECK_ALL_ID) {
      checkAll.value?.handleChange(!checkAll.value.state.value.modelValue);
      return;
    }

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
  onActivateFirst: () => (activeOption.value = allKeyboardOptionIds.value.at(0)),
  onActivateLast: () => (activeOption.value = allKeyboardOptionIds.value.at(-1)),
  onActivateNext: (currentValue) => {
    const currentIndex = allKeyboardOptionIds.value.findIndex((i) => i === currentValue);
    if (currentIndex < allKeyboardOptionIds.value.length - 1) {
      activeOption.value = allKeyboardOptionIds.value[currentIndex + 1];
    }
  },
  onActivatePrevious: (currentValue) => {
    const currentIndex = allKeyboardOptionIds.value.findIndex((i) => i === currentValue);
    if (currentIndex > 0) activeOption.value = allKeyboardOptionIds.value[currentIndex - 1];
  },
  onTypeAhead: (label) => {
    const firstMatch = props.options.find((i) => {
      return i.label.toLowerCase().trim().startsWith(label.toLowerCase());
    });
    if (!firstMatch) return;
    activeOption.value = firstMatch.value;
  },
});

const filteredOptions = computed(() =>
  props.options.filter(({ label }) =>
    label.trim().toLowerCase().includes(searchTerm.value.trim().toLowerCase()),
  ),
);

const groupedOptions = computed(() => groupByKey(filteredOptions.value, "group"));

const { vScrollEnd, isScrollEnd } = useScrollEnd({
  enabled: computed(() => props.lazyLoading?.enabled ?? false),
  loading: computed(() => props.loading),
  offset: computed(() => props.lazyLoading?.scrollOffset),
});

const isEmptyMessage = computed<FlattenedKeysOf<OnyxTranslations> | undefined>(
  () =>
    (props.options.length === 0 && "empty") ||
    (filteredOptions.value.length === 0 && "no-match") ||
    undefined,
);

const enabledOptionValues = computed(() =>
  filteredOptions.value.filter((i) => !i.disabled).map(({ value }) => value),
);

/**
 * State and click callback for the `select all` checkbox.
 * Only available when multiple and withCheckAll are set.
 */
const checkAll = computed(() => {
  if (!props.multiple || !props.withCheckAll) return undefined;
  return useCheckAll(
    enabledOptionValues,
    computed(() => (props.modelValue as TValue[]) || []),
    (newValue: TValue[]) => emit("update:modelValue", newValue as typeof props.modelValue),
  );
});

const checkAllLabel = computed<string>(() => {
  const defaultText = t.value("selections.selectAll");
  if (typeof props.withCheckAll === "boolean") return defaultText;
  return props.withCheckAll?.label ?? defaultText;
});

watchEffect(() => {
  if (isScrollEnd.value) emit("lazyLoad");
});

const searchTerm = ref("");
</script>

<template>
  <div :class="['onyx-listbox', densityClass]" :aria-busy="props.loading">
    <div v-if="props.loading" class="onyx-listbox__slot onyx-listbox__slot--loading">
      <OnyxLoadingIndicator class="onyx-listbox__loading" />
    </div>

    <div v-else v-scroll-end v-bind="listbox" class="onyx-listbox__wrapper">
      <OnyxMiniSearch v-if="props.withSearch" v-model="searchTerm" class="onyx-listbox__search" />

      <slot v-if="isEmptyMessage" name="empty" :default-message="t(isEmptyMessage)">
        <OnyxEmpty>{{ t(isEmptyMessage) }}</OnyxEmpty>
      </slot>

      <template v-else>
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

          <!-- select-all option for "multiple" -->
          <template v-if="props.multiple && props.withCheckAll">
            <OnyxListboxOption
              v-bind="
                headlessOption({
                  value: CHECK_ALL_ID as TValue,
                  label: checkAllLabel,
                  selected: checkAll?.state.value.modelValue,
                })
              "
              multiple
              :active="CHECK_ALL_ID === activeOption"
              :indeterminate="checkAll?.state.value.indeterminate"
              :density="props.density"
              class="onyx-listbox__check-all"
            >
              {{ checkAllLabel }}
            </OnyxListboxOption>
          </template>

          <OnyxListboxOption
            v-for="option in options"
            :key="option.value.toString()"
            v-bind="
              headlessOption({
                value: option.value,
                label: option.label,
                disabled: option.disabled,
                selected:
                  option.value === props.modelValue ||
                  (Array.isArray(props.modelValue) && props.modelValue.includes(option.value)),
              })
            "
            :multiple="props.multiple"
            :active="option.value === activeOption"
            :icon="option.icon"
            :color="option.color"
            :density="props.density"
          >
            {{ option.label }}
          </OnyxListboxOption>
        </ul>

        <div v-if="props.lazyLoading?.loading" class="onyx-listbox__slot">
          <OnyxLoadingIndicator class="onyx-listbox__loading" />
        </div>

        <div v-if="slots.optionsEnd" class="onyx-listbox__slot">
          <slot name="optionsEnd"></slot>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";
@use "../../styles/mixins/list";

.onyx-listbox {
  @include layers.component() {
    --max-options: 8;
    --option-height: calc(1.5rem + 2 * var(--onyx-spacing-2xs));

    @include list.styles();

    $wrapper-padding: var(--onyx-spacing-2xs);

    &__search {
      position: sticky;
      top: 0;
    }

    &__check-all,
    &__search {
      border-bottom: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
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
