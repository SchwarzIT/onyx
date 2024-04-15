export type OnyxComboboxProps = {
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
  options: ComboboxOption[];
  /**
   * Message / help text to display at the bottom.
   */
  message?: string;
  /**
   * Current value / selected options.
   */
  modelValue?: string;
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

export type ComboboxOption = {
  /**
   * Option ID / value to use when the option is selected.
   */
  id: string;
  /**
   * Label to show.
   */
  label: string;
  /**
   * Whether the option is disabled.
   */
  disabled?: boolean;
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
