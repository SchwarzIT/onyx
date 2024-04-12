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
   * How to emit the `loadMore` event:
   * - lazy: User scrolls to the end of the options
   * - button: User clicks the load more button. If there are no more options to load,
   *           set this property to `undefined` so the button is hidden accordingly.
   */
  loadingMode?: ListboxLoadingMode;
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

export const LOADING_MODES = ["lazy", "button"] as const;
export type LoadingMode = (typeof LOADING_MODES)[number];

export type ListboxLoadingMode =
  | LoadingMode
  | {
      mode: "button";
      /**
       * Custom button label.
       */
      label: string;
    }
  | {
      mode: "lazy";
      /**
       * Scroll offset (in pixel). Must be >= 0.
       * Can be used to trigger the `loadMore` event earlier (e.g. if scrolled to second last option).
       */
      scrollOffset: number;
    };
