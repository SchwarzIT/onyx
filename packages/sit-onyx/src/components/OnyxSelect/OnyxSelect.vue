<script lang="ts" setup generic="TValue extends SelectOptionValue = SelectOptionValue">
import { createComboBox, createId, type ComboboxAutoComplete } from "@sit-onyx/headless";
import { computed, nextTick, ref, watch, watchEffect } from "vue";
import type { ComponentExposed } from "vue-component-type-helpers";
import { useCheckAll } from "../../composables/checkAll";
import { useDensity } from "../../composables/density";
import { useScrollEnd } from "../../composables/scrollEnd";
import { injectI18n } from "../../i18n";
import type { SelectOptionValue } from "../../types";
import { groupByKey } from "../../utils/objects";
import OnyxEmpty from "../OnyxEmpty/OnyxEmpty.vue";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import OnyxSelectInput from "../OnyxSelectInput/OnyxSelectInput.vue";
import type { OnyxSelectInputProps, SelectInputModelValue } from "../OnyxSelectInput/types";
import OnyxSelectOption from "../OnyxSelectOption/OnyxSelectOption.vue";
import OnyxMiniSearch from "./OnyxMiniSearch.vue";
import type { OnyxSelectProps, SelectOption } from "./types";

const props = withDefaults(defineProps<OnyxSelectProps<TValue>>(), {
  loading: false,
});

const emit = defineEmits<{
  /**
   * Emitted when the current value changes.
   */
  "update:modelValue": [value: typeof props.modelValue];
  /**
   * Emitted when the current search input value changes.
   */
  "update:searchTerm": [searchTerm: string];
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

const isExpanded = ref(false);
const selectRef = ref<HTMLElement>();

/**
 * Currently (visually) active value.
 */
const activeValue = ref<TValue>();

/**
 * Current value but always as array (even if not multiselect) so it is easier
 * to work with it in a unified way.
 */
const arrayValue = computed(() => {
  if (!props.modelValue) return [];
  return props.multiple && Array.isArray(props.modelValue)
    ? props.modelValue
    : ([props.modelValue] as SelectOption<TValue>[]);
});

const miniSearch = ref<InstanceType<typeof OnyxMiniSearch>>();
const selectInput = ref<ComponentExposed<typeof OnyxSelectInput>>();

/**
 * Sync the active option with the selected option on single select.
 */
watch(
  arrayValue,
  () => {
    if (!props.multiple) {
      activeValue.value = arrayValue.value.at(0)?.value;
    }
  },
  { immediate: true },
);

/** unique ID to identify the `select all` checkbox */
const CHECK_ALL_ID = createId("ONYX_CHECK_ALL") as TValue;

/**
 * IDs of all options that can be navigated with the keyboard.
 * Includes "select all" up front if it is used.
 */
const allKeyboardOptionIds = computed(() => {
  return (props.multiple && props.withCheckAll ? [CHECK_ALL_ID] : []).concat(
    enabledOptionValues.value,
  );
});

const onToggle = async (preventFocus?: boolean) => {
  if (props.readonly) {
    isExpanded.value = false;
    return;
  }

  isExpanded.value = !isExpanded.value;
  if (!isExpanded.value) {
    if (props.searchTerm) emit("update:searchTerm", "");
    if (!preventFocus) selectInput.value?.focus();
  } else {
    // make sure search of focused when flyout opens
    await nextTick();
    miniSearch.value?.focus();
  }
};

const onActivateFirst = () => (activeValue.value = allKeyboardOptionIds.value.at(0));
const onActivateLast = () => (activeValue.value = allKeyboardOptionIds.value.at(-1));

const onActivateNext = (currentValue: TValue) => {
  const currentIndex = allKeyboardOptionIds.value.findIndex((i) => i === currentValue);
  if (currentIndex < allKeyboardOptionIds.value.length - 1) {
    activeValue.value = allKeyboardOptionIds.value[currentIndex + 1];
  }
};

const onActivatePrevious = (currentValue: TValue) => {
  const currentIndex = allKeyboardOptionIds.value.findIndex((i) => i === currentValue);
  if (currentIndex > 0) activeValue.value = allKeyboardOptionIds.value[currentIndex - 1];
};

const onTypeAhead = (label: string) => {
  const firstMatch = props.options.find((i) => {
    return i.label.toLowerCase().trim().startsWith(label.toLowerCase());
  });
  if (!firstMatch) return;
  activeValue.value = firstMatch.value;
};

const onAutocomplete = (inputValue: string) => emit("update:searchTerm", inputValue);

// TODO: ensure focus stays in search field when selecting with click
const onSelect = (selectedOption: TValue) => {
  if (selectedOption === CHECK_ALL_ID) {
    checkAll.value?.handleChange(!checkAll.value.state.value.modelValue);
    return;
  }
  const newValue = props.options.find(({ value }) => value === selectedOption);
  if (!newValue) {
    return;
  }
  if (!props.multiple) {
    return emit("update:modelValue", newValue);
  }

  // add or remove value depending on whether its already selected
  const alreadyInList = arrayValue.value.some(({ value }) => value === selectedOption);
  if (alreadyInList) {
    emit(
      "update:modelValue",
      arrayValue.value.filter(({ value }) => value !== selectedOption),
    );
  } else {
    emit("update:modelValue", [...arrayValue.value, newValue]);
  }
};

const autocomplete = computed<ComboboxAutoComplete>(() => (props.withSearch ? "list" : "none"));

const {
  elements: { input, option: headlessOption, group: headlessGroup, listbox },
} = createComboBox({
  autocomplete,
  label: props.label,
  listLabel: props.listLabel,
  inputValue: computed(() => (props.withSearch && props.searchTerm) || ""),
  activeOption: computed(() => activeValue.value),
  multiple: computed(() => props.multiple),
  isExpanded,
  templateRef: selectRef,
  onToggle,
  onActivateFirst,
  onActivateLast,
  onActivateNext,
  onActivatePrevious,
  onTypeAhead,
  onAutocomplete,
  onSelect,
});

const groupedOptions = computed(() => groupByKey(props.options, "group"));

const { vScrollEnd, isScrollEnd } = useScrollEnd({
  enabled: computed(() => props.lazyLoading?.enabled ?? false),
  loading: computed(() => props.loading),
  offset: computed(() => props.lazyLoading?.scrollOffset),
});

const isEmptyMessage = computed(() => {
  if (props.options.length) return;
  if (props.withSearch && props.searchTerm) return t.value("select.noMatch");
  return t.value("select.empty");
});

const enabledOptionValues = computed(() =>
  props.options.filter((i) => !i.disabled).map(({ value }) => value),
);

/**
 * State and click callback for the `select all` checkbox.
 * Only available when multiple and withCheckAll are set.
 */
const checkAll = computed(() => {
  if (!props.multiple || !props.withCheckAll) return undefined;
  return useCheckAll(
    enabledOptionValues,
    computed(() => arrayValue.value.map(({ value }) => value)),
    (newValues: TValue[]) => {
      const selectedOptions = newValues
        .map((v) => props.options.find(({ value }) => value === v))
        .filter((option): option is NonNullable<typeof option> => option != undefined);
      emit("update:modelValue", selectedOptions);
    },
  );
});

const checkAllLabel = computed<string>(() => {
  if (!props.multiple) {
    return "";
  }
  const defaultText = t.value("selections.selectAll");
  if (typeof props.withCheckAll === "boolean") return defaultText;
  return props.withCheckAll?.label ?? defaultText;
});

watchEffect(() => {
  if (isScrollEnd.value) emit("lazyLoad");
});

const selectInputProps = computed(() => {
  const baseProps: OnyxSelectInputProps<TValue> = {
    ...props,
    selection: props.modelValue as SelectInputModelValue<TValue>[],
  };
  if (props.withSearch) return { ...baseProps, onKeydown: input.value.onKeydown };
  return { ...baseProps, ...input.value };
});
</script>

<template>
  <div ref="selectRef" class="onyx-select-wrapper">
    <OnyxSelectInput ref="selectInput" v-bind="selectInputProps" @click="onToggle" />

    <div
      :class="['onyx-select', densityClass, isExpanded ? 'onyx-select--open' : '']"
      :aria-busy="props.loading"
    >
      <div v-scroll-end class="onyx-select__wrapper">
        <OnyxMiniSearch
          v-if="props.withSearch"
          ref="miniSearch"
          v-bind="input"
          :label="t('select.searchInputLabel')"
          class="onyx-select__search"
          @clear="emit('update:searchTerm', '')"
        />

        <div v-bind="listbox">
          <ul v-if="isEmptyMessage" role="group" class="onyx-select__group">
            <li role="option" aria-selected="false">
              <slot name="empty" :default-message="isEmptyMessage">
                <OnyxEmpty>{{ isEmptyMessage }}</OnyxEmpty>
              </slot>
            </li>
          </ul>

          <template v-else>
            <ul
              v-for="(options, group) in groupedOptions"
              :key="group"
              class="onyx-select__group"
              v-bind="headlessGroup({ label: group })"
            >
              <li
                v-if="group != ''"
                role="presentation"
                class="onyx-select__group-name onyx-text--small"
              >
                {{ group }}
              </li>

              <!-- select-all option for "multiple" -->
              <template v-if="props.multiple && props.withCheckAll && !props.searchTerm">
                <OnyxSelectOption
                  v-bind="
                    headlessOption({
                      value: CHECK_ALL_ID as TValue,
                      label: checkAllLabel,
                      selected: checkAll?.state.value.modelValue,
                    })
                  "
                  multiple
                  :active="CHECK_ALL_ID === activeValue"
                  :indeterminate="checkAll?.state.value.indeterminate"
                  :density="props.density"
                  class="onyx-select__check-all"
                >
                  {{ checkAllLabel }}
                </OnyxSelectOption>
              </template>

              <OnyxSelectOption
                v-for="option in options"
                :key="option.value.toString()"
                v-bind="
                  headlessOption({
                    value: option.value,
                    label: option.label,
                    disabled: option.disabled,
                    selected: arrayValue.some(({ value }) => value === option.value),
                  })
                "
                :multiple="props.multiple"
                :active="option.value === activeValue"
                :icon="option.icon"
                :color="option.color"
                :density="props.density"
              >
                {{ option.label }}
              </OnyxSelectOption>
            </ul>
          </template>
        </div>

        <div v-if="props.lazyLoading?.loading" class="onyx-select__slot">
          <OnyxLoadingIndicator class="onyx-select__loading" />
        </div>

        <div v-if="slots.optionsEnd" class="onyx-select__slot">
          <slot name="optionsEnd"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";
@use "../../styles/mixins/list";
@use "../../styles/mixins/density.scss";

.onyx-select-wrapper {
  @include layers.component() {
    position: relative;
  }
}

.onyx-select {
  @include density.compact {
    --option-height: calc(1.5rem + 1 * var(--onyx-spacing-2xs));
  }
  @include density.default {
    --option-height: calc(1.5rem + 2 * var(--onyx-spacing-2xs));
  }
  @include density.cozy {
    --option-height: calc(1.5rem + 3 * var(--onyx-spacing-2xs));
  }

  @include layers.component() {
    $wrapper-padding: var(--onyx-spacing-2xs);
    $outline-size: 0.25rem;
    --max-options: 8;

    @include list.styles();

    position: absolute;
    left: 0;
    top: calc(100% + $outline-size);

    visibility: hidden;
    opacity: 0;
    transition:
      visibility var(--onyx-duration-sm),
      opacity var(--onyx-duration-sm);

    &--open {
      visibility: visible;
      opacity: 1;
    }

    &__search {
      position: sticky;
      top: 0;
    }

    &-option {
      height: var(--option-height);
    }

    &__check-all,
    &__search {
      height: calc(var(--option-height) + var(--onyx-1px-in-rem));
      border-bottom: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
    }

    &:has(&__wrapper:focus-visible) {
      outline: $outline-size solid var(--onyx-color-base-primary-200);
    }

    &__slot {
      padding: 0 $wrapper-padding;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
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
