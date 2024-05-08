import type { IsArray } from "../../../../headless/src/utils/types";

export type OnyxComboboxProps<TValue extends string, TMultiple extends boolean = false> = {
  /**
   * Aria label for the combobox.
   */
  label: string;
  /**
   * Aria label for the listbox of the combobox.
   */
  listLabel: string;
  /**
   * Available options to choose from.
   */
  options: ComboboxOption<TValue>[];
  /**
   * Message / help text to display at the bottom.
   */
  message?: string;
  /**
   * Current value / selected options.
   */
  modelValue?: IsArray<ComboboxOption<TValue>, TMultiple>;
  /**
   * Allows the selection of multiple listbox options
   */
  multiple?: TMultiple;
  /**
   * If true, a checkbox will be displayed to check/uncheck all options.
   * Disabled and skeleton checkboxes will be excluded from the check/uncheck behavior.
   * Only available if "multiple" is true.
   */
  withCheckAll?: TMultiple extends true
    ?
        | boolean
        | {
            /**
             * Label for the `select all` checkbox.
             * If unset, a default label will be shown depending on the current locale/language.
             */
            label?: string;
          }
    : undefined;
  /**
   * Whether to show a loading indicator.
   */
  loading?: boolean;
  /**
   * Lazy loading options. Can be used to load more options on scroll.
   * If you want to use a button instead, use the `optionsEnd` slot.
   */
  lazyLoading?: ComboboxLazyLoading;
  // TODO: needs to be implemented
  withSearch?: false;
};

export type ComboboxOption<TValue extends string> = {
  /**
   * Option ID / value to use when the option is selected.
   */
  id: TValue;
  /**
   * Label to show.
   */
  label: string;
  /**
   * Whether the option is disabled.
   */
  disabled?: boolean;
  /**
   * Optional group name. If set, all options will be grouped under that group name.
   */
  group?: string;
};

export type ComboboxLazyLoading = {
  /**
   * Whether lazy loading should be enabled.
   * Can be disabled e.g. if all options are loaded.
   */
  enabled?: boolean;
  /**
   * Whether the lazy loading is currently loading more options.
   */
  loading?: boolean;
  /**
   * Scroll offset (in pixel). Must be >= 0.
   * Can be used to trigger the `lazyLoad` event earlier (e.g. if scrolled to second last option).
   */
  scrollOffset?: number;
};
