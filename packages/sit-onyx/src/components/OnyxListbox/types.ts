import type { ListboxValue, ListboxModelValue } from "@sit-onyx/headless";

export type OnyxListboxProps<
  TMultiple extends boolean = false,
  TOption extends ListboxValue = ListboxValue,
> = {
  /**
   * Aria label. Must be set for accessibility reasons.
   */
  label: string;
  /**
   * Available options to choose from.
   */
  options: ListboxOption<TOption>[];
  /**
   * Message / help text to display at the bottom.
   */
  message?: string;
  /**
   * Current value / selected options.
   */
  modelValue?: ListboxModelValue<TOption, TMultiple>;
  /**
   * Allows the selection of multiple listbox options
   */
  multiple?: TMultiple;
  /**
   * Whether to show a loading indicator.
   */
  loading?: boolean;
  /**
   * Lazy loading options. Can be used to load more options on scroll.
   * If you want to use a button instead, use the `optionsEnd` slot.
   */
  lazyLoading?: ListboxLazyLoading;
};

export type ListboxOption<T extends ListboxValue = ListboxValue> = {
  /**
   * Option ID / value to use when the option is selected.
   */
  id: T;
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

export type ListboxLazyLoading = {
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
