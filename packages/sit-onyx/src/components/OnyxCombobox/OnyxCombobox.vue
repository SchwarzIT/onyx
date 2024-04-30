<script lang="ts" setup generic="TValue extends string, TMultiple extends boolean = false">
import { createComboBox, createId } from "@sit-onyx/headless";
import { useCheckAll } from "../../composables/checkAll";
import { computed, ref, watchEffect } from "vue";
import { useScrollEnd } from "../../composables/scrollEnd";
import { injectI18n } from "../../i18n";
import OnyxEmpty from "../OnyxEmpty/OnyxEmpty.vue";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import type { OnyxComboboxProps } from "./types";
import OnyxSelect from "../OnyxCombobox/OnyxSelect/OnyxSelect.vue";
import OnyxListboxOption from "./OnyxListboxOption/OnyxListboxOption.vue";
import type { ComboboxOption } from "../..";

type InternalComboboxOption<TValue extends string> = ComboboxOption<TValue> & {
  isSelectAll?: boolean;
};

const props = withDefaults(defineProps<OnyxComboboxProps<TValue, TMultiple>>(), {
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

const inputValue = ref("");

/**
 * Currently selected option.
 */
const selectedOption = computed(() => props.options.find(({ id }) => props.modelValue === id));

/**
 *
 */
const enabledOptions = computed(() => props.options.filter((o) => !o.disabled));

/**
 *
 */
const enabledOptionIds = computed(() => enabledOptions.value.map((o) => o.id));

/** Unique ID to identify the `select all` checkbox */
const CHECK_ALL_ID = createId("ONYX_CHECK_ALL") as TValue;

const checkAllLabel = computed<string>(() => {
  const defaultText = t.value("selections.selectAll");
  if (typeof props.withCheckAll === "boolean") return defaultText;
  return props.withCheckAll?.label ?? defaultText;
});

const CHECK_ALL_OPTION = computed<InternalComboboxOption<TValue>>(() => ({
  id: CHECK_ALL_ID,
  label: checkAllLabel.value,
}));

/**
 * IDs of all options that can be navigated with the keyboard.
 * Includes "select all" up front if it is used.
 */
const allKeyboardOptions = computed<InternalComboboxOption<TValue>[]>(() => [
  ...(props.withCheckAll ? [CHECK_ALL_OPTION.value] : []),
  ...enabledOptions.value,
]);

const groupedOptions = computed(() => {
  return props.options.reduce<Record<string, ComboboxOption<TValue>[]>>((acc, currOpt) => {
    const groupName = currOpt.group ?? "";
    acc[groupName] = acc[groupName] || [];
    acc[groupName].push(currOpt);
    return acc;
  }, {});
});

/**
 * Currently (visually) active option.
 */
const activeOption = ref<InternalComboboxOption<TValue>>();

const isExpanded = ref(false);

/**
 * State and click callback for the `select all` checkbox.
 * Only available when multiple and withCheckAll are set.
 */
const checkAll = computed(() => {
  if (!props.multiple || !props.withCheckAll) return undefined;
  return useCheckAll(
    enabledOptionIds,
    computed(() => (props.modelValue as TValue[]) || []),
    (newValue: TValue[]) => emit("update:modelValue", newValue as typeof props.modelValue),
  );
});

const activeIndex = computed<number | undefined>(() => {
  const index = props.options.findIndex((o) => o.id === activeOption.value?.id);
  return index !== -1 ? index : undefined;
});

const onActivateFirst = () => (activeOption.value = allKeyboardOptions.value.at(0));
const onActivateLast = () => (activeOption.value = allKeyboardOptions.value.at(-1));
const onActivateNext = () => {
  if (activeIndex.value === undefined) {
    return onActivateFirst();
  }
  const nextIndex = Math.min(allKeyboardOptions.value.length - 1, activeIndex.value + 1);

  activeOption.value = allKeyboardOptions.value.at(nextIndex);
};
const onActivatePrevious = () =>
  (activeOption.value = allKeyboardOptions.value.at(Math.max((activeIndex.value ?? 0) - 1, 0)));
const onTypeAhead = (input: string) => {
  const firstMatch = allKeyboardOptions.value.find((i) => {
    return i.label.toLowerCase().trim().startsWith(input.toLowerCase());
  });
  if (!firstMatch) return;
  activeOption.value = firstMatch;
};
const onToggle = () => (isExpanded.value = !isExpanded.value);
const onSelect = (selectedOption: string) => {
  if (selectedOption === CHECK_ALL_ID) {
    checkAll.value?.handleChange(!checkAll.value.state.value.modelValue);
    return;
  }

  if (!props.multiple) {
    const newValue = selectedOption === props.modelValue ? undefined : selectedOption;
    emit("update:modelValue", newValue as typeof props.modelValue);
    return;
  }
  const arrayValues: string[] = Array.isArray(props.modelValue) ? props.modelValue : [];
  const newValues = arrayValues.includes(selectedOption)
    ? arrayValues.filter((i) => i !== selectedOption)
    : [...arrayValues, selectedOption];
  emit("update:modelValue", newValues as typeof props.modelValue);
};

const comboBox = createComboBox({
  autocomplete: "none",
  label: props.label,
  listLabel: props.listLabel,
  inputValue,
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
  elements: { input, listbox, option: headlessOption, group: headlessGroup },
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
    <OnyxSelect
      :label="props.label"
      :loading="props.loading"
      :model-value="selectedOption?.label"
      v-bind="input"
      @click="isExpanded = true"
      @keydown.arrow-down="isExpanded = true"
    />
    <div v-show="isExpanded" class="onyx-listbox" :aria-busy="props.loading">
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
              class="onyx-listbox__check-all"
            >
              {{ checkAllLabel }}
            </OnyxListboxOption>
          </template>

          <OnyxListboxOption
            v-for="option in options"
            :key="option.id.toString()"
            v-bind="
              headlessOption({
                value: option.id,
                label: option.label,
                disabled: option.disabled,
                selected:
                  option.id === props.modelValue ||
                  (Array.isArray(props.modelValue) && props.modelValue.includes(option.id)),
              })
            "
            :multiple="props.multiple"
            :active="option.id === activeOption?.id"
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
