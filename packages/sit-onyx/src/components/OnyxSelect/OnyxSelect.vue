<script
  lang="ts"
  setup
  generic="
    TModelValue extends SelectOptionValue | SelectOptionValue[],
    TMultiple extends TModelValue extends any[] ? true : false | undefined,
    TValue extends TModelValue extends (infer TInner)[] ? TInner : TModelValue
  "
>
import {
  CLOSING_KEYS,
  createComboBox,
  OPENING_KEYS,
  type ComboboxAutoComplete,
} from "@sit-onyx/headless";
import { iconChevronDownUp, iconXSmall } from "@sit-onyx/icons";
import {
  computed,
  nextTick,
  ref,
  toRefs,
  useId,
  useTemplateRef,
  watch,
  watchEffect,
  type ComputedRef,
} from "vue";
import { useCheckAll } from "../../composables/checkAll.js";
import { useScrollEnd } from "../../composables/scrollEnd.js";
import { useAutofocus } from "../../composables/useAutoFocus.js";
import { useFormElementError } from "../../composables/useFormElementError.js";
import { useOpenDirection } from "../../composables/useOpenDirection.js";
import { SKELETON_INJECTED_SYMBOL } from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import type { Nullable, SelectOptionValue } from "../../types/index.js";
import { mergeVueProps } from "../../utils/attrs.js";
import { asArray, groupByKey, transformGroupedData } from "../../utils/objects.js";
import { normalizedIncludes } from "../../utils/strings.js";
import OnyxBadge from "../OnyxBadge/OnyxBadge.vue";
import OnyxEmpty from "../OnyxEmpty/OnyxEmpty.vue";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxFormElementAction from "../OnyxFormElementAction/OnyxFormElementAction.vue";
import OnyxFormElementV2 from "../OnyxFormElementV2/OnyxFormElementV2.vue";
import { useLegacyFormElementProps } from "../OnyxFormElementV2/useLegacyFormElementProps.js";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import OnyxMiniSearch from "../OnyxMiniSearch/OnyxMiniSearch.vue";
import OnyxSelectOption from "../OnyxSelectOption/OnyxSelectOption.vue";
import OnyxTooltip from "../OnyxTooltip/OnyxTooltip.vue";
import type { OnyxSelectProps, SelectOption } from "./types.js";

type Props = OnyxSelectProps<TModelValue, TMultiple, TValue>;

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  noFilter: false,
  skeleton: SKELETON_INJECTED_SYMBOL,
  showError: FORM_INJECTED_SYMBOL,
  requiredMarker: FORM_INJECTED_SYMBOL,
  reserveMessageSpace: FORM_INJECTED_SYMBOL,
  disabled: FORM_INJECTED_SYMBOL,
  modelValue: undefined,
  readonly: false,
  truncation: "ellipsis",
  valueLabel: undefined,
  alignment: "full",
  open: undefined,
  keepSelectionOrder: false,
  textMode: "summary",
});

const emit = defineEmits<{
  /**
   * Emitted if lazy loading is triggered / the users scrolls to the end of the options.
   * See property `lazyLoading` for enabling the lazy loading.
   */
  lazyLoad: [];
  /**
   * Emitted when the validity state of the input changes.
   */
  validityChange: [validity: ValidityState];
  /**
   * Emitted when a search term is inputted
   */
  "update:searchTerm": [value: string];
  /**
   * Emitted when an option is selected
   */
  "update:modelValue": [value?: Nullable<TModelValue>];
  /**
   * Emitted when the open state changes
   */
  "update:open": [value: boolean];
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
   * Optional slot to override the option content.
   */
  option?(props: SelectOption<TValue>): unknown;
  /**
   * Optional slot to override the icon of the toggle button inside the input.
   * Recommended to use the `OnyxFormElementAction` component here.
   */
  toggleIcon?(): unknown;
}>();

const { t } = injectI18n();

/**
 * Value of the currently selected option or an array of values when the `multiple` prop is `true`.
 */
const modelValue = useVModel<Props, "modelValue">({
  props,
  emit,
  key: "modelValue",
});

/**
 * Value of the search input, when `withSearch` is `true`.
 *
 * Hint: Cover `valueLabel` to prevent the disappearance of the current selections label
 */
const searchTerm = useVModel<Props, "searchTerm", string>({
  props,
  emit,
  key: "searchTerm",
  default: "",
});

/**
 * If true, the select popover is expanded and visible.
 */
const open = useVModel<Props, "open", boolean>({
  props,
  emit,
  key: "open",
  default: false,
});

const select = useTemplateRef<{ $el?: HTMLElement }>("select");
const selectElement = computed(() => select.value?.$el);
const { openDirection, updateOpenDirection } = useOpenDirection(selectElement);

/**
 * Currently (visually) active value.
 */
const activeValue = ref<TValue>();

/**
 * Current value but always as array (even if not multiselect) so it is easier
 * to work with it in a unified way.
 */
const arrayValue = computed(() => asArray(modelValue.value)) as ComputedRef<TValue[]>;

/**
 * Contains an array of labels that will be shown in the input.
 * - contains props.valueLabel as array if it is set
 * - else, contains all found labels of the options that match the current modelValue
 */
const selectionLabels = computed(() => {
  // given state
  if (props.valueLabel !== undefined) {
    return asArray(props.valueLabel);
  }
  // managed state
  return arrayValue.value.reduce<string[]>((acc, current) => {
    const foundLabel = props.options.find(({ value }) => value === current)?.label;
    if (foundLabel) acc.push(foundLabel);
    return acc;
  }, []);
});

const miniSearch = useTemplateRef("miniSearch");
const inputRef = useTemplateRef("input");

const filteredOptions = computed(() => {
  // if onyx does not manage the search or no searchTerm is given, we don't filter the options further
  if (props.noFilter || !searchTerm.value) return props.options;

  return props.options.filter(({ label }: SelectOption) =>
    normalizedIncludes(label, searchTerm.value),
  );
});

/**
 * Sync the active option with the selected option on single select.
 */
watch(
  arrayValue,
  () => {
    if (!props.multiple) {
      activeValue.value = arrayValue.value.at(0);
    }
  },
  { immediate: true },
);

/** unique ID to identify the `select all` checkbox */
const CHECK_ALL_ID = useId() as TValue;

/**
 * IDs of all options that can be navigated with the keyboard.
 * Includes "select all" up front if it is used.
 */
const allKeyboardOptionIds = computed(() => {
  return (props.multiple && props.withCheckAll && !searchTerm.value ? [CHECK_ALL_ID] : []).concat(
    enabledOptionValues.value,
  );
});

const onToggle = async (preventFocus?: boolean) => {
  const groupedByKey = groupByKey<SelectOption<TValue>, "group">(
    getOptionsWithGroupForSelected(),
    "group",
  );

  if (props.keepSelectionOrder) {
    groupedOptions.value = transformGroupedData<SelectOption<TValue>, "group">(groupedByKey);
  } else {
    groupedOptions.value = transformGroupedData<SelectOption<TValue>, "group">(
      groupedByKey,
      t.value("selections.selectGroup"),
    );
  }

  if (props.readonly) {
    open.value = false;
    return;
  }
  const wasOpen = open.value;
  open.value = !wasOpen;
  await nextTick();

  if (open.value) updateOpenDirection();

  // if with managed `open` state after one tick the state was not updated,
  // we don't modify our focus state, because we assume that
  // the owner did not update `open` on purpose
  if (wasOpen !== open.value) {
    if (wasOpen) {
      if (searchTerm.value) searchTerm.value = "";
      if (!preventFocus) inputRef.value?.focus();
    } else {
      // make sure search is focused after the flyout opened
      miniSearch.value?.focus();
    }
  }
};

const onActivateFirst = () => {
  activeValue.value = allKeyboardOptionIds.value.at(0);
};
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
  const firstMatch = filteredOptions.value.find((i) => {
    return i.label.toLowerCase().trim().startsWith(label.toLowerCase());
  });
  if (!firstMatch) return;
  activeValue.value = firstMatch.value;
};

const onAutocomplete = (inputValue: string) => (searchTerm.value = inputValue);

const onSelect = (selectedOption: TValue) => {
  if (selectedOption === CHECK_ALL_ID) {
    checkAll.value?.handleChange(!checkAll.value.state.value.modelValue);
    return;
  }
  const newValue = filteredOptions.value.find(({ value }) => value === selectedOption);
  if (!newValue) {
    return;
  }
  if (!props.multiple) {
    modelValue.value = selectedOption as unknown as TModelValue;
    return;
  }

  // add or remove value depending on whether its already selected
  const alreadyInList = arrayValue.value.some((value) => value === selectedOption);
  if (alreadyInList) {
    modelValue.value = arrayValue.value.filter(
      (value) => value !== selectedOption,
    ) as unknown as TModelValue;
  } else {
    modelValue.value = [...arrayValue.value, selectedOption] as unknown[] as TModelValue;
  }
};

const autocomplete = computed<ComboboxAutoComplete>(() => (props.withSearch ? "list" : "none"));

const { listLabel, listDescription, multiple } = toRefs(props);

const {
  elements: { input, option: headlessOption, group: headlessGroup, listbox },
} = createComboBox({
  autocomplete,
  label: computed(() => {
    if (typeof props.label === "string") return props.label;
    return props.label.label;
  }),
  listLabel,
  listDescription,
  multiple,
  activeOption: computed(() => activeValue.value),
  isExpanded: open,
  templateRef: selectElement,
  onToggle,
  onActivateFirst,
  onActivateLast,
  onActivateNext,
  onActivatePrevious,
  onTypeAhead,
  onAutocomplete,
  onSelect,
});

const getOptionsWithGroupForSelected = () => {
  if (
    props.keepSelectionOrder ||
    !modelValue.value ||
    !Array.isArray(modelValue.value) ||
    modelValue.value.length == 0
  ) {
    return filteredOptions.value;
  }
  const selectedValues = new Set(modelValue.value as TValue[]);

  return filteredOptions.value.map((option) => ({
    ...option,
    group: selectedValues.has(option.value) ? t.value("selections.selectGroup") : option.group,
  }));
};

const groupedOptions = ref<{ name: string; items: SelectOption<TValue>[] }[]>();

const { vScrollEnd, isScrollEnd } = useScrollEnd({
  enabled: computed(() => props.lazyLoading?.enabled ?? false),
  loading: computed(() => props.loading),
  offset: computed(() => props.lazyLoading?.scrollOffset),
});

const isEmptyMessage = computed(() => {
  if (filteredOptions.value.length) return;
  if (props.withSearch && searchTerm.value) return t.value("select.noMatch");
  return t.value("select.empty");
});

const enabledOptionValues = computed(() =>
  filteredOptions.value.filter((i) => !i.disabled).map(({ value }) => value),
);

/**
 * State and click callback for the `select all` checkbox.
 * Only available when multiple and withCheckAll are set.
 */
const checkAll = computed(() => {
  if (!props.multiple || !props.withCheckAll) return undefined;
  return useCheckAll(enabledOptionValues, arrayValue, (newValues: TValue[]) => {
    // with selectedOptions we verify that the options all still exist
    const selectedOptions: TValue[] = newValues
      .map((v) => props.options.find(({ value }) => value === v)?.value)
      .filter((option): option is NonNullable<typeof option> => option != undefined);
    modelValue.value = selectedOptions as unknown[] as TModelValue;
  });
});

const checkAllLabel = computed<string>(() => {
  if (!props.multiple) {
    return "";
  }
  const defaultText = t.value("selections.selectAll");
  if (typeof props.withCheckAll === "object") return props.withCheckAll.label ?? defaultText;
  return defaultText;
});

watchEffect(() => {
  if (isScrollEnd.value) emit("lazyLoad");
});

watch(
  [filteredOptions],
  () => {
    const groupedByKey = groupByKey<SelectOption<TValue>, "group">(
      getOptionsWithGroupForSelected(),
      "group",
    );

    if (props.keepSelectionOrder) {
      groupedOptions.value = transformGroupedData<SelectOption<TValue>, "group">(groupedByKey);
    } else {
      groupedOptions.value = transformGroupedData<SelectOption<TValue>, "group">(
        groupedByKey,
        t.value("selections.selectGroup"),
      );
    }
  },

  { deep: true, immediate: true },
);

const { disabled } = useFormContext(props);
const { vCustomValidity, errorMessages } = useFormElementError({ props, emit });
const { formElementV2Props } = useLegacyFormElementProps({ props, errorMessages });

useAutofocus(inputRef, props);

const selection = computed<{ count: number; value: string }>(() => {
  const labels = selectionLabels.value;

  const getValue = () => {
    if (!labels.length) return "";
    if (labels.length === 1) return labels[0]!;
    if (props.textMode === "summary") {
      return t.value("selections.currentSelection", { n: labels.length });
    }
    return labels.join(", ");
  };

  return { count: labels.length, value: getValue() };
});

const showPreviewBadge = computed(() => props.textMode === "preview" && selection.value.count > 0);
const showClearButton = computed(() => selection.value.count > 0 && !props.hideClearIcon);

const navigationalKeys = OPENING_KEYS.concat(CLOSING_KEYS);
/**
 * We prevent manual user input. The native input inside OnyxSelectInput only represents
 * the label(s) of what is selected in OnyxSelect and shouldn't be overwritten manually.
 * We only allow all pressed keys that handle interaction with the select.
 */
const blockTyping = (event: KeyboardEvent) => {
  if (navigationalKeys.includes(event.key)) return;
  event.preventDefault();
};

const clearValue = () => {
  const value = props.multiple ? [] : undefined;
  modelValue.value = value as typeof modelValue.value;
};

defineExpose({ input: inputRef });
</script>

<template>
  <OnyxFormElementV2
    ref="select"
    v-bind="formElementV2Props"
    :open="open"
    class="onyx-select"
    :popover-options="{
      label: props.listLabel,
      alignment: props.alignment === 'full' ? 'center' : props.alignment,
      fitParent: props.alignment === 'full',
      position: openDirection,
    }"
    @update:open="onToggle"
  >
    <template #default="inputProps">
      <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -- provided by "inputProps" -->
      <input
        v-bind="
          mergeVueProps(
            {
              ...inputProps,
              // the OnyxFormElementV2 defaults input typing blocking conflicts with the custom handling
              // from 'createCombobox' so we remove the form element onKeydown handler here
              onKeydown: undefined,
            },
            input,
          )
        "
        ref="input"
        v-custom-validity
        type="text"
        :readonly="props.readonly"
        :placeholder="props.placeholder"
        :required="props.required"
        :disabled="disabled || props.loading"
        :value="selection.value"
        :autofocus="props.autofocus"
        autocomplete="off"
        @keydown="blockTyping"
      />
    </template>

    <template #trailingIcons>
      <OnyxFormElementAction
        v-if="!showPreviewBadge && showClearButton"
        :label="t('input.clear')"
        :icon="iconXSmall"
        show-on-focus
        @click="clearValue"
      />

      <OnyxTooltip v-if="showPreviewBadge" :text="selection.value" position="bottom">
        <template #default="{ trigger }">
          <OnyxBadge class="onyx-select__badge" v-bind="trigger" color="neutral">
            {{ selection.count }}

            <OnyxFormElementAction
              v-if="showClearButton"
              :label="t('input.clear')"
              :icon="iconXSmall"
              show-on-focus
              @click="clearValue"
            />
          </OnyxBadge>
        </template>
      </OnyxTooltip>

      <slot name="toggleIcon">
        <OnyxFormElementAction
          :label="t('select.toggleDropDown')"
          :icon="iconChevronDownUp"
          :disabled="disabled || props.readonly || props.loading"
          highlight-on-focus
          @click="onToggle"
        />
      </slot>
    </template>

    <template #popover>
      <div v-scroll-end class="onyx-select__flyout" tabindex="-1">
        <!-- model-value is set here, as it is written by the onAutocomplete callback -->
        <OnyxMiniSearch
          v-if="props.withSearch"
          ref="miniSearch"
          v-bind="input"
          :model-value="searchTerm"
          :label="t('select.searchInputLabel')"
          class="onyx-select__search"
          autofocus
          @clear="searchTerm = ''"
        />

        <div v-bind="listbox">
          <ul v-if="isEmptyMessage" role="group" class="onyx-select__group">
            <li role="option" aria-selected="false">
              <slot name="empty" :default-message="isEmptyMessage">
                <OnyxEmpty :density="props.density">{{ isEmptyMessage }}</OnyxEmpty>
              </slot>
            </li>
          </ul>

          <template v-else>
            <!-- select-all option for "multiple" -->
            <ul
              v-if="props.multiple && props.withCheckAll && !searchTerm"
              class="onyx-select__check-all"
              v-bind="headlessGroup({ label: checkAllLabel })"
            >
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
              >
                {{ checkAllLabel }}
              </OnyxSelectOption>
            </ul>

            <ul
              v-for="group in groupedOptions"
              :key="group.name"
              class="onyx-select__group"
              v-bind="headlessGroup({ label: group.name })"
            >
              <li v-if="group.name" role="presentation" class="onyx-select__group-name">
                {{ group.name }}
              </li>
              <OnyxSelectOption
                v-for="option in group.items"
                :key="option.value.toString()"
                v-bind="
                  headlessOption({
                    value: option.value,
                    label: option.label,
                    disabled: option.disabled,
                    selected: arrayValue.some((value) => value === option.value),
                  })
                "
                :multiple="props.multiple"
                :active="option.value === activeValue"
                :icon="option.icon"
                :density="props.density"
                :truncation="option.truncation ?? props.truncation"
              >
                <slot name="option" v-bind="option">
                  {{ option.label }}
                </slot>
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

      <div v-if="props.listDescription" class="onyx-select__description">
        {{ props.listDescription }}
      </div>
    </template>
  </OnyxFormElementV2>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-select {
  @include layers.component() {
    /** @deprecated Use --onyx-select-flyout-max-height instead */
    --max-flyout-height: 20rem;
    --onyx-select-flyout-max-height: var(--max-flyout-height, 20rem);

    &__badge {
      display: flex;
      align-items: center;
      gap: var(--onyx-density-2xs);
      cursor: pointer;

      .onyx-form-element-action {
        --onyx-form-element-action-color: currentColor;
      }
    }

    &__flyout {
      width: 100%;
      margin-block: var(--onyx-spacing-2xs);
      max-height: var(--onyx-select-flyout-max-height);
      overflow: auto;

      .onyx-empty {
        max-width: 100%;
      }

      // if a group name is below a search field or a "Select all" option,
      // there needs to be spacing between them.
      &:has(.onyx-select__search),
      &:has(.onyx-select__check-all) {
        .onyx-select__group-name:first-child {
          margin-top: var(--onyx-density-xs);
        }
      }

      &:has(.onyx-select__search) {
        // Add scroll padding, so items are not hidden beneath the search input
        // var(--onyx-density-xs) = vertical padding of select option
        scroll-padding-top: calc(1lh + 2 * var(--onyx-density-xs));
      }
    }

    &__group,
    &__check-all {
      padding: 0;
      list-style: none;

      &:not(:last-of-type) {
        border-bottom: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
      }
    }
    &__group:not(:last-of-type) {
      margin-bottom: var(--onyx-density-xs);
    }

    &__group-name {
      display: block;
      padding-inline: var(--onyx-density-sm);
      color: var(--onyx-color-text-icons-neutral-medium);
      font-weight: var(--onyx-font-weight-semibold);
      font-size: var(--onyx-font-size-sm);
      line-height: var(--onyx-font-line-height-sm);
    }

    &__search {
      position: sticky;
      top: 0;
      border-bottom: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
    }

    &__loading {
      color: var(--onyx-color-text-icons-primary-intense);
    }

    &__slot {
      padding-inline: var(--onyx-density-sm);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    &__description {
      display: flex;
      width: 100%;
      padding: var(--onyx-density-3xs) var(--onyx-density-sm);
      justify-content: flex-end;
      text-align: right;
      align-items: center;
      gap: var(--onyx-spacing-md);
      color: var(--onyx-color-text-icons-neutral-soft);
      font-size: var(--onyx-font-size-sm);
      line-height: var(--onyx-font-line-height-sm);
    }
  }
}
</style>
