import type { createListbox } from "@sit-onyx/headless";
import type { SelectionOptionValue } from "../OnyxRadioButton/types";

export type OnyxListboxProps<TValue extends SelectionOptionValue = SelectionOptionValue> = {
  /**
   * Aria label. Must be set for accessibility reasons.
   */
  label: string;
  /**
   * Available options to choose from.
   */
  options: ListboxOption<TValue>[];
  controlled?: ReturnType<typeof createListbox>;
  /**
   * Message / help text to display at the bottom.
   */
  message?: string;
  /**
   * Current value / selected options.
   */
  modelValue?: TValue;
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

export type ListboxOption<T extends SelectionOptionValue = SelectionOptionValue> = {
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
