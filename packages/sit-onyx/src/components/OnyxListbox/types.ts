import type { DensityProp } from "../../composables/density";
import type { SelectOption, SelectOptionValue } from "../../types";
import type { OnyxListboxOptionProps } from "../OnyxListboxOption/types";

type OnyxListboxSingleProps<TValue extends SelectOptionValue> = {
  /**
   * Allows the selection of multiple listbox options
   */
  multiple?: false;
  /**
   * Current value.
   */
  modelValue?: TValue;
};

type OnyxListboxMultipleProps<TValue extends SelectOptionValue> = {
  /**
   * Allows the selection of multiple listbox options
   */
  multiple: true;
  /**
   * Current value / selected option(s).
   */
  modelValue?: TValue[];
  /**
   * If true, a checkbox will be displayed to check/uncheck all options.
   * Disabled and skeleton checkboxes will be excluded from the check/uncheck behavior.
   * Only available if "multiple" is true.
   */
  withCheckAll?:
    | boolean
    | {
        /**
         * Label for the `select all` checkbox.
         * If unset, a default label will be shown depending on the current locale/language.
         */
        label?: string;
      };
};

export type OnyxListboxProps<TValue extends SelectOptionValue = SelectOptionValue> = DensityProp & {
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
   * Whether to show a loading indicator.
   */
  loading?: boolean;
  /**
   * Lazy loading options. Can be used to load more options on scroll.
   * If you want to use a button instead, use the `optionsEnd` slot.
   */
  lazyLoading?: ListboxLazyLoading;
} & (OnyxListboxMultipleProps<TValue> | OnyxListboxSingleProps<TValue>);

export type ListboxOption<TValue extends SelectOptionValue = SelectOptionValue> = Pick<
  SelectOption<TValue>,
  "value" | "label" | "disabled"
> &
  Pick<OnyxListboxOptionProps, "color" | "icon"> & {
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
